import "./include/App.css";

import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MyPage from "./pages/MyPage";
import StudyRecruit from "./pages/StudyRecruit";
import StudyRecruitWrite from "./pages/StudyRecruitWrite";
import StudyRecruitDetail from "./pages/StudyRecruitDetail";
import SignIn from "./pages/SignIn";
import NoteBoxPage from "./pages/NoteBoxPage";
import NoteDetail from "./containers/Note";
import NotFound from "./components/NotFound.js";
import Header from "./components/Header";
import SignUpPage from "./pages/SignUpPage";

class App extends Component {

  render() {
    const loggedIn = window.sessionStorage.getItem('loginid')
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/study" component={StudyRecruit} />

          <Route path="/study/write" component={StudyRecruitWrite} />
          <Route path="/study/:board_id" component={StudyRecruitDetail} />

          <Route path="/my-page" component={MyPage} />
          <Route exact path="/note" component={NoteBoxPage}/>
          <Route path="/note/:note_id" component={NoteDetail}/>
          <Route
            path="/Sign-in"
            component={({ history }) => (
              loggedIn ? <Redirect to="/study"/> : <SignIn history={history} />      
            )}
          />
          <Route path="/sign-up"
           component={({ history }) => (
            loggedIn ? <Redirect to="/study" /> : <SignUpPage history={history} />      
          )}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
