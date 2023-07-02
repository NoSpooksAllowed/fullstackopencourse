import React from "react";

const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <p>Hello world</p>
      <Hello />
    </div>
  );
};
export default App;
