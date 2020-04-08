import "../include/custom.css";

import React, {Component} from "react";
import Dropzone from "react-dropzone";

import GoogleMap from "./GoogleMap";
import ScheduleItemList from "./ScheduleItemList";
class WriteForm extends Component {

    dropHandler = (acceptedFiles) => {
        let formImgData = new FormData();

        acceptedFiles.map(file => {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                const base64 = reader.result;
                if(base64){
                    this.props.onDropImg("imgBase64", base64);
                }
            }

            reader.readAsDataURL(file);
            formImgData.append("file", file);
            this.props.onDropImg("formImgData",formImgData);
            

        })
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.onChange(name,value);
    }

    handleTag = (e) => {
        const tag_value = e.target.value;
        let tag_list =tag_value.split("#").slice(1);
        let tags = [];
        tag_list.map(tag => {
            tags.push({tag_name:tag, type:1});
            return tags;
        });
        this.props.onTag(tags);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const schedules = this.props.schedules;
        let schedule_list = []
        schedules.map(schedule=>{
            if(schedule.study_start_time!==null&&schedule.study_end_time!==null){
                schedule_list.push(schedule);
            }
        })
        if (this.props.imgBase64 === null) {
            alert("썸네일은 필수 입니다.")
        }else{
            this.props.onSubmit(schedule_list)
        }
    }
    
    // 비공개/공개 선택
    handleOptionChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        let bool = true;
        if(value==="secret")bool = false;

        this.props.onChange(name, bool);
    }

    render() {
        const {imgBase64, search, onSearchChange, onLocation, onReset, onCancel, onSearch, onScheduleChange, onScheduleToggle} = this.props;
        return(
            <form
                onSubmit={this.handleSubmit}
                method="POST"
                encType="multipart/form-data">
                <div className="row justify-content-between">
                    <h5 className="col-5 text-left">스터디 모집글 올리기</h5>
                    <div className="col-6 text-right">
                        <button type="submit" className="btn btn-outline-primary mr-1">
                            모집글 올리기
                        </button>
                        <button
                            type="reset"
                            className="btn btn-outline-primary mr-1"
                            onClick={onReset}
                        >
                            초기화
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-1"
                            onClick={onCancel}
                        >
                            취소
                        </button>
                    </div>
                </div>
                <div className="write-form m-1">
                    <div className="form-group row m-2 mt-4">
                        <label className="col-sm-2 col-form-label">제목*</label>
                        <div className="col-sm-10">
                            <input
                            type="text"
                            name="title"
                            className="form-control"
                            id="title"
                            placeholder="제목"
                            required
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label className="col-sm-2 col-form-label">스터디 장소*</label>
                        <div className="col-sm-10">
                            <div className="form-inline my-2">
                                <input
                                    id="address"
                                    type="text"
                                    className="form-control mr-sm-2"
                                    placeholder="스터디 장소"
                                    name="address"
                                    onChange={onSearchChange}
                                    required
                                />
                                <input
                                    id="address-search"
                                    type="button"
                                    className="btn btn-dark my-2 my-sm-0"
                                    value="검색"
                                    onClick={onSearch}
                                />
                            </div>
                            <div className="mt-1">
                                <div className="searchmap">
                                    <GoogleMap address={search} onLocation={onLocation}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label className="col-sm-2 col-form-label">모집인원*</label>
                        <div className="col-sm-3">
                            <input
                            type="number"
                            className="form-control"
                            id="target_num"
                            min="1"
                            placeholder="모집인원"
                            name="target_num"
                            onChange={this.handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label className="col-sm-2 col-form-label">모집종료일*</label>
                        <div className="col-sm-5">
                            <input
                            type="date"
                            className="form-control"
                            id="deadline"
                            placeholder="모집 종료일"
                            name="deadline"
                            max="9999-12-31"
                            onChange={this.handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label className="col-sm-2 col-form-label">
                            스터디 목적 해시태그*
                        </label>
                        <div className="col-sm-10">
                            <input
                            type="text"
                            className="form-control"
                            id="tags"
                            placeholder="#영어#직장인#토익"
                            name="tags"
                            onMouseOver={this.handleTag}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label className="col-sm-2 col-form-label">대표 썸네일</label>
                        <div className="col-sm-8">
                            <Dropzone
                            onDrop={this.dropHandler}
                            onRemove={this.removeHandler}
                            accept="image/png, image/gif, image/*"
                            >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="img_preview">
                                        <span className="text-center">
                                        {imgBase64 ? (
                                            <img src={this.props.imgBase64} alt=""></img>
                                        ) : (
                                            <div></div>
                                        )}
                                        </span>
                                    </div>
                                </div>
                            )}
                            </Dropzone>
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <label className="col-sm-2 col-form-label">상세 설명</label>
                        <div className="col-sm-10">
                            <textarea
                            className="form-control"
                            id="content"
                            placeholder="스터디 개요 및 계획등"
                            rows="8"
                            name="content"
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <ScheduleItemList
                    schedules={this.props.schedules}
                    onChange={onScheduleChange}
                    onToggle={onScheduleToggle}
                    ></ScheduleItemList> 
                    <div className="form-group row m-2">
                        <label className="col-sm-2 col-form-label">스터디 비용</label>
                        <div className="col-sm-10">
                            <input
                            type="number"
                            className="form-control"
                            id="cost"
                            placeholder="스터디 비용"
                            min="0"
                            name="cost"
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-inline row m-2 mb-3">
                        <label className="col-sm-2 col-form-label">공개/비공개</label>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-2 custom-control custom-radio">
                            <input
                            type="radio"
                            id="public"
                            value="public"
                            name="is_public"
                            className="custom-control-input"
                            checked={this.props.study.is_public}
                            onChange={this.handleOptionChange}
                            />
                            <label className="custom-control-label" htmlFor="public">
                            공개
                            </label>
                        </div>
                        <div className="col-sm-2 custom-control custom-radio">
                            <input
                            type="radio"
                            id="secret"
                            value="secret"
                            name="is_public"
                            className="custom-control-input"
                            checked={!this.props.study.is_public}
                            onChange={this.handleOptionChange}
                            />
                            <label className="custom-control-label" htmlFor="secret">
                            비공개
                            </label>
                        </div>
                    </div>
                </div>
        </form>
        )
    }
}

export default WriteForm;
