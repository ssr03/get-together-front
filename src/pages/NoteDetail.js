import React from "react";

import Note from "../containers/Note";

const NoteDetail = ({ match, history }) => {

  return (
    <div className="NoteDetail">
      <Note history={history} match={match}/>
    </div>
  );
};

export default NoteDetail;
