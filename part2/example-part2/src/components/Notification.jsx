import React from "react";

/**
 * @param {Object} props
 * @param {string | null} props.message
 *
 * @returns {React.ReactElement | null}
 */
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
