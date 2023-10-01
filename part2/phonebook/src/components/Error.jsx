import React from "react";

/**
 * @param {Object} props
 * @param {string | null} props.message
 *
 * @returns {React.ReactElement | null}
 */
const Error = ({ message }) => {
  const errorStyle = {
    color: "red",
    backgroundColor: "grey",
    borderColor: "red",
    borderWidth: "4px",
    borderStyle: "solid",
    borderRadius: "10px",
    fontSize: "30px",
    padding: "20px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  );
};

export default Error;
