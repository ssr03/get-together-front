import React, {Component} from "react";
import { Link } from "react-router-dom";

import isCheck from "../utils/isCheck";

class NoteRow extends Component {
    render(){
        const {note,id,sub_page_no} = this.props;
        const key = id;
        return(
            <tr key={key}>
                <td>{key + 1}</td>
                {sub_page_no===0?
                    <th>{note.sender}</th>
                    :
                    <th>{note.receiver}</th>
                }
                <td><Link to={`/note/${note.note_id}`}>{note.title}</Link></td>
                <td>{note.sent_date}</td>
                <td>{isCheck(note._checked)}</td>
            </tr>
        )
    }
}

export default NoteRow;
