import React from 'react';
import ConfirmDeleteRound from './ConfirmDeleteRound.js';
import AppMode from '../AppMode.js';
import {Link} from "react-router-dom";

class RoundsTable extends React.Component {

  constructor() {
    super();
    this.state = {showConfirmDelete: false};
  }

  //editRound -- Triggered when the user clicks the edit button for a given
  //round. The id param is the unique property that identifies the round.
  //Set the state variable representing the id of the round to be edited and
  //then switch to the ROUNDS_EDITROUND mode to allow the user to edit the
  //chosen round.
  editRound = (id) => {
    this.props.setEditId(id);
    this.props.changeMode(AppMode.ROUNDS_EDITROUND);
  }

  //deleteRound -- Triggered when the user clicks on the "Yes, Delete"
  //button in the Confirm Delete dialog box. It executes the deletion and
  //closes the dialog box.
  deleteRound = () => {
    this.props.deleteRound();
    this.setState({showConfirmDelete: false});
  }


  //confirmDelete -- Triggered when the user clicks the delete button
  //for a given round. The id paam is the unique property that 
  //identifies the round. Set the state variable representing the id
  //of the round to be deleted and then present a dialog box asking
  //the user to confirm the deletion.
  confirmDelete = (id) => {
    this.props.setDeleteId(id);
    this.setState({showConfirmDelete: true});
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
        <td><Link to={`/rounds/edit/${r}`}>
              <span className="fa fa-eye"></span></Link></td>
        <td><button onClick={this.props.menuOpen ? null : 
          () => this.confirmDelete(r)}>
              <span className="fa fa-trash"></span></button></td>
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
      {this.state.showConfirmDelete ?
        <ConfirmDeleteRound 
          close={() => this.setState({showConfirmDelete: false})} 
          deleteRound={this.deleteRound} /> : null}
    </div>
    );
  }
}

export default RoundsTable;
