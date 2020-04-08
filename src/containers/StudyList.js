import React, {Component} from "react";
import { Link } from "react-router-dom";

import {SERVICE_URL} from "../config";

import TitleNavBar from "../components/TitleNavBar";
import SearchBar from "../components/SearchBar";
import StudyCardList from "../components/StudyCardList";
import NotContentFound from "../components/NotConentFound"

class StudyList extends Component{
    constructor(props){
        super(props);
        this.state={
            page:{
                name: "study-list",
                title: "스터디 모집",
                sub_title: [
                    {name:"전체", is_flag:true, no:0},
                    {name:"모집중", is_flag:false, no:1},
                    {name:"모집완료", is_flag:false, no:2}
                ]
            },
            sub_page:0,
            search:{
                option: "entire",
                text:null
            },
            studys:[],
            study_num:0,
            tag_name:null,
            not_found:""
        }
    }

    handleSearchText = (search) => {
        this.setState(prevState => ({
            search:{
                ...prevState.search,
                text: search
            }
        }));
    }

    handleOption = ( option ) => {
        this.setState(prevState => ({
            search:{
                ...prevState.search,
                option:option
            }
        }));
    }

    handleSearch = () => {
        //option, search로 검색
        const search = this.state.search;

        let url = SERVICE_URL+"/study/search"
        if(search.option==="city")url+="/location";

        if(search!=="")this.getStudyListBySearch(url, search.text);

    }

    handleTag = (tag_id, tag_name) => {
        this.setState({tag_name:tag_name});
        this.getStudyListByTag(tag_id);
    }

    getStudyListBySearch = (url, search) =>{
        var url_form = new URL(url), params = {search:search};

        Object.keys(params).forEach(key=> url_form.searchParams.append(key,params[key]));

        fetch(url_form)
        .then(response=>Promise.all([response, response.json()]))
        .then(([response,json])=>{
            if(!response.ok){
                if(response.status === 404){
                    this.setState({
                        studys:[],
                        not_found: "'"+search+"' 에 대한 검색결과"
                    });
                }
                throw new Error(json.message)
            }
            this.setState({
                studys:[json]
            })
        }).catch(err => {
            return err;
        });
    }

    getStudyListByTag = (tag_id) => {
        fetch(SERVICE_URL+"/study/recruit/tag/" + tag_id)
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                throw new Error(json.message);
            }
            this.setState({
                studys: [json]
            });
            return json;
        })
        .catch(err => {
            return err;
        });
    }

    //TitleNavBar 전체/모집중/모집완료 전환
    handleClickNavBar = (e)=>{
        e.preventDefault();
        const no = Number(e.target.name);
        let url=SERVICE_URL+"/study/recruit";

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
            return sub_title;
        });

        this.setState(prevState=>({
            tag_name:null,
            page:{
                ...prevState.page,
                sub_title:sub_titles
            },
            sub_page:no,
            studys:[],
            study_num:0
        }))

        if(no===0){
            url+="/start/"
        }else{
           url += "/status/"+no+"/start/";  
        }
        
        this.getStudyList(url,0)
    }

    getStudyList = (url,start) => {
        fetch( url + start)
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {

                const num = this.state.study_num+1;
                if(response.status===404){
                    this.setState({
                        study_num:num,
                    })
                }
                throw new Error(json.message);
            }
            let no=json.length;
            this.setState({
                studys: this.state.studys.concat([json]),
                study_num: this.state.study_num+no
            });
        }).catch(err => {
            return err;
        })
    };

    handleAddCards = (e) => {
        e.preventDefault();
  
        let url = SERVICE_URL+"/study/recruit"; 
        const no = this.state.sub_page;

        if(no===0){
            url+="/start/"
        }else{
           url += "/status/"+no+"/start/";  
        }

        this.getStudyList(url,this.state.study_num)
    }
    
    componentDidMount = () => {
        let start = 0;
        const url = SERVICE_URL+"/study/recruit/start/"; 
        this.getStudyList(url, start);
    }    

    render(){
        const page = this.state.page;
        const card_list = (this.state.studys.length>0?
            this.state.studys.map((study_list,index)=>(
                <StudyCardList 
                key={index}
                index={index}
                total_num={this.state.study_num}
                study_list={study_list} 
                tag_name={this.state.tag_name} 
                onTag = {this.handleTag} 
                onClick={this.handleAddCards}/>
        ))
        :
        <NotContentFound detail={this.state.not_found} />
        )
        return(
            <>
                <TitleNavBar page={page} onClick={this.handleClickNavBar}/>
                <div className="row justify-content-between">
                    <SearchBar 
                        search={this.state.search} onSearch={this.handleSearch}
                        onSearchText = {this.handleSearchText} onSelect={this.handleOption}/>
                    <div className="col-3">
                    <Link to="/study/write" className="link-a">
                        <img src="/img/edit.png" width="40" height="40" alt=""></img>
                        &nbsp;글작성
                    </Link>
                    </div>
                </div> 
                {card_list}
            </>
        )
    }
}
export default StudyList;