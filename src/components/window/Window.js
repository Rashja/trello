import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DropZone from "../drop-zone/DropZone";
import image from "../../assets/images/image.svg";
import useDate from "../../customHooks/useDate";
import useRedux from "../../customHooks/useRedux";
import { saveItem } from "../../actions/todos";
import Button from "../button/Button";
import { showToastify } from "../../actions/base";

/**
 * @param {() => void} show open pop up
 * @param {() => void} onClose close pop up
 * @param {object} item the item we show in window
 */

// set app element with root id
Modal.setAppElement("#root");

const Window = ({ show, onClose, item }) => {
  /*--------------------- use date ----------------- */
  const { today } = useDate();
  /*--------------------- use redux ---------------- */
  const { dispatch, todos } = useRedux();
  /*----------------------- states ----------------- */
  const initialStates = {
    title: "",
    description: "",
    image: null,
    edited: "",
  };
  const [state, setState] = useState(initialStates);
  /*------------------- side effects --------------- */
  useEffect(() => {
    // we refill our fields with an item property
    setState({
      ...state,
      title: item.title,
      description: item.description,
      image: item.image,
      edited: item.edited,
    });
  }, []);
  /*--------------------- on change ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  /*--------------------- save card ----------------- */
  const handleSaveCardInfo = () => {
    //we created the edited object
    const editItem = {
      id: item.id,
      image: state.image,
      edited: today,
      title: state.title,
      description: state.description,
    };
    //map data and add new one instead of the old
    const editedData = todos.map((td) => {
      if (td.id === item.id) {
        return {
          ...td,
          ...editItem,
        };
      } else {
        return td;
      }
    });
    //dispatch new todos
    dispatch(saveItem(editedData));
    //close pop up and show notif
    onClose();
    dispatch(showToastify("Changes Saved", "success"));
  };
  /*--------------------- use date ----------------- */
  const handleDeleteCard = () => {
    //filter the removed item
    const deletedTodo = todos.filter((td) => item.id !== td.id);
    //send customized data
    dispatch(saveItem(deletedTodo));
    //close pop up and show notif
    onClose();
    dispatch(showToastify("Card Deleted", "error"));
  };
  /*--------------------- use date ----------------- */
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <div className="edit-area-wrapper">
        <div className="modal-header">
          <h2>EDIT MODAL</h2>

          <div className={"close-btn-ctn"}>
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>
        </div>
        <div className="modal-content">
          <h2 style={{ flex: "1 90%" }}>Title</h2>

          <input
            className="input-title"
            value={state.title}
            name="title"
            type="text"
            onChange={handleChange}
          />
          <h2>Description</h2>
          <textarea
            className="textarea-description"
            value={state.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="modal-sidebar">
          <div className="image-info-wrapper">
            <div className="input-file-section">
              <DropZone
                justOne
                getFile={(file) => setState({ ...state, image: file })}
                updatePic={item.image}
                defaultPhoto={image}
              />
            </div>
            <div className="info-wrapper">
              <p>
                Status:
                {`${item.status.charAt(0).toUpperCase()}${item.status.slice(
                  1
                )}`}
              </p>
              <p>created at: {item.created}</p>
              {state.edited ? (
                <p>edited at: {item.edited}</p>
              ) : (
                <p>edited at: Not Yet</p>
              )}
            </div>
          </div>
        </div>

        <div style={{ clear: "both" }}></div>
        <div className="modal-footer">
          <Button red onClick={handleDeleteCard}>
            delete card
          </Button>

          <Button green onClick={handleSaveCardInfo}>
            save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(Window);
