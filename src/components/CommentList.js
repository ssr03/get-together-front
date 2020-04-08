import React, { Component } from "react";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

class CommentList extends Component {

  render() {
    const {comments, input,reply_inputs, onReply, onReplySubmit, onShow, onComment, onSubmit} = this.props;

    const comment_list =comments.map(
      (comment, index)=>(
        <CommentItem
          id={index}
          key={index}
          input={input}
          reply_input={reply_inputs[index]}
          comment={comment}
          onShow={onShow}
          onReplySubmit={onReplySubmit}
          onReply={onReply}/>
      )
    )
   
    return (
      <div className="container m-4">
        <div className="container ml-3">
          <div className="row mt-4">
            <h4>댓글</h4>
          </div>
          <div className="container">
            <CommentForm input={input} onComment={onComment} onSubmit={onSubmit}/>
          </div>
        </div>
        <div className="container mt-2 ml-3">
          <ul className="list">
            {comment_list}
          </ul>
        </div>
      </div>
    );
  }
}

export default CommentList;
