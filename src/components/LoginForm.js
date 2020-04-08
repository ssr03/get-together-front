import React, {Component} from "react";
import { Link } from "react-router-dom";

class LoginForm extends Component{
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.onChange(name,value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    }

    render(){
        const {loginid, password} = this.props;

        return(
            <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3 mt-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src="/img/user.png" alt=""/>
                  </span>
                </div>
                <input
                  type="text"
                  id="user_id"
                  className="form-control"
                  placeholder="아이디"
                  name="loginid"
                  value={loginid}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src="/img/password.png" alt="password"/>
                  </span>
                </div>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="비밀번호"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <button
                  type="submit"
                  id="signin_submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
              </div>
              <span><Link to="/sign-up">회원가입</Link></span>
            </form>
        );

    }
}

export default LoginForm;
