import React, {Component} from "react";
import { Link } from "react-router-dom";

import "../include/note.css";

class NoteDetail extends Component{

    render(){
        const {note} = this.props;
        return(
            <>
            {note!==null&&
                <div className="container">    
                    <div className="container fix_area ml-3">
                        <div className="btn-group task_btn m-2">
                            <button className="btn btn-outline-primary">삭제</button>
                            <button className="btn btn-outline-primary">답장</button>
                            <button className="btn btn-outline-primary"><Link to="/note/">목록</Link></button>
                        </div>
                    </div>     
                    <div className="container note_header">
                        <div className="row">
                            <label className="col-sm-2"><strong>보낸사람</strong></label>
                            <span className="col text-left">{note.sender}</span>
                        </div>
                        <div className="row">
                            <label className="col-sm-2"><strong>받은사람</strong></label>
                            <span className="col text-left">{note.receiver}</span>
                        </div>
                        <div className="row">
                            <label className="col-sm-2"><strong>받은시간</strong></label>
                            <span className="col text-left">{note.sent_date}</span>
                        </div>
                    </div>
                    <div className="container note_contents m-4">
                        <pre className="text-left" dangerouslySetInnerHTML={ {__html: note.note} }></pre>
                    </div>
                </div>
            }
            </>
        )
    }
}

export default NoteDetail;
