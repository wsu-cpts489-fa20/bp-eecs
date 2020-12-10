import React from "react";
import Semesters from "../Semesters.js";
import StudentHomePage from "./StudentHomePage.js"
class StudentView extends React.Component {
    render() {
        return (
            <div>
                <ModeBar
                    menuOpen={this.props.menuOpen}
                    modes={Object.values(Semesters)}
                    admin={this.props.userObj.admin}
                />
                <StudentHomePage  userObj={this.props.userObj}/>
            </div>
        );
    }
}

export default StudentView;