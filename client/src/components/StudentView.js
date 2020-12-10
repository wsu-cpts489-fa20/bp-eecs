import React from "react";
import StudentHomePage from "./StudentHomePage.js"
import Majors from "../Majors";
import Rounds from "./Rounds";
import {Route, Switch} from "react-router-dom";

class StudentView extends React.Component {
    render() {
        return (
            <StudentHomePage  
            userObj={this.props.userObj}
            refreshOnUpdate={this.props.refreshOnUpdate}
            menuOpen={this.props.menuOpen}
            
            />
        );
    }
}

export default StudentView;