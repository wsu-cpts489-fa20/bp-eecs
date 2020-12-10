import React from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
//import StudentTable from "./StudentTable.js";
import { withRouter } from "react-router";

class StudentHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { major: "Computer Science" };
  }

  handleChange = async (event) => {
    this.setState({ major: event.target.value });
    const url = "/rounds/" + this.props.userObj.id;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(this.state.major),
    });
    const msg = await res.text();
    if (res.status !== 200) {
      this.setState({ errorMsg: msg });
    } else {
      this.setState({ errorMsg: "" });
      await this.props.refreshOnUpdate();
    }
    this.props.history.goBack();
  };

  //renderTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  //render each table based on tableMode prop which contains "/cpte"
  renderTable = () => {
    const table = [];
    //const tableMode = this.props.tableMode;
    //const courseTag = tableMode.slice(1);
    const currentUrl = this.props.history.location.pathname;
    for (const round of this.props.rounds) {
      //if (round[courseTag]) {
        table.push(
          <tr key={round._id}>
            <td>{round.courseId}</td>
            <td>{round.courseName}</td>
            <td>{round.description}</td>
            <td>{round.prerequisites}</td>
          </tr>
        );
      }
   // }
    return table;
  };

  //render -- Conditionally render the Rounds mode page as either the rounds
  //table, the rounds form set to obtain a new round, or the rounds form set
  //to edit an existing round.
  render() {
    return (
      <div className="padded-page">
        <div className="studentHeader">
          <div className="studentDropdown">
            <label style={{ textAlign: "left" }}>
              Select your major:
              <select
                name="major"
                value={this.state.major}
                className="form-control form-center"
                onChange={this.handleChange}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Computer Engineering">
                  Computer Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
              </select>
            </label>
          </div>

          <div className="studentTitle">
            <h1>Courses - Spring 2021</h1>
          </div>

          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>Course</th>
                <th>Title</th>
                <th>Credits</th>
                <th>Days & Time</th>
                <th>Instructor</th>
                <th>Enrolled</th>
              </tr>
            </thead>

            {/* <tbody>
              {Object.keys(this.props.rounds).length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ fontStyle: "italic" }}>
                    No courses logged
                  </td>
                </tr>
              ) : (
                this.renderTable()
              )}
            </tbody> */}

          </table>
        </div>
      </div>
    );
  }
}

export default StudentHomePage;
