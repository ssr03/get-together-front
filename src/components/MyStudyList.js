import React, { Component } from "react";

import MyStudyRow from "./MyStudyRow";

class MyStudyList extends Component{
    render(){
        const {study_list} = this.props;
        const list = study_list.map(
            (study,id) =>(
                <MyStudyRow key={id} study={study} id={id}/>
            )
        );
        return(
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                        <th>No.</th>
                        <th>스터디 제목</th>
                        <th>상태</th>
                        <th>장소</th>
                        <th>마감일</th>
                        <th>참여인원</th>
                        <th>목표 인원</th>
                        <th>개설일</th>
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </table>
            </div> 
        )
    }
}

export default MyStudyList;