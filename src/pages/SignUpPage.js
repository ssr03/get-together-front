import React from "react";

import SignUp from "../containers/SignUp";

const SignUpPage = ({history}) => {
  return (
    <div className="SignIn">
      <SignUp history={history}/>
    </div>
  );
};

export default SignUpPage;
