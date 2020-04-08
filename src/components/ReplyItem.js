import React, {Component} from "react";

class ReplyItem extends Component{
    render(){
        const {reply} = this.props;
        return(
            <li className="row reply_li m-1">
                <div className="col-2">
                    <b>ㄴ{reply.writer}</b>
                </div>
                <div className="col-6 text-left">
                    <p>{reply.comment}</p>
                </div>
                <div className="col"> 
                </div>
                <div className="col text-right">
                    <small className="text-muted">{reply.created_time}</small>
                </div>
            </li> 
        )
    }
}

export default ReplyItem;
