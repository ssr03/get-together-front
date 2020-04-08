import React from "react";

import Login from "../containers/Login";

const SignIn = ({history}) => {
  return (
    <div className="SignIn">
      <Login history={history}/>
    </div>
  );
};

export default SignIn;
