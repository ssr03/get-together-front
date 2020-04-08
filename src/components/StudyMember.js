import React, {Component} from "react";

class StudyMember extends Component{
    render(){
        const {study_members} = this.props;
        const list = study_members.map(
            (study_member, index)=>(
            <li className="text-left ml-2">{study_member.loginid}{study_member._owner?" (스터디장)":""}</li>
            )
        )
        const num = study_members.length;
        return(
            
            <div className="container">
                {num!==0&&(<>
                    <div className="row ml-2">
                        <span>스터디원 ({num}명)</span>
                    </div>
                    <ul className="member-form">
                        {list}
                    </ul>
                </>)}   
            </div>
        )
    }
}

export default StudyMember;
