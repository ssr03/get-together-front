import React, { Component } from "react";

import NoteRow from "./NoteRow";

class NoteList extends Component{
    render(){
        const {note_list, sub_page_no} = this.props;
        const list = note_list.map(
            (note,id) =>(
                <NoteRow key={id} note={note} id={id} sub_page_no={sub_page_no}/>
            )
        );
        return(
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            {sub_page_no===0?
                                <th>보낸사람</th>
                                :
                                <th>받은사람</th>
                            }
                            <th>제목</th>
                            <th>보낸날짜</th>
                            <th>읽음 표시</th>
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </table>
            </div> 
        )
    }
}

export default NoteList;
