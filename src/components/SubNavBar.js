import React, { Component } from "react";

class SubNavBar extends Component{
  
    render(){
        const {onClick} = this.props;
        let sub_titles = this.props.sub_title.map(
            (sub_title,id)=>(
                <li className="nav-item" key={id}>
                  {sub_title.is_flag?(
                      <a className="nav-link active" name={sub_title.no} onClick={onClick}>
                        {sub_title.name} 
                        <span className="sr-only" onClick={onClick}>(current)</span>
                      </a>
                    ):(
                      <a className="nav-link" name={sub_title.no} onClick={onClick}>
                        {sub_title.name} 
                      </a>
                    )
                  }     
                </li>
            )
        );
        return(
              <div className="collapse navbar-collapse" id="navbarColor">
                <ul className="navbar-nav mr-auto" >
                  {sub_titles}               
                </ul>
              </div>
        )
    }
}

export default SubNavBar;
