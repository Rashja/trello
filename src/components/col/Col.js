import React from "react";

/**
 *
 * @param {JSX.Element} children
 * @param {boolean} isOver
 */

const Col = ({ isOver, children }) => {
  const className = isOver ? " highlight-region" : "";

  return <div className={`col${className}`}>{children}</div>;
};

export default Col;
