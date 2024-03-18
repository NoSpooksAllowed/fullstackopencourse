import React from "react";

/**
 * @param {Object} props
 * @param {Object | null} props.user
 * @param {React.FormEventHandler<HTMLFormElement>} props.handleLogin
 * @param {String} props.username
 * @param {String} props.password
 * @param {CallableFunction} props.setUsername
 * @param {CallableFunction} props.setPassword
 *
 * @returns {React.ReactElement | null} */
const LoginForm = ({
  user,
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  }

  return null;
};

export default LoginForm;
