import React from "react";
import {Route, Switch} from "react-router-dom";
import ModeBar from './ModeBar.js';
import Majors from "../Majors";
import Rounds from "./Rounds";
import Semesters from "../Semesters.js";
import StudentHomePage from "./StudentHomePage.js"


class StudentView extends React.Component {
    render() {
        this.props.userObj.student = true;
        return (
            <Switch>
              <div>
                <ModeBar
                    menuOpen={this.props.menuOpen}
                    modes={Object.values(Semesters)}
                    admin={this.props.userObj.student}
                    />
              </div>
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