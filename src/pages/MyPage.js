import React from "react";

import MyStudy from "../containers/MyStudy";
const MyPage = ({ history }) => {

  return (
    <div className="MyPage">
      <MyStudy history={history}/>
    </div>
  );
};

export default MyPage;
