import React, {Component} from "react";

import {SERVICE_URL} from "../config";

import LoginForm from "../components/LoginForm";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginid:"",
            password:""
        }
    }

    handleChange = (name, value) => {
        this.setState(prevState => ({
                ...prevState,
                [name]:value
            })  
        );
    }

    handleSubmit = () => {
       this.postLoginData();
    }

    postLoginData = () => {
        const data = {
            loginid: this.state.loginid,
            password: this.state.password
        };
        fetch(SERVICE_URL+"/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => Promise.all([response, response.json()]))
        .then(([response,json])=>{
            if(!response.ok){
                throw new Error(json.message);
            }
            window.sessionStorage.setItem("token", json.token);
            window.sessionStorage.setItem("loginid", json.loginid);

            const history = this.props.history;
            history.goBack();

            return json;
        })
        .catch(err => {
            console.log(err)
            alert("로그인 실패");
        });   
    }

    render(){
        return(
            <div className="container">
                <div className="row justify-content-md-center mt-5">      
                    <div className="form-group mt-5">
                        <h2>STUDY</h2>
                        <LoginForm onChange={this.handleChange} onSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;