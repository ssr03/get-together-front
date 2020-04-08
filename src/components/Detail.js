import React, {Component} from "react";

import {SERVICE_URL} from "../config";
class Detail extends Component{
    render(){
        const {study, tags} = this.props;
        const tag_list = tags.map((tag, index) => (
            <a className="hash" key={index}>
              #{tag}
            </a>
          ));
        
        return(
            study!==null&&
            <>
            <div className="container mt-5">
                <div className="row"> 
                    <div className="col mt-1">
                            <img
                            src={SERVICE_URL+`/study/img/${study.img_url}`}/>
                    </div>
                    <div className="col-md-auto m-4">
                        <h2>{study.title}</h2>

                        <div className="hash">{tag_list}</div>
                        <div className="m-3 text-left">
                            <div>
                            <div className="m-1 mb-2">
                                <img src="/img/user.png"/>
                                스터디 장:
                                {study.writer}
                            </div>
                            </div>
                            <div>
                            <div className="m-1 mb-2">
                                <img src="/img/calender.png"/>
                                모집기간: ~{study.deadline}
                            </div>
                            </div>
                            <div>
                            {study.cost > 0 && (
                                <div className="m-1 mt-2">
                                <img src="/img/cost.png" />
                                참가비:
                                {study.cost}원
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="col mr-4">
                        <small className="text-muted">{study.created_time} 작성</small>
                    </div>
                </div> 
            </div>
            <div className="container m-4">
                <h4 className="row ml-2 mt-4">상세내용</h4>
                <div className="row card ml-2 mr-4">
                    <pre className="card-body text-left">{study.content}</pre>
                </div>
            </div>
 
            </>                    
        )
    }
}

export default Detail;