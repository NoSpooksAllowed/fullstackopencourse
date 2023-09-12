import React from "react";

/**
 * @param {Object} props
 * @returns {React.ReactElement}
 */
const Hello = props => {
  return (
    <div>
      <p>
        Hello {props.name} you are {props.age} years old
      </p>
    </div>
  );
};

/**
 * @returns {React.ReactElement}
 */
const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  );
};

/**
 * @returns {React.ReactElement}
 */
const App = () => {
  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
  ];

  return (
    <div>
      <p>
        {friends[0].name} {friends[0].age}
      </p>
      <p>
        {friends[1].name} {friends[1].age}
      </p>
    </div>
  );
};

export default App;
