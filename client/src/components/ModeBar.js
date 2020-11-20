import React from 'react';
import NavLink from "react-router-dom/modules/NavLink";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";


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
                    <div className={"modebar visible" + (this.props.menuOpen ? " ignore-click" : "")}>
                        {buttons}
                    </div>
                </Route>
            </Switch>
        );
    }
}

export default ModeBar;
