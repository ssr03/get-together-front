import React, { Component } from "react";

class SearchBar extends Component{
    handleChange = (e) => {
        const input = e.target.value;
        this.props.onSearchText(input);
    }
    handleSelect = (e) => {
        this.props.onSelect(e.target.value);
    }
    handleSearch = () => {
        this.props.onSearch();
    }
    handleKeyPress = (e)=>{
        if(e.key === 'Enter'){
            this.handleSearch();
        }
    }
    render(){
        return(
            <div className="col form-inline my-2 my-lg-0 ml-5">
                <select className="form-control mr-sm-1" id="exampleSelect"
                    value={this.props.search.option} onChange = {this.handleSelect}>
                    <option value="entire">전체</option>
                    <option value="city">지역</option>
                </select>
                <label className="my-2 my-sm-0 ml-2">
                    <input type="text" className="dropdown-place input" 
                        onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                </label>
            </div>
        )
    }
}

export default SearchBar;