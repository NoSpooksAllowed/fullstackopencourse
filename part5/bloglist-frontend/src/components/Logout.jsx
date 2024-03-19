import React from "react";

const removeUser = (setUser) => {
  window.localStorage.removeItem("loggedNoteappUser");
  setUser(null);
};

const Logout = ({ user, setUser }) => {
  if (user !== null) {
    return (
      <>
        <button onClick={() => removeUser(setUser)}>logout</button>
      </>
    );
  }

  return null;
};

export default Logout;
