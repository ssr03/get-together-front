import React, {Component} from "react";

import ReplyList from "./ReplyList";
class CommentItem extends Component{

    render(){
        const {id, reply_input, comment, onShow, onReply, onReplySubmit} = this.props;

        return(
            <>
                <li className="comment">
                <div className="row comment mb-2">
                    <div className="col-2">
                    <div className="">
                        <b>{comment.writer}</b>
                    </div>
                    </div>

                    <div className="col-6 text-left">
                    <p>{comment.comment}</p>
                    </div>
                    <div className="col"> 
                    <small>
                        <a name={this.props.id} onClick={onShow}>     
                            {comment.reply===null?
                                "답글작성"
                                :
                                "답글"
                            }
                        </a>
                    </small>
                    </div>
                    <div className="col text-right">
                        <small className="text-muted">{comment.created_time}</small>
                    </div>
                </div>   
                </li>
                {comment.is_flag&&
                    <li>
                        <ReplyList 
                        id={id}
                        board_cmt_id={comment.board_cmt_id}
                        reply={comment.reply} 
                        reply_input={reply_input} 
                        onReply={onReply} 
                        onSubmit={onReplySubmit}/> 
                    </li>
                }
            </>
        )
    }
}

export default CommentItem;
