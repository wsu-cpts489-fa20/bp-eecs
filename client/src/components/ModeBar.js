import React from 'react';
import {NavLink, Switch, Route} from "react-router-dom";


class ModeBar extends React.Component {

    makeModeButton = (mode) => {
        return (
            <NavLink to={mode.path} activeClassName="item-selected">
                <span className="modebar-text">
                    {mode.prettyName}
                </span>
            </NavLink>
        )
    }

    render() {
        const modes = this.props.modes;
        const buttons = modes.map(this.makeModeButton);

        return (
            <Switch>
                <Route path="/login" />
                <Route path="/">
                    <div className={"modebar" + (this.props.menuOpen ? " ignore-click" : "")}>
                        {this.props.admin ? buttons : null}                    
                    </div>
                </Route>
            </Switch>
        );
    }
}

export default ModeBar;
