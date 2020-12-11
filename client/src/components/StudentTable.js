import React from "react";
import { Link, Switch, Route, useHistory, withRouter } from "react-router-dom";
// import {withRouter} from "react-router";

class StudentHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { major: "Computer Science" };
  }

  //renderTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  //render each table based on tableMode prop which contains "/cpte"
  renderTable = () => {
    const table = [];
    const tableMode = "/ee";
    const courseTag = this.props.studentMajor;
    console.log("StudentTable.js: majorPrefix=" + this.props.studentMajor);
    const currentUrl = "/ee";

    for (const round of this.props.rounds) {
      if (round[courseTag]) {
        table.push(
          <tr key={round._id}>
            <td>{round.courseId}</td>
            <td>{round.courseName}</td>
            <td>{round.description}</td>
            <td>{round.prerequisites}</td>
            <td>
              <button>
                <span className="fa fa-plus" />
              </button>
            </td>
            <td>
              <button>
                <span className="fa fa-star" />
              </button>
            </td>
          </tr>
        );
      }
    }
    return table;
  };

  render() {
    return (
      <div id="HomePage" className="padded-page">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Course ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Prerequisites</th>
              <th>Add to Schedule</th>
              <th>Favorite</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(this.props.rounds).length === 0 ? (
              <tr>
                <td colSpan="5" style={{ fontStyle: "italic" }}>
                  No courses logged
                </td>
              </tr>
            ) : (
              this.renderTable()
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(StudentHomePage);
