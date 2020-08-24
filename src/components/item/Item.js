import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "../window/Window";
import ITEM_TYPE from "../../data/types";

/**
 *
 * @param {object} item
 * @param {number} index
 * @param {()=>void} moveItem
 */

const Item = ({ item, index, moveItem }) => {
  /*------------------------ ref --------------------- */
  const ref = useRef(null);
  /*---------------------- use drop ------------------ */
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // drop behavior
      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverIndex;
    },
  });
  /*---------------------- use drag ------------------ */
  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPE, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  /*------------------------ states ------------------ */
  const [show, setShow] = useState(false);
  /*------------------- function method -------------- */
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);
  drag(drop(ref));
  /*-------------------------------------------------- */
  return (
    <div>
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={"item"}
        onClick={onOpen}
      >
        <p className={"item-title"}>{item.title}</p>
      </div>
      {show && <Window item={item} onClose={onClose} show={show} />}
    </div>
  );
};

export default React.memo(Item);
