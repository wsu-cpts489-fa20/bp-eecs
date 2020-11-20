import React from 'react';
import {Link, Switch, Route} from "react-router-dom";

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <span className="navbar-items">
                    <Switch>

                        <Route path={["/rounds/add", "/rounds/edit"]}>
                            <Link to="/rounds" className="sidemenu-btn">
                                <span id="menuBtnIcon" className={"sidemenu-btn-icon fa fa-arrow-left"}/>
                            </Link>
                        </Route>
                        <Route path="/login"/>
                        <Route path="/">
                            <button className="sidemenu-btn" onClick={() => this.props.toggleMenuOpen()}>
                                <span
                                    id="menuBtnIcon"
                                    className={`sidemenu-btn-icon fa ${this.props.menuOpen ? "fa-times" : "fa-bars"}`}
                                />
                            </button>
                        </Route>

                    </Switch>
                    <img src={require('../images/EECS-logo.png')} alt="WSU Logo" height="50%" width="50%"/>
                    <span className="navbar-title">
                        <Switch>

                            <Route path="/login">
                                EECS Course Scheduler
                            </Route>
                            <Route path="/feed">
                                Activity Feed
                            </Route>
                            <Route path="/rounds/add">
                                Log New Round
                            </Route>
                            <Route path="/rounds/edit">
                                Edit Round
                            </Route>
                            <Route exact path="/rounds">
                                My Rounds
                            </Route>
                            <Route path="/courses">
                                Courses
                            </Route>

                        </Switch>
                    </span>
                </span>
            </div>
        );
    }
}

export default NavBar;
