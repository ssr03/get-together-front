import React from "react";

import StudyDetail from "../containers/StudyDetail"
const StudyRecruitDetail = ({ match, history }) => {
  return (
    <div className="StudyRecruitDetail">
      <StudyDetail match={match} history={history}/>
    </div>
  );
};

export default StudyRecruitDetail;
