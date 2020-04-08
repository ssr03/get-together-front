import React, { Component } from "react";

import SubNavBar from "./SubNavBar";

class TitleNavBar extends Component{
    render(){
        const {page, onClick} = this.props;

        return(
            <nav className="navbar navbar-expand-lg navbar-light m-1 ml-3">
                <div className="navbar-brand">
                    <u>
                        <strong>{page.title}</strong>
                    </u>
                </div>
                <SubNavBar sub_title={page.sub_title} onClick={onClick}/>
            </nav>
        
        )
    }
}

export default TitleNavBar;
