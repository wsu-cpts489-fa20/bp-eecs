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
    //const tableMode = this.props.tableMode;
    const tableMode = "/ee";

    //const courseTag = tableMode.slice(1);
    //const courseTag = "ee";
    const courseTag = this.props.studentMajor;
    console.log("StudentTable.js: majorPrefix="+this.props.studentMajor);


    //const currentUrl = this.props.history.location.pathname;
    const currentUrl = "/ee";

    for (const round of this.props.rounds) {
      if (round[courseTag]) {
        table.push(
          <tr key={round._id}>
            <td>{round.courseId}</td>
            <td>{round.courseName}</td>
            <td>{round.description}</td>
            <td>{round.prerequisites}</td>
            {/* <td>
              <Link to={`${currentUrl}/edit/${round._id}`}>
                <span className="fa fa-eye"/>
              </Link>
            </td>
            <td>
              <Link to={`${currentUrl}/delete/${round._id}`}>
                <span className="fa fa-trash"/>
              </Link>
            </td> */}
          </tr>
        );
      }
    }
    return table;
  };

  render() {
    return (
      <div id="HomePage" className="padded-page">
        {/* <center>
            <h1 >Welcome </h1>
            <h2> Student Home Page</h2>
            </center> */}

        {/* <p></p> */}
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Course ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Prerequisites</th>
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

        {/* <p></p>
            <h3 style={{textAlign:"left"}}>Class Dependeny Graph</h3>
            <p></p>
            <h4>Future Classes List</h4> */}
      </div>
    );
  }
}

export default withRouter(StudentHomePage);
