import React, { useState, useRef } from "react";
import plus from "../../assets/images/plus.svg";
import useRedux from "../../customHooks/useRedux";
import useDate from "../../customHooks/useDate";
import { addNewItem, addNewBoard } from "../../actions/todos";
import { showToastify } from "../../actions/base";

/**
 *
 * @param {status} string
 * @param {btnText} string
 * @param {type} string
 */

function AddItem({ status, text, type }) {
  /*----------------------- use ref ------------------- */
  const textAreaRef = useRef(null);
  /*----------------------- use date ------------------ */
  const { today } = useDate();
  /*---------------------- use redux ------------------ */
  const { dispatch } = useRedux();
  /*------------------------ states ------------------- */
  const [show, setShow] = useState(false);
  /*-------------------- show input part -------------- */
  const handleShow = () => {
    setShow((show) => !show);
  };
  /*------------------ handle add item ---------------- */
  const handleAddItem = () => {
    //get value of input by its ref
    let Value = textAreaRef.current.value;
    //we seprated this method by type
    //card for creating new card item
    if (type === "card") {
      const newItem = {
        id: Value,
        title: Value,
        status,
        created: today,
      };
      if (Value.length > 0) {
        dispatch(addNewItem(newItem));
      }
      //after added new card change show and clear input value
      setShow(false);
      Value = "";
      //show notif to user
      dispatch(showToastify("New Card Added", "success"));
    }
    if (type === "board") {
      if (Value.length > 0) {
        dispatch(addNewBoard({ status: Value }));
        //after added new board change show and clear input value
        setShow(false);
        Value = "";
        //show notif to user
        dispatch(showToastify("New Board Added", "success"));
      }
    }
  };
  /*-------------------------------------------------- */
  return (
    <div className="add-item">
      <div className="add-item-title" onClick={handleShow}>
        <img width="20px" src={plus} alt="plus" />
        <h4>{text}</h4>
      </div>
      {show && (
        <div className="add-area">
          <textarea ref={textAreaRef} />
          <button onClick={handleAddItem}>{text}</button>
        </div>
      )}
    </div>
  );
}

export default React.memo(AddItem);
