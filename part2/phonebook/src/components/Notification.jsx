import React from "react";

/**
 * @param {Object} props
 * @param {string | null} props.message
 *
 * @returns {React.ReactElement | null}
 */
const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    backgroundColor: "grey",
    borderColor: "green",
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
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
