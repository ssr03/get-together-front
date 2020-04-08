import React, {Component} from "react";

import CommentForm from "./CommentForm";
import ReplyItem from "./ReplyItem";

class ReplyList extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        const board_cmt_id = this.props.board_cmt_id;
        const index = this.props.id;

        this.props.onSubmit(board_cmt_id, index);
    }

    handleReply = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const index = this.props.id;
        this.props.onReply(index, value)
    }

    render(){
        const {reply, reply_input} = this.props;    
        const reply_list =(reply!==null?
             reply.map(
                (row, index)=>(
                    <ReplyItem key={index} reply={row}/>
                )
             )
             :
             (<></>)
        )

        return(
            <div className="container reply_area">
                <ul className="mb-4">
                {reply!==null&&
                    reply_list
                }
                <li className="reply_li m-1">
                    <CommentForm input={reply_input} onComment={this.handleReply} onSubmit={this.handleSubmit}></CommentForm>
                </li>
            </ul>
          </div>
        )
    }
}

export default ReplyList;
