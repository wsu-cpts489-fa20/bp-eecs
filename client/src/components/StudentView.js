import React from "react";
import {Route, Switch} from "react-router-dom";
import Majors from "../Majors";
import Rounds from "./Rounds";

import StudentHomePage from "./StudentHomePage.js"


class StudentView extends React.Component {
    render() {
        return (
            <Switch>
            <StudentHomePage  
            userObj={this.props.userObj}
            refreshOnUpdate={this.props.refreshOnUpdate}
            menuOpen={this.props.menuOpen}
            />
            </Switch>
        );
    }
}

export default StudentView;