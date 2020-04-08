import React, {Component} from "react";
import TitleNavBar from "../components/TitleNavBar";
import SignUpForm from "../components/SignUpForm";
import { SERVICE_URL } from "../config";

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            page:{
                name: "sign-up",
                title: "회원가입",
                sub_title: [
                ]
            },
            user:{
                password:null,
                repassword:null,
                email:""
            },
            is_valid:true,
            id_is_valid:true
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        this.setState(prevState=>({
            user:{
                ...prevState.user,
                [name]:value
            }
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.postUser();
    }

    handlePassword = (e) => {
        let is_valid = false;
        const {password, repassword} = this.state.user;

        if(repassword===null||repassword===""||password===repassword)is_valid = true;

        this.setState({
            is_valid:is_valid
        })
    }

    handleIsValid = (e) =>{
        this.setState({
            is_valid:true
        })
    }

    handleIdIsValid = (e) =>{
        this.setState({
            id_is_valid:true
        })
    }

    postUser = () => {
        const url = SERVICE_URL+"/study/user";
        const data = this.state.user;
        const history = this.props.history;

        if(data.password!==data.repassword){
            return;
        }
        fetch(url, {
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([response, json]) => {
            if (!response.ok) {
                if(response.status === 400){
                    this.setState({
                        id_is_valid: false
                    })
                }
  
                throw new Error(json.message);
            }
            history.replace("/sign-in")
            return json;
        })
        .catch(err => {
            return err;
        });
    }

    render(){
        const {page, is_valid, id_is_valid} = this.state;
        return(
            <>
            <TitleNavBar page={page}/>
            <div className="container">
                <div className="row justify-content-md-center mt-5">      
                    <div className="mt-5">
                        <h2>STUDY</h2>
                        <SignUpForm 
                        is_valid={is_valid}
                        id_is_valid={id_is_valid}
                        onChange={this.handleChange}
                        onIsValid={this.handleIsValid}
                        onIdIsValid={this.handleIdIsValid}
                        onConfirmPassword={this.handlePassword}
                        onSubmit={this.handleSubmit}> 
                        </SignUpForm>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default SignUp;
