//Rounds -- A parent component for the app's "rounds" mode.
//Manages the rounds data for the current user and conditionally renders the
//appropriate rounds mode page based on App's mode, which is passed in as a prop.

import React from 'react';
import AppMode from '../AppMode.js';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js';
import {Link, Route, Switch} from "react-router-dom";

class Rounds extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);
        this.deleteId = "";
        this.editId = "";
        this.state = {
            errorMsg: "",
            roundFormRedirect: null
        };
    }

    //addRound -- Given an object newData containing a new round, use the 
    //server POST route to add the new round to the database. If the add is
    //successful, call on the refreshOnUpdate() method to force the parent
    //App component to refresh its state from the database and re-render itself,
    //allowing the change to be propagated to the Rounds table. Then switch
    //the mode back to AppMode.ROUNDS since the user is done adding a round.
    addRound = async (newData) => {
        const url = '/rounds/' + this.props.userObj.id;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newData)
        });
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({errorMsg: msg});
            this.props.changeMode(AppMode.ROUNDS);
        } else {
            this.setState({errorMsg: ""});
            this.props.refreshOnUpdate(AppMode.ROUNDS);
        }
    }

    //editRound -- Given an object newData containing updated data on an
    //existing round, update the current user's round in the database. 
    //toggle the mode back to AppMode.ROUNDS since the user is done editing the
    //round. 
    editRound = async (newData) => {
        const url = `/rounds/${this.props.userObj.id}/${this.props.userObj.rounds[this.editId]._id}`;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(newData)
        });
        const msg = await res.text();
        if (res.status !== 200) {
            this.setState({errorMsg: msg});
            this.props.changeMode(AppMode.ROUNDS);
        } else {
            this.props.refreshOnUpdate(AppMode.ROUNDS);
        }
    }


    //deleteRound -- Delete the current user's round uniquely identified by
    //this.state.deleteId, delete from the database, and reset deleteId to empty.
    deleteRound = async () => {
        const url = '/rounds/' + this.props.userObj.id + '/' +
            this.props.userObj.rounds[this.deleteId]._id;
        const res = await fetch(url, {method: 'DELETE'});
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({
                errorMsg: "An error occurred when attempting to delete round from database: "
                    + msg
            });
            this.props.changeMode(AppMode.ROUNDS);
        } else {
            this.props.refreshOnUpdate(AppMode.ROUNDS);
        }
    }

    //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    //the user is considering deleting.
    setDeleteId = (val) => {
        this.deleteId = val;
        this.setState({errorMsg: ""});
    }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val) => {
        this.editId = val;
        this.setState({errorMsg: ""});
    }

    closeErrorMsg = () => {
        this.setState({errorMsg: ""});
    }

    //render -- Conditionally render the Rounds mode page as either the rounds
    //table, the rounds form set to obtain a new round, or the rounds form set
    //to edit an existing round.
    render() {
        return (
            <Switch>
                <Route path="/rounds/add">
                    <RoundForm
                        saveRound={this.addRound}/>
                </Route>
                <Route path="/rounds/edit/:id">
                    <RoundForm
                        rounds={this.props.userObj.rounds}
                        saveRound={this.editRound}/>
                </Route>
                <Route path="/rounds">
                    {this.state.errorMsg !== ""
                        ? <div className="status-msg">
                            <span>{this.state.errorMsg}</span>
                            <button className="modal-close" onClick={this.closeErrorMsg}>
                                <span className="fa fa-times"/>
                            </button>
                        </div>
                        : null}
                    <RoundsTable
                        rounds={this.props.userObj.rounds}
                        setEditId={this.setEditId}
                        setDeleteId={this.setDeleteId}
                        deleteRound={this.deleteRound}
                        menuOpen={this.props.menuOpen}/>
                    <Link to="/rounds/add">
                        <FloatingButton
                            menuOpen={this.props.menuOpen}
                            icon={"fa fa-plus"}/>
                    </Link>
                </Route>
            </Switch>
        );
    }
}

export default Rounds;
