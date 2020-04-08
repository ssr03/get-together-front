import React, {Component} from "react";

import {SERVICE_URL} from "../config";

import TitleNavBar from "../components/TitleNavBar";
import WriteForm from "../components/WriteForm";
import update from "react-addons-update";

class StudyWrite extends Component {
    constructor(props){
        super(props);
        this.state = {
            page:{
                name: "study-write",
                title: "스터디 모집글 작성",
                sub_title: [
                ]
            },
            study:{
                is_public:true
            },
            schedule_id:0,
            schedules:[
                { id: 0, study_day: "월", study_start_time: null, study_end_time: null }
            ],
            imgBase64:null,
            formImgData:null,
            search:"",
            searchmarker:null, 
            map:null
        }
    }
    
    handleImg = (name, value) => {
        this.setState({
            [name]:value,    
        })
    }

    handleChange = (name, value) =>{
        this.setState(prevState => ({
            study:{
                ...prevState.study,
                [name]:value
            }
        }))
    }

    handleTag = (tags) => {
        this.setState(prevState => ({
            study: {
                ...prevState.study,
                tags: tags
            }
        }))
    }

    handleChangeSchedule = (name, value) => {
        const index = this.state.schedule_id;

        this.setState({
            schedules:update(
                this.state.schedules,
                {
                   [index] :{
                        [name]:{$set:value}
                    }
                }
            )
        })
    }

    handleAddSchedule = () => {
        const {schedules} = this.state;
        let id = this.state.schedule_id;

        //이전 schedule에 null 값이 없는지 확인
        const pre_schedule = schedules[id];
        if(pre_schedule.study_start_time===null || pre_schedule.study_end_time===null){
            alert("스터디 시간을 먼저 입력 후 추가해주세요")
        }else{
            id = this.state.schedule_id;
            id++;
            this.setState({
                schedule_id:id,
                schedules: schedules.concat({
                    id: id,
                    study_day:"월",
                    study_start_time:null,
                    study_end_time:null,
                    key:id
                })
            })
        }   
    }
    //주소 변환
    geocodeAddress = (map, address) => {
        const geocoder = new window.google.maps.Geocoder();
        let searchmarker = this.state.searchmarker;
        geocoder.geocode(
        { address: address },
        function(results, status) {
            if (status === "OK") {
                if (searchmarker !== null) {
                    searchmarker.setMap(null);
                }

                map.setCenter(results[0].geometry.location);

                let full_address = results[0].formatted_address;

                searchmarker = new window.google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: full_address
                });
                map.setZoom(15);
                //좌표 받기
                const lat = searchmarker.position.lat(); //위도
                const lng = searchmarker.position.lng(); //경도

                const address = full_address
                    .split(" ")
                    .slice(1)
                    .join(" ");
            
                this.setState(prevState=>({
                    searchmarker:searchmarker,
                    study:{ 
                        ...prevState.study,
                        location:address,
                        location_lat:lat,
                        location_lng:lng
                    }
                }));
                document.getElementById("address").value = address;
            } else {
                alert("error",status);
            }
        }.bind(this)
        );
    };

    handleSearch = (e) => {
        const search = document.getElementById("address").value;
        this.geocodeAddress(this.state.map, search)
    }

    handleSearchChange = (e) =>{
        this.setState({
            search: e.target.value
        })
    }

    handleLocation = (map) => {
        this.setState({
            map:map
        })
    }

    handleRemove = (e) => {
        this.setState({
            imgBase64:null, 
            formImgData:null
        })
    }

    handleReset = (e) => {
        this.handleRemove(e);
        this.setState({
            schedules:[
                { id: 0, study_day: "월", study_start_time: null, study_end_time: null }
            ],
            schedule_id:0,
            study:{
                is_public:true
            }
        })
    }
    
    handleCancel = () => {
        const history = this.props.history;
        history.push("/study");    
    }

    handleSubmit = (schedules) => {
        this.setState(prevState =>({
            study:{
                ...prevState.study,
                schedules:schedules
            }
        }))
        this.submitData();    
    }

    submitData = () => {
        const history = this.props.history;
        const token = window.sessionStorage.getItem("token");
    
        const formData = this.state.formImgData


        fetch(SERVICE_URL+"/study/upload/file", {
          method: "POST",
          headers: {
            "x-auth-token": token
          },
          body: formData
        })
        .then(response => {
            if (response.status === 401) {
              alert("로그인을 먼저 해주세요");
              history.push("/sign-in");
              return;
            }
            if (response.ok) return response.json();
            throw new Error(response.status);
        })
        .then(json => {
            const storedName = json.storedName;
    
            this.setState(prevState => ({
              study: {
                ...prevState.study,
                img_url: storedName
              }
            }));
            this.postStudy();
        })
        .catch(err => {
            console.log("error");
            return err;
        });
    }

    postStudy = () => {
        const data = this.state.study;
        const token = window.sessionStorage.getItem("token");

        fetch(SERVICE_URL+"/study/recruit", {
        method: "POST",
        headers: {
            "x-auth-token": token,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) return response.json();
            throw Error(response.status);
        })
        .then(json => {
            const history = this.props.history;
            history.push("/study/" + json.board_id);
        })
        .catch(error => console.log("Error"));
    }

    render(){
        return(
            <>
                <TitleNavBar page={this.state.page}/>
                <div className="container mt-3">
                    <WriteForm 
                        imgBase64={this.state.imgBase64}
                        schedules={this.state.schedules} 
                        study={this.state.study}
                        search={this.state.search}
                        onSearchChange={this.handleSearchChange}
                        onSubmit={this.handleSubmit}
                        onReset={this.handleReset}
                        onCancel={this.handleCancel}
                        onSearch={this.handleSearch}
                        onLocation={this.handleLocation}
                        onDropImg={this.handleImg} 
                        onChange={this.handleChange}
                        onTag={this.handleTag}
                        onScheduleChange={this.handleChangeSchedule}
                        onScheduleToggle={this.handleAddSchedule}/>
                </div>
            </>
        )
    }
}

export default StudyWrite;