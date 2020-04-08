import React, {Component} from "react";

import "../include/comment.css";

class CommentForm extends Component{

    handleEnterKey= (e) => {
        if(e.key==="Enter"){
            this.props.onSubmit(e);
        }
    }

    render(){
        const {input, onSubmit, onComment} = this.props;
        const user_id = window.sessionStorage.getItem("loginid")

        return(
            <fieldset>
              <form onSubmit={onSubmit}>
                <div className="comment_write">
                  <div className="comment_write_inner">
                    <div className="comment_profile_area">
                      <div className="text-left comment_box_name">
                        <img src="/img/study.png" alt=""/>&nbsp;{user_id}
                      </div>
                    </div>
                    <div className="comment_write_area">
                      <div className="comment_inbox">
                        <textarea
                        className="comment_textarea" 
                        type="text"
                        name="comment"
                        value={input}
                        placeholder="댓글을 입력하세요"
                        rows="3"
                        cols="30"
                        required={true}
                        onChange={onComment}
                        onKeyPress={this.handleEnterKey}/>
                      </div>
                    </div>
                    <div className="comment_upload text-right">
                      <button className="btn btn-primary m-1" type="submit">
                        입력
                      </button>
                    </div>
                  </div> 
                </div>
              </form>
            </fieldset>
        )
    }
}

export default CommentForm;