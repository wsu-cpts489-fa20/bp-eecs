import React from 'react';
import {Switch, Route} from "react-router-dom";

class SideMenu extends React.Component {
    render() {
        return (
            <div className={`sidemenu ${this.props.menuOpen ? "sidemenu-open" : "sidemenu-closed"}`}
                 onClick={this.props.toggleMenuOpen}>
                <div className="sidemenu-title">
                    <img src={this.props.profilePicURL} height='60' width='60'/>
                    <span id="userID" className="sidemenu-userID">&nbsp;{this.props.displayName}</span>
                </div>

                <Switch>
                    <Route path="/feed">
                        <div>
                            <a className="sidemenu-item">
                                <span className="fa fa-users"/>
                                &nbsp;Followed Users
                            </a>
                            <a className="sidemenu-item ">
                                <span className="fa fa-search"/>
                                &nbsp;Search Feed
                            </a>
                        </div>
                    </Route>
                    <Route path="/rounds">
                        <div>
                            <a className="sidemenu-item">
                                <span className="fa fa-plus"/>
                                &nbsp;Log New Round
                            </a>
                            <a className="sidemenu-item">
                                <span className="fa fa-search"/>
                                &nbsp;Search Rounds
                            </a>
                        </div>
                    </Route>
                    <Route path="/courses">
                        <div>
                            <a className="sidemenu-item">
                                <span className="fa fa-plus"/>
                                &nbsp;Add a Course
                            </a>
                            <a className="sidemenu-item">
                                <span className="fa fa-search"/>
                                &nbsp;Search Courses
                            </a>
                        </div>
                    </Route>
                </Switch>
                {this.props.localAccount
                    ? <a id="accountBtn" className="sidemenu-item" onClick={this.props.editAccount}>
                        <span className="fa fa-user"/>&nbsp;Account
                    </a>
                    : null}
                <a id="aboutBtn" className="sidemenu-item" onClick={this.props.showAbout}>
                    <span className="fa fa-info-circle"/>&nbsp;About</a>
                <a id="logOutBtn" className="sidemenu-item" onClick={this.props.logOut}>
                    <span className="fa fa-sign-out-alt"/>&nbsp;Log Out</a>
            </div>
        );
    }
}

export default SideMenu;
