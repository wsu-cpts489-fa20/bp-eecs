import React from 'react';
import ConfirmDeleteRound from './ConfirmDeleteRound.js';
import {Link, Switch, Route, useHistory} from "react-router-dom";

class RoundsTable extends React.Component {

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
    const history = useHistory();
    history.push("/rounds");
  }

  //renderTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  renderTable = () => {
  let table = [];
  for (let r = 0; r < this.props.rounds.length; ++r) {
    table.push(
      <tr key={r}>
        <td>{this.props.rounds[r].courseId}</td>
        <td>{this.props.rounds[r].courseName}</td>
        <td>{this.props.rounds[r].description}</td>
        <td>{this.props.rounds[r].prerequisites}</td>
        <td>
          <Link to={`/rounds/edit/${r}`}>
              <span className="fa fa-eye"/>
          </Link>
        </td>
        <td>
          <Link to={`/rounds/delete/${r}`}>
              <span className="fa fa-trash"/>
          </Link>
        </td>
      </tr>
    );
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

export default RoundsTable;
