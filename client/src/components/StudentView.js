import React from "react";
import Semesters from "../Semesters.js";
import StudentHomePage from "./StudentHomePage.js"
import ModeBar from './ModeBar.js';
class StudentView extends React.Component {
    render() {
        this.props.userObj.student = true;
        return (
            <div>
                <ModeBar
                    menuOpen={this.props.menuOpen}
                    modes={Object.values(Semesters)}
                    admin={this.props.userObj.student}
                />
                <StudentHomePage  userObj={this.props.userObj}/>
            </div>
        );
    }
}

export default StudentView;