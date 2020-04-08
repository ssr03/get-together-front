import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <img src="" />
    <h5>페이지를 찾을 수 없습니다</h5>
    <p style={{ textAlign: "center" }}>
      <Link to="/study">메인으로 </Link>
    </p>
  </div>
);
export default NotFound;
