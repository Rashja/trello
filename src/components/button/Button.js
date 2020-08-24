import React from "react";

/**
 *
 * @param {JSX.Element} children
 * @param {string} green
 * @param {string} red
 *
 */

function Button({ children, green, red, ...rest }) {
  return (
    <button {...rest} className={`btn ${green && "green"} ${red && "red"}`}>
      {children}
    </button>
  );
}

export default Button;
