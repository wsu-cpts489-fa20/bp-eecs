//Rounds -- A parent component for the app's "rounds" mode.
//Manages the rounds data for the current user and conditionally renders the
//appropriate rounds mode page based on App's mode, which is passed in as a prop.

import React from 'react';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js';
import {Link, Route, Switch, withRouter} from "react-router-dom";
import ConfirmDeleteRound from "./ConfirmDeleteRound";
import StudentTable from './StudentTable.js';

class StudentHomePage extends React.Component { 

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);

        this.state = {
            errorMsg: "",
            roundFormRedirect: null,
            major: "Computer Science",
            majorPrefix: "cpts",
            term: "Spring 2021"
        };
    }
    
    
//   handleChange = async (event) => {
//       this.setState({major: event.target.value});
//       const url = '/rounds/' + this.props.userObj.id;
//       const res = await fetch(url, {
//           headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//           },
//           method: 'POST',
//           body: JSON.stringify(this.state.major)
//       });
//       const msg = await res.text();
//       if (res.status !== 200) {
//           //console.log(event.target.value);
//           this.setState({errorMsg: msg});
//       } else {
//           this.setState({errorMsg: ""});
//           //console.log(event.target.value);
//           await this.props.refreshOnUpdate();
//       }
//       this.props.history.goBack()
//   }


  handleChange = async (event) => {
    this.setState({major: event.target.value});
    if (event.target.value == "Computer Science")
    {
        this.setState({majorPrefix: "cpts"});
    }
    else if (event.target.value == "Electrical Engineering")
    {
        this.setState({majorPrefix: "ee"});
    }
    else if (event.target.value == "Computer Engineering")
    {
        this.setState({majorPrefix: "cpte"});
    }
    else  if (event.target.value == "Software Engineering")
    {
        this.setState({majorPrefix: "se"});
    }
    console.log("value: " + event.target.value);
    console.log("major" + this.state.major);
    console.log("majorPrefix" + this.state.majorPrefix);
    this.props.history.goBack()
}





    closeErrorMsg = () => {
        this.setState({errorMsg: ""});
    }

    closeConfirmDeleteRoundModal = () => {
        this.props.history.push(this.props.match.path)
    }

    //render -- Conditionally render the Rounds mode page as either the rounds
    //table, the rounds form set to obtain a new round, or the rounds form set
    //to edit an existing round.
    render() {
        return (
            <div className="studentHeader">
                            <p></p>
            <div className="studentDropdown">
              <label style={{textAlign:"left"}}>Select your major:
                  <select name="major" value={this.state.major} 
                  className="form-control form-center" onChange={this.handleChange}>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Computer Engineering">Computer Engineering</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Software Engineering">Software Engineering</option>
                  </select> 
              </label>
              </div>
              <div className="studentTitle">
                  <h1>{this.state.major} Courses - {this.state.term} </h1>
                  </div>
            <Switch>
                <Route path={`${this.props.match.path}`}>
                    {this.state.errorMsg !== ""
                        ? <div className="status-msg">
                            <span>{this.state.errorMsg}</span>
                            <button className="modal-close" onClick={this.closeErrorMsg}>
                                <span className="fa fa-times"/>
                            </button>
                        </div>
                        : null}
                    <StudentTable
                        rounds={this.props.userObj.rounds}
                        deleteRound={this.deleteRound}
                        menuOpen={this.props.menuOpen}
                        tableMode={this.props.match.path}
                        studentMajor={this.state.majorPrefix}
                        />
                </Route>
            </Switch>
            </div>
        );
    }
}

export default withRouter(StudentHomePage);
