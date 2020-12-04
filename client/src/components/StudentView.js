import React from "react";
import StudentHomePage from "./StudentHomePage.js"
class StudentView extends React.Component {
    render() {
        return (
            <StudentHomePage  userObj={this.props.userObj}/>
        );
    }
}

export default StudentView;