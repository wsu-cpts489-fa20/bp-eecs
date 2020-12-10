//Rounds -- A parent component for the app's "rounds" mode.
//Manages the rounds data for the current user and conditionally renders the
//appropriate rounds mode page based on App's mode, which is passed in as a prop.

import React from 'react';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js';
import {Link, Route, Switch, withRouter} from "react-router-dom";
import ConfirmDeleteRound from "./ConfirmDeleteRound";

class Rounds extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
        super(props);

        this.state = {
            errorMsg: "",
            roundFormRedirect: null
        };
    }

    //addRound -- Given an object newData containing a new round, use the 
    //server POST route to add the new round to the database. If the add is
    //successful, call on the refreshOnUpdate() method to force the parent
    //App component to refresh its state from the database and re-render itself,
    //allowing the change to be propagated to the Rounds table.
    addRound = async (newData) => {
        const url = `/api/rounds/${this.props.userObj.id}`;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newData)
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

    //editRound -- Given an object newData containing updated data on an
    //existing round, update the current user's round in the database.
    editRound = async (newData, editId) => {
        const url = `/api/rounds/${this.props.userObj.id}/${editId}`;
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
        } else {
            await this.props.refreshOnUpdate();
        }
        this.props.history.goBack()
    }


    //deleteRound -- Delete the current user's round uniquely identified by
    //this.state.deleteId, delete from the database, and reset deleteId to empty.
    deleteRound = async (deleteId) => {
        const url = `/api/rounds/${this.props.userObj.id}/${deleteId}`;
        const res = await fetch(url, {method: 'DELETE', headers: {Accept: 'application/json'}});
        const msg = await res.text();
        if (res.status !== 200) {
            this.setState({
                errorMsg: `An error occurred when attempting to delete round from database: ${msg}`
            });
        } else {
            await this.props.refreshOnUpdate();
        }
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
            <Switch>
                <Route path={`${this.props.match.path}/add`}>
                    <RoundForm
                        saveRound={this.addRound}/>
                </Route>
                <Route path={`${this.props.match.path}/edit/:id`}
                       render={(routeProps) =>
                           <RoundForm
                               rounds={this.props.userObj.rounds}
                               saveRound={(roundData) => this.editRound(roundData, routeProps.match.params.id)}/>
                       }/>
                <Route path={`${this.props.match.path}`}>
                    <Switch>
                        <Route path={`${this.props.match.path}/delete/:id`}
                               render={(routeProps) =>
                                   <ConfirmDeleteRound
                                       close={this.closeConfirmDeleteRoundModal}
                                       deleteRound={() => this.deleteRound(routeProps.match.params.id)}
                                   />}
                        />
                    </Switch>
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
                        deleteRound={this.deleteRound}
                        menuOpen={this.props.menuOpen}
                        tableMode={this.props.match.path}/>
                    <Link to={`${this.props.match.url}/add`}>
                        <FloatingButton
                            menuOpen={this.props.menuOpen}
                            icon={"fa fa-plus"}/>
                    </Link>
                </Route>
            </Switch>
        );
    }
}

export default withRouter(Rounds);
