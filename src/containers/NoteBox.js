import React, {Component} from "react";

import {SERVICE_URL} from "../config";

import TitleNavBar from "../components/TitleNavBar";
import NoteList from "../components/NoteList";

class NoteBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            page:{
                name: "note-box",
                title: "쪽지함",
                sub_title: [
                    {name:"받은 쪽지함", is_flag:true, no:0},
                    {name:"보낸 쪽지함", is_flag:false, no:1}
                ]
            },
            note_list:[],
            sub_page_no:0
        }
    }

    handleClickNavBar = (e) => {
        const no = Number(e.target.name);
        let url=SERVICE_URL+"/study/note"

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

            return sub_titles;
        });

        this.setState(prevState=>({
            page:{
                ...prevState.page,
                sub_title:sub_titles
            },
            sub_page_no:no
        }))

        if(no===0){
            url+="/receiver"
        }else if(no===1){
            url+="/sender"
        }

        this.getNoteList(url)
    }

    getNoteList = (url) =>{
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
                        note_list:[]
                    })
                }

                throw new Error(json.message);
            }
            this.setState({
                note_list: json
            });
            return json;
        })
        .catch(err => {
            return err;
        });
    }

    componentDidMount() {
        const url = SERVICE_URL+"/study/note/receiver";
        this.getNoteList(url);
    }
    render(){
        const page = this.state.page;
        return(
            <>
                <TitleNavBar page={page} onClick={this.handleClickNavBar}/>
                <NoteList sub_title={page.sub_title} note_list={this.state.note_list} sub_page_no={this.state.sub_page_no}/>
            </>
        )
    }
}

export default NoteBox;
