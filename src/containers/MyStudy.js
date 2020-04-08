import React, {Component} from "react";

import {SERVICE_URL} from "../config";

import TitleNavBar from "../components/TitleNavBar";
import MyStudyList from "../components/MyStudyList";
class MyStudy extends Component{
    constructor(props){
        super(props);
        this.state = {
            page:{
                name: "my-study",
                title: "My Page",
                sub_title: [
                    {name:"내가 만든 스터디", is_flag:true, no:0},
                    {name:"참여중인 스터디", is_flag:false, no:1}
                ]
            },
            study_list:[]
        }
    }

    getStudyList = (url) => {
        const token = window.sessionStorage.getItem("token");
        const history = this.props.history;
        fetch(url, {
          method: "GET",
          headers: {
            "x-auth-token": token
          }
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                if (response.status === 401) {
                alert("로그인을 먼저 해주세요");
                history.push("/sign-in");
                return;
                }
                if(response.status === 404){
                    this.setState({
                        study_list:[]
                    })
                }
                throw new Error(json.message);
            }
            this.setState({
                study_list: json
            });
            return json;
        })
        .catch(err => {
            return err;
        });
    };
    
    handleClickNavBar = (e) => {
        const no = Number(e.target.name);
        let url=SERVICE_URL+"/study/mystudy";

        const sub_titles = [];

        this.state.page.sub_title.map(sub=>{
            
            let is_flag = false;
            if(sub.no===no){
                is_flag=true;
            }
            const sub_title = {
                name:sub.name,
                is_flag:is_flag,
                no:sub.no
            }
            sub_titles.push(sub_title);
        });

        this.setState(prevState=>({
            page:{
                ...prevState.page,
                sub_title:sub_titles
            }
        }))

        if(no===0){
            url+="/owner"
        }
        this.getStudyList(url)
    }

    componentDidMount() {
        const url = SERVICE_URL+"/study/mystudy/owner";
        this.getStudyList(url);
    }
    
    render(){
        const page = this.state.page;
        return(
            <>
                <TitleNavBar page={page} onClick={this.handleClickNavBar}/>
                <MyStudyList sub_title={page.sub_title} study_list={this.state.study_list}/>
            </>
        )
    }
}
export default MyStudy;