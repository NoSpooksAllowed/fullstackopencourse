import React from "react";

/**
 * @param {CallableFunction} setUser
 */
const removeUser = (setUser) => {
  window.localStorage.removeItem("loggedNoteappUser");
  setUser(null);
};

/**
 * @param {Object} props
 * @param {Object | null} props.user
 * @param {CallableFunction} props.setUser
 *
 * @returns {React.ReactElement | null}
 */
const Logout = ({ user, setUser }) => {
  if (user !== null) {
    return (
      <div>
        <button onClick={() => removeUser(setUser)}>logout</button>
      </div>
    );
  }

  return null;
};

export default Logout;
