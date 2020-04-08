import React, {Component} from "react";

import GoogleMap from "../components/GoogleMap";
import StudyMember from "../components/StudyMember";
import status from "../utils/status";

class SideBar extends Component{
    handleJoin = () => {
        this.props.onJoin();
    }

    render(){
        const {study, study_members} = this.props;

        return(
            study!== null &&
            <div className="sticky-ontheside m-4 mt-5">
                <div className="container">
                    <div className="row justify-content-start mb-5">
                        <div className="col-5">
                            <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={this.handleJoin}
                            >
                            참가
                            </button>
                        </div>
                        <div className="col-5 mt-2">
                            <span className="row">
                                <small className="text-muted">
                                    {study.member_num}
                                </small>
                                <small className="text-muted">/</small>
                                <small className="text-muted">{study.target_num}</small>
                                <small className="text-muted">명</small>
                                <span className="ml-1 mb-3">
                                    {status(study.status)}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <StudyMember study_members={study_members}/>
                    </div>
                    <div className="row card">
                        <div className="card-body">
                            <section className="section text-small">
                                <div className="row flex flex--row text-left">
                                    <div className="col-sm-2">
                                    <img src="/img/map.png" />
                                    </div>
                                    <div className="col">
                                    {study.location}
                                    </div>
                                </div>
                                <div className="flex flex--row text-center m-1 mb-3">
                                    <div className="map-image">
                                        <GoogleMap myLatLng={this.props.myLatLng} location={study.location}/>
                                    </div>
                                </div>
                                {study.schedules.length!==0 && (
                                    <div className="row justify-content-start flex flex--row text-left">
                                        <div className="col-sm-2">
                                            <img src="/img/clock.png"/>
                                        </div>
                                        <div className="col">
                                            {study!==null&& study.schedules.map((schedule,index)=>(
                                                <span key={index}>{schedule.study_day}요일 {schedule.study_start_time}~{schedule.study_end_time}<br/></span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar;