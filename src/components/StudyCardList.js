import React, { Component } from "react";

import StudyCard from "./StudyCard";

const CARD_NUM = 8;
class StudyCardList extends Component{
    render(){
        const {index, total_num, study_list, onTag, onClick} = this.props;
        const list = study_list.map(
            (study,id)=>(
                <StudyCard
                   key={id}
                   study={study}
                   onTag = {onTag}
                />
            )
        );
        const count = study_list.length;
        const current_num = (index+1)*CARD_NUM;
        
        return(
            <div className="wrap m-5">
                <div className="container-fluid ">
                    {this.props.tag_name !== null && (
                        <h1 className="hash text-left">#{this.props.tag_name}</h1>
                    )}
                    <div className="row">{list}</div>
                    {this.props.tag_name==null&&count===CARD_NUM&&current_num>=total_num&&
                    <button type="button" className="row btn btn-secondary btn-lg btn-block" onClick={onClick}>더 보기</button>}
                </div>
            </div>
        )
    }
}

export default StudyCardList;