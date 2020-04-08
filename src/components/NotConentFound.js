import React, {Component} from "react";

class NotConentFound extends Component{
    render(){
        const {detail} = this.props;
        return(
            <div>
                <h5>{detail}가 없습니다.</h5>
                <p style={{ textAlign: "center" }}>
                <a href="/study">메인으로 </a>
                </p>
            </div>
        )
    }
}

export default NotConentFound
