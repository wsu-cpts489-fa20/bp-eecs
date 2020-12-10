import React from 'react';
import ConfirmDeleteRound from './ConfirmDeleteRound.js';
import {Link, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";

class RoundsTable extends React.Component {
  //passed tableMode in which holds the table mode
  constructor(props) {
    super(props);
    this.state = {showConfirmDelete: false};
  }

  //deleteRound -- Triggered when the user clicks on the "Yes, Delete"
  //button in the Confirm Delete dialog box. It executes the deletion and
  //closes the dialog box.
  deleteRound = () => {
    this.props.deleteRound();
    this.closeDeleteRoundsModal();
  }

  closeDeleteRoundsModal = () => {
    this.props.history.goBack();
  }

  //renderTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  //render each table based on tableMode prop which contains "/cpte"
  renderTable = () => {
    const table = [];
    const tableMode = this.props.tableMode;
    const courseTag = tableMode.slice(1);
    const currentUrl = this.props.history.location.pathname;
    for (const round of this.props.rounds) {
      if (round[courseTag]) {
        table.push(
          <tr key={round._id}>
            <td>{round.courseId}</td>
            <td>{round.courseName}</td>
            <td>{round.description}</td>
            <td>{round.prerequisites}</td>
            <td>
              <Link to={`${currentUrl}/edit/${round._id}`}>
                <span className="fa fa-eye"/>
              </Link>
            </td>
            <td>
              <Link to={`${currentUrl}/delete/${round._id}`}>
                <span className="fa fa-trash"/>
              </Link>
            </td>
          </tr>
        );
      }
    }
    return table;
  }

  //render--render the entire rounds table with header, displaying a "No
  //Courses Logged" message in case the table is empty.
  render() {
    return(
    <div className="padded-page">
      <h1></h1>
      <table className="table table-hover">
        <thead className="thead-light">
        <tr>
          <th>Course ID</th>
          <th>Course Name</th>
          <th>Description</th>
          <th>Prerequisites</th>
          <th>View/Edit...</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.rounds).length === 0 ?
          <tr>
          <td colSpan="5" style={{fontStyle: "italic"}}>No courses logged</td>
          </tr> : this.renderTable()
          }
        </tbody>
      </table>
      <Switch>
        <Route path="/rounds/delete">
          <ConfirmDeleteRound
                close={this.closeDeleteRoundsModal}
                deleteRound={this.deleteRound} />
        </Route>
      </Switch>

    </div>
    );
  }
}

export default withRouter(RoundsTable);
