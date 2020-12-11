import React from 'react';
import {Link, Switch, Route, useHistory} from "react-router-dom";
import {withRouter} from "react-router";

class StudentHomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {major: "Computer Science"}
    }

    
    handleChange = async (event) => {
        this.setState({major: event.target.value});
        const url = '/rounds/' + this.props.userObj.id;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.major)
        });
        const msg = await res.text();
        if (res.status !== 200) {
            this.setState({errorMsg: msg});
        } else {
            this.setState({errorMsg: ""});
            await this.props.refreshOnUpdate();
        }
        this.props.history.goBack()
    }
    render() {
        return (
        <div id = "HomePage"className="padded-page">
            <center>
            <h1 >Welcome </h1>
            <h2> Student Home Page</h2>
            </center>
            <label style={{textAlign:"left"}}>Select your major:
                <select name="major" value={this.state.major} 
                className="form-control form-center" onChange={this.handleChange}>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Software Engineering">Software Engineering</option>
                </select> 
            </label>
            <center>
                <h1>Current Courses</h1>
            </center>
            <p></p>
            <table className="table table-hover">
                <thead className="thead-light">
                <tr>
                    <th>Course</th>
                    <th>Course Name</th>
                    <th>Course Days</th>
                </tr>
                </thead>
            </table>
            <p></p>
            <h3 style={{textAlign:"left"}}>Class Dependeny Graph</h3>
            <p></p>
            <h4>Future Classes List</h4>
        </div> 
        );
    }   
}


export default withRouter(StudentHomePage);
