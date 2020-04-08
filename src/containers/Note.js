import React, {Component} from "react";

import {SERVICE_URL} from "../config";

import TitleNavBar from "../components/TitleNavBar";
import NoteDetail from "../components/NoteDetail";

class Note extends Component{
    constructor(props){
        super(props);
        this.state = {
            page:{
                name: "note",
                title: "쪽지",
                sub_title: [
                ]
            },
            note:null
        }
    }

    getNote = (note_id) => {
        const url = SERVICE_URL+"/study/note/";
        const history = this.props.history;
        const token = window.sessionStorage.getItem("token");

        fetch(url + note_id, {
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
                throw new Error(json.message);
            }
            this.setState({
                note: json,
            });
            return json;
        })
        .catch(err => {
            history.push("");
            console.log(err);
        });    
    }

    componentDidMount = () => {
        const note_id = this.props.match.params.note_id;
        this.getNote(note_id);
    }

    render(){
        const page = this.state.page;
        return(
            <>
            <TitleNavBar page={page} onClick={this.handleClickNavBar}/>
            <NoteDetail note={this.state.note}/>
            </>
        )
    }
}

export default Note;
