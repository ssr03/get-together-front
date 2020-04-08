import React from "react";

import NoteBox from "../containers/NoteBox";

const NoteBoxPage = ({ history }) => {

  return (
    <div className="NoteBox">
      <NoteBox history={history}/>
    </div>
  );
};

export default NoteBoxPage;
