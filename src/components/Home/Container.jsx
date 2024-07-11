import React from "react";

const Container = (props) => {
  return (
    <div
      className={`container p-4 mx-auto  ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
