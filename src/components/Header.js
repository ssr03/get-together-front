import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginid:null,
      note_count:0
    }
  }
  getLoginId = () => {
    const loginid = window.sessionStorage.getItem("loginid");
    this.setState({
      loginid:loginid
    })
  }

  getNoteCount = () => {

    const token = window.sessionStorage.getItem("token");
    
    if(token!==null){
      const url = "http://localhost:8080/study/note/receiver/count";
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
                this.setState({note_count:0})
              return;
              }
              throw new Error(json.message);
          }
          this.setState({
            note_count: json
          });
          return json;
      })
      .catch(err => {
          return err;
      });
    }
  }

  onClickHandler = () => {
    this.logOut();
    this.getLoginId();
  };

  logOut = () => {
    const token = window.sessionStorage.getItem("token");

    fetch("http://localhost:8080/user/logout", {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })
    .then(response => Promise.all([response, response.json()]))
    .then(([response,json])=>{
        if(!response.ok){
            throw new Error(json.message);
        }
        window.sessionStorage.clear();
        this.getLoginId();
        return json;
    })
    .catch(err => {
      window.sessionStorage.clear();
      this.getLoginId();
    });   
  }
  componentDidMount = () => {
    this.getLoginId();
    this.getNoteCount();
  }

  componentDidUpdate = () =>{
    this.getNoteCount();
  }
  render() {
    const loginid =this.state.loginid;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="navbar-brand"><Link to="/study" className="link-a">STUDY</Link></Navbar.Brand>
        <Navbar.Toggle data-target="#navigation" aria-controls="navigation">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse className="p-1 p-lg-0" id="navigation">
          <Nav className="ml-lg-auto">
            <Nav.Link href="/study">
              <div className="nav-link">
                스터디 모집 <span className="sr-only">(current)</span>
              </div>
            </Nav.Link>
            <Nav.Link href="/my-page">
              <div className="nav-link">MY STUDY</div>
            </Nav.Link>
            <Nav.Link href="/note">
              <div className="nav-link">쪽지함 
                {this.state.note_count!==0&&
                  <span className="badge badge-primary badge-pill">{this.state.note_count}</span>
                }
              </div>
            </Nav.Link>
            {loginid === null && (
              <Nav.Link href="/sign-in">
                <div className="btn btn-outline-primary">Sign in</div>
              </Nav.Link>
            )}
            {loginid !== null && (
              <Nav.Link>
                <button
                  className="btn btn-outline-primary"
                  onClick={this.onClickHandler}
                >
                  Sign out
                </button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
