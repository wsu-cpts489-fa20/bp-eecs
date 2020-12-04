import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeBar from './ModeBar.js';
import CreateEditAccountDialog from './CreateEditAccountDialog.js'
import LoginPage from './LoginPage.js';
import Rounds from './Rounds.js';
import AboutBox from './AboutBox.js';
import {Redirect, Route, Switch} from "react-router-dom";
import Majors from "../Majors";
import AdminView from "./AdminView";
import StudentView from "./StudentView";


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            menuOpen: false,
            authenticated: false,
            userObj: {displayName: "", profilePicURL: ""},
            editAccount: false,
            showEditAccountDialog: false,
            statusMsg: "",
            showAboutDialog: false
        };
    }

    //componentDidMount
    componentDidMount() {
        if (!this.state.authenticated) {
            this.testAuth()
        }
    }

    testAuth = () => {
        //Use /auth/test route to (re)-test authentication and obtain user data
        fetch("/api/auth/test", {headers: {Accept: 'application/json'}})
            .then((response) => response.json())
            .then((obj) => {
                    if (obj.isAuthenticated) {
                        this.setState({
                            userObj: obj.user,
                            authenticated: true
                        });
                    }
                }
            )
    }

    //refreshOnUpdate(newMode) -- Called by child components when user data changes in
    //the database. The function calls the users/:userid (GET) route to update
    //the userObj state var based on the latest database changes, and sets the
    //mode state var is set to newMode. After this method is called, the
    //App will re-render itself, forcing the new data to
    //propagate to the child components when they are re-rendered.
    refreshOnUpdate = async () => {
        let response = await fetch(`/api/users/${this.state.userObj.id}`, {headers: {Accept: 'application/json'}});
        response = await response.json();
        const obj = JSON.parse(response);
        this.setState({
            userObj: obj
        });
    }

    openMenu = () => {
        this.setState({menuOpen: true});
    }

    closeMenu = () => {
        this.setState({menuOpen: false});
    }

    toggleMenuOpen = () => {
        this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
    }

    showEditAccount = () => {
        this.setState({showEditAccountDialog: true});

    }

    cancelEditAccount = () => {
        this.setState({showEditAccountDialog: false});
    }

    //editAccountDone -- called after successful edit or
    //deletion of user account. msg contains the status
    //message and deleted indicates whether an account was
    //edited (deleted == false) or deleted (deleted == true)
    editAccountDone = (msg, deleted) => {
        if (deleted) {
            this.setState({
                showEditAccountDialog: false,
                statusMsg: msg
            });
        } else {
            this.setState({
                showEditAccountDialog: false,
                statusMsg: msg
            });
        }
    }

    closeStatusMsg = () => {
        this.setState({statusMsg: ""});
    }

    logOut = () => {
        this.setState({
            userObj: {},
            authenticated: false
        })
    }

    render() {
        return (
            <div className="padded-page">
                {this.state.showAboutDialog ?
                    <AboutBox close={() => this.setState({showAboutDialog: false})}/> : null}
                {this.state.statusMsg != "" ? <div className="status-msg">
                    <span>{this.state.statusMsg}</span>
                    <button className="modal-close" onClick={this.closeStatusMsg}>
                        <span className="fa fa-times"></span></button>
                </div> : null}
                {this.state.showEditAccountDialog ?
                    <CreateEditAccountDialog
                        create={false}
                        userId={this.state.userObj.id}
                        done={this.editAccountDone}
                        cancel={this.cancelEditAccount}/> : null}
                <NavBar
                    menuOpen={this.state.menuOpen}
                    toggleMenuOpen={this.toggleMenuOpen}/>
                <SideMenu
                    menuOpen={this.state.menuOpen}
                    toggleMenuOpen={this.toggleMenuOpen}
                    displayName={this.state.userObj.displayName}
                    profilePicURL={this.state.userObj.profilePicURL}
                    localAccount={this.state.userObj.authStrategy === "local"}
                    editAccount={this.showEditAccount}
                    logOut={() => this.logOut()}
                    showAbout={() => {
                        this.setState({showAboutDialog: true})
                    }}/>

                <Switch>
                    <Route path="/login">
                        {this.state.authenticated
                            ? <Redirect to="/" />
                            : <LoginPage testAuth={this.testAuth} />
                        }
                    </Route>
                    <Route>
                        {this.state.authenticated
                            ? <>
                                <ModeBar
                                    menuOpen={this.state.menuOpen}
                                    modes={Object.values(Majors)}
                                    admin={this.state.userObj.admin}
                                />
                                {this.state.userObj.admin
                                    ? <AdminView
                                        userObj={this.state.userObj}
                                        refreshOnUpdate={this.refreshOnUpdate}
                                        menuOpen={this.state.menuOpen}
                                    />
                                    : <StudentView  userObj={this.state.userObj}/>
                                }
                            </>
                            : <Redirect to="/login" />
                        }
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;