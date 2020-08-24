import React, { useState, useEffect, useMemo } from "react";
import Item from "../item/Item";
import DropWrapper from "../drop-wrapper/DropWrapper";
import Col from "../col/Col";
import useRedux from "../../customHooks/useRedux";
import { changeItemStatus, deleteBoard } from "../../actions/todos";
import AddItem from "../add-item/AddItem";
import close from "../../assets/images/close.svg";
import { showToastify } from "../../actions/base";

const TodoApp = () => {
  /*---------------------- use redux -------------------- */
  const { todos, statuses, dispatch } = useRedux();
  /*-------------------- memorized data ----------------- */
  const todoMemorize = useMemo(() => todos, [todos]);
  /*------------------------ states --------------------- */
  const [items, setItems] = useState([]);
  /*--------------------- side effects ------------------ */
  useEffect(() => {
    setItems(todoMemorize);
  }, [todoMemorize]);
  /*------------------------ on drop -------------------- */
  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);
    //here we change status of item after it droped
    dispatch(changeItemStatus(item, status));
  };
  /*--------------------- delete board ------------------ */
  const handleDeleteBoard = (status) => {
    dispatch(deleteBoard(status));
    dispatch(showToastify("Board Deleted", "error"));
  };
  /*----------------------------------------------------- */
  return (
    <div className={"row"}>
      {statuses.map((s) => {
        return (
          <div key={s.status} className={"col-wrapper"}>
            <div className="col-header-wrapper">
              <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
              <img
                onClick={() => handleDeleteBoard(s.status)}
                alt="close"
                src={close}
              />
            </div>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => i.status === s.status)
                  .map((i, idx) => (
                    <Item key={i.id} item={i} index={idx} status={s} />
                  ))}
              </Col>
            </DropWrapper>
            <AddItem type="card" text="Add New Card" status={s.status} />
          </div>
        );
      })}
      <div className="blue-add-item">
        <AddItem type="board" text="Add New Board" />
      </div>
    </div>
  );
};

export default React.memo(TodoApp);
