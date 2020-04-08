import React, {Component} from "react";
import update from "react-addons-update";

import "../include/custom.css";

import {SERVICE_URL} from "../config";

import TitleNavBar from "../components/TitleNavBar";
import Detail from "../components/Detail";
import CommentList from "../components/CommentList";
import SideBar from "../components/SideBar";

class StudyDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            page:{
                name: "study-detail",
                title: "",
                sub_title: [
                ]
            },
            study:null,
            study_members:[],
            tags:[],
            comments:[],
            comment:"",
            reply_inputs:[]
        }
    }

    handleJoin = () => {
        this.joinGroup();
    }

    handleReply = (index, value) => {
 
        this.setState({
            reply_inputs:update(
                this.state.reply_inputs,
                {
                   [index] :{$set:value}
                }
            )
        })
    }

    //답글 리스트 보여주기&닫기
    handleShowReply = (e) => {
        e.preventDefault();

        const no = Number(e.target.name);
        const is_flag = this.state.comments[no].is_flag;

        this.setState({
            comments:update(
                this.state.comments,
                {
                   [no] :{
                        is_flag:{$set:!is_flag}
                    }
                }
            )
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.comment===""){
            alert("댓글을 입력하세요")
            return;
        }

        this.postComment();
    }

    handleComment = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]:value
        })
    }

    handleSubmitReply = (comment_id, index) =>{

        this.postReply(comment_id, index)
    }

    getStudy = (board_id) => {
        const url = SERVICE_URL+"/study/recruit/";
        fetch(url + board_id, {
          method: "GET",
          header: {
            "Content-Type": "application/json"
          }
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                throw new Error(json.message);
            }
            this.setState({
                myLatLng: { lat: json.location_lat, lng: json.location_lng },
                study: json,
                tags: json.tags
            });
            return json;
        })
        .catch(err => {
            const history = this.props.history;
            history.push("");
            console.log(err);
        });    
    }

    getStudyMembers = (board_id) => {
        const url = SERVICE_URL+"/study/recruit/"+board_id+"/member";
        const token = window.sessionStorage.getItem("token");

        fetch(url, {
          method: "GET",
          headers: {
            "x-auth-token":token
          }
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                throw new Error(json.message);
            }        
            this.setState({
                study_members: json,
            });
            return json;
        })
        .catch(err => {
            console.log(err);
        });    
    }

    joinGroup = () => {
        const history = this.props.history;
        const url = SERVICE_URL+"/study/recruit/";
        const board_id = this.props.match.params.board_id;

        const token = window.sessionStorage.getItem("token");
        fetch(url + board_id + "/join", {
          method: "POST",
          headers: {
            "x-auth-token": token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                if (response.status === 401|| response.status === 403) {
                    alert("로그인을 먼저 해주세요");
                    history.push("/sign-in");
                    return;
                }
                throw new Error(json.message);
            }
            const member_num = json.member_num;
            const status = json.status;
            this.setState(prevState => ({
                study: {
                ...prevState.study,
                member_num: member_num,
                status: status
                }
            }));

            this.getStudyMembers(board_id);
            return json;
        })
        .catch(err => {
            alert(err.message);
        });
    };
    
    componentDidMount = () => {
        let board_id = this.props.match.params.board_id;
        this.getStudy(board_id);
        this.getStudyMembers(board_id);
        this.getComments(board_id, -1);
    };

    getComments = (board_id, index) => {
        const url = SERVICE_URL+"/study/recruit/"+board_id+"/comment";
        fetch(url, {
          method: "GET",
          header: {
            "Content-Type": "application/json"
          }
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                throw new Error(json.message);
            }
            
            let reply_inputs = [];
            json.map((row,id)=>{
                row.is_flag=(id===index?true:false);
                reply_inputs.push("")
                return reply_inputs;
            })
            
            this.setState({
                comments: json,
                reply_inputs:reply_inputs
            });
            return json;
        })
        .catch(err => {
            console.log(err);
        });    
    }
    
    postReply = (comment_id, index)=>{
        const token = window.sessionStorage.getItem("token");
        const board_id = this.props.match.params.board_id;
        const url = SERVICE_URL+"/study/recruit/"+board_id+"/comment/"+comment_id;
        const history = this.props.history;
        const depth = 0;

        const data = {
            comment:this.state.reply_inputs[index],
            depth:depth,
            is_public:true
        }

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
          },
          body: JSON.stringify(data)
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                if (response.status === 401) {
                    alert("로그인을 먼저 해주세요");
                    history.push("/sign-in");
                    return;
                }
                throw new Error(json.message);
            }
            this.setState({
                reply_input:""
            })
            this.getComments(board_id, index);
            return json;
        })
        .catch(err => {

            console.log(err);
        });  
    }

    postComment = () => {
        const token = window.sessionStorage.getItem("token");
        const board_id = this.props.match.params.board_id;
        const url = SERVICE_URL+"/study/recruit/"+board_id+"/comment";
        const history = this.props.history;

        const data = {
            comment:this.state.comment,
            is_public:true
        }

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
          },
          body: JSON.stringify(data)
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                if (response.status === 401) {
                    alert("로그인을 먼저 해주세요");
                    history.push("/sign-in");
                    return;
                }
                throw new Error(json.message);
            }
            this.setState({
                comment:""
            })
            this.getComments(board_id,-1);
            return json;
        })
        .catch(err => {

            console.log(err);
        });    
    }
    
    render(){
        const study = this.state.study;
        return(
            <>
                <TitleNavBar page={this.state.page}/>
                <div className="wrapper m-2">
                    <div className="main m-2 ml-5">
                        <Detail study={study} tags={this.state.tags}/> 
                        <br/>
                        <CommentList 
                        reply_inputs={this.state.reply_inputs}
                        input={this.state.comment}
                        comments={this.state.comments} 
                        onComment={this.handleComment}
                        onSubmit={this.handleSubmit}
                        onShow={this.handleShowReply}
                        onReply={this.handleReply} 
                        onReplySubmit={this.handleSubmitReply}/>
                    </div>
                    <SideBar study={study} study_members={this.state.study_members} myLatLng={this.state.myLatLng} onJoin={this.handleJoin}/>
                </div>
            </>
        )
    }
}

export default StudyDetail;
