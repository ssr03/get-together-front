import React, { Component } from "react";
import { Link } from "react-router-dom";

import {SERVICE_URL} from "../config";
import status from "../utils/status";

class StudyCard extends Component{
   
    handleTag = (tag_id, tag_name) => {
        this.props.onTag(tag_id,tag_name);
    }
    render(){
        const { study} = this.props;
        return(
            <div className="col-md-3">
            <div className="card bg-light mb-4 shadow-sm">
              <div className="card-body"></div>
              <div className="thumnail">
                <img
                  src={SERVICE_URL+`/study/thumbnail/${study.img_url}`}
                  alt="Card"
                ></img>
              </div>
              <div className="card-body">
                <h4 className="card-title">
                  <Link to={`/study/${study.board_id}`}>{study.title}</Link>
                </h4>
                <div className="flex flex--row">
                  <img src="/img/map.png" alt=""/>
                  {study.location}
                </div>
                <div className="hash">
                  {study &&
                    study.tags.map((tag, index) => (
                      <a
                        className="hash"
                        key={index}
                        onClick={e => this.handleTag(tag.tag_id, tag.tag_name)}
                      >
                        #{tag.tag_name}
                      </a>
                    ))} 
                </div>
                <div className="d-flex flex-row-reverse justify-content-between align-items-center">
                  <span>
                    <small className="text-muted">{study.member_num}</small>
                    <small className="text-muted">/</small>
                    <small className="text-muted">{study.target_num}</small>
                    <small className="text-muted">명</small>
    
                    <span className="ml-1">{status(study.status)}</span>
                  </span>
                </div>
              </div>
            </div>
          </div> 
        )
    }
}

export default StudyCard;