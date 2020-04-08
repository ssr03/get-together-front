import React, {Component} from "react";
import {Link} from "react-router-dom";

import status from "../utils/status";

class MyStudyRow extends Component {
    render(){
        const {study,id} = this.props;
        const key = id;
        return(
            <tr key={key}>
            <td>{key + 1}</td>
            <td>
              <Link to={`/study/${study.board_id}`}>{study.title}</Link>
            </td>
            <td>{status(study.status)}</td>
            <td>{study.location}</td>
            <td>{study.deadline}</td>
            <td>{study.member_num}</td>
            <td>{study.target_num}</td>
            <td>{study.created_time}</td>
          </tr>
    
        )
    }
}

export default MyStudyRow;