import React, {Component} from "react";

class SignUpForm extends Component{

    render(){
        const { is_valid, id_is_valid, onChange, onIdIsValid, onIsValid, onConfirmPassword, onSubmit} = this.props;
        return(
            <form className="text-left" onSubmit={onSubmit}>
                    <div className="form-group">
    
                        <label className="control-label">
                            아이디
                        </label>
                        <input type="text" name="loginid" className={"form-control"+ (id_is_valid? "":" is-invalid")} placeholder="아이디 입력" required 
                        onBlur={onIdIsValid}
                        onChange={onChange}/>
                        {!id_is_valid&&<div className="invalid-feedback">이미 존재하는 아이디 입니다</div>}
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            비밀번호
                        </label>
                        <input type="password" name="password" className="form-control" placeholder="비밀번호 입력" required onChange={onChange}/>
                    </div>
                    <div className="form-group has-danger">
                        <label className="control-label">
                            비밀번호 재확인
                        </label>
                        <input type="password" name="repassword" className={"form-control" + (is_valid? "":" is-invalid")} placeholder="비밀번호 재입력" required
                        onBlur={onConfirmPassword}
                        onKeyDown={onIsValid}
                        onMouseDown={onIsValid}
                        onChange={onChange}/>
                        {!is_valid&&<div className="invalid-feedback">비밀번호가 일치하지 않습니다</div> }
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            이름
                        </label>
                        <input type="text" name="username" className="form-control" placeholder="이름 입력" required onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            이메일
                        </label>
                        <input type="email" name="email" className="form-control" placeholder="이메일 입력" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">가입하기</button>
                    </div>
            </form>
        )
    }
}

export default SignUpForm;
