import React from "react";
import RoundsTable from "./RoundsTable.js";
import RoundForm from "./RoundForm.js";
import FloatingButton from "./FloatingButton.js";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import ConfirmDeleteRound from "./ConfirmDeleteRound";
import StudentTable from "./StudentTable.js";
import fullGraph from "../images/full_graph.png";
import exGraph from "../images/example_graph.png";

// Student home (landing) page where users will be taken after login
class StudentHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      roundFormRedirect: null,
      major: "Computer Science",
      majorPrefix: "cpts",
      term: "Spring 2021",
    };
  }

  // handles changes to the student major drop down selection
  handleChange = async (event) => {
    this.setState({ major: event.target.value });
    if (event.target.value == "Computer Science") {
      this.setState({ majorPrefix: "cpts" });
    } else if (event.target.value == "Electrical Engineering") {
      this.setState({ majorPrefix: "ee" });
    } else if (event.target.value == "Computer Engineering") {
      this.setState({ majorPrefix: "cpte" });
    } else if (event.target.value == "Software Engineering") {
      this.setState({ majorPrefix: "se" });
    }
    console.log("value: " + event.target.value);
    console.log("major" + this.state.major);
    console.log("majorPrefix" + this.state.majorPrefix);
    this.props.history.goBack();
  };

  // close the error message when there is a navigation error
  closeErrorMsg = () => {
    this.setState({ errorMsg: "" });
  };

  //render -- Conditionally render the Student Home Page when different majors are selected
  render() {
    return (
      <div className="studentHeader">
        <p></p>

        {/* dropwdown menu of majors */}
        <div className="studentDropdown">
          <label style={{ textAlign: "left" }}>
            Select your major:
            <select
              name="major"
              value={this.state.major}
              className="form-control form-center"
              onChange={this.handleChange}>
              <option value="Computer Science">Computer Science</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
          </label>
        </div>

        {/* title of home page */}
        <div className="studentTitle">
          <h1>
            {this.state.major} Courses - {this.state.term}{" "}
          </h1>
        </div>
        <Switch>
          <Route path={`${this.props.match.path}`}>
            {this.state.errorMsg !== "" ? (
              <div className="status-msg">
                <span>{this.state.errorMsg}</span>
                <button className="modal-close" onClick={this.closeErrorMsg}>
                  <span className="fa fa-times" />
                </button>
              </div>
            ) : null}

            {/* table of courses for a given major */}
            <StudentTable
              rounds={this.props.userObj.rounds}
              deleteRound={this.deleteRound}
              menuOpen={this.props.menuOpen}
              tableMode={this.props.match.path}
              studentMajor={this.state.majorPrefix}
            />

            {/* layout of dependency graphs */}
            <div className="graphContainer">
              <div className="graph">
                <img className="graph1" src={fullGraph} />
                <h1 className="fullTitle">Full dependency graph layout</h1>
              </div>
              <div className="graph">
                <img className="graph2" src={exGraph} />
                <h1 className="exTitle">
                  Example dependency graph with scheduled courses
                </h1>
              </div>
            </div>
            <p></p>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(StudentHomePage);