import React from "react";
import {Route, Switch} from "react-router-dom";
import Majors from "../Majors";
import Rounds from "./Rounds";
import Semesters from "../Semesters"
import ModeBar from './ModeBar.js';
class AdminView extends React.Component {
    render() {
        return (
            <div>
             <ModeBar
                menuOpen={this.props.menuOpen}
                modes={Object.values(Majors)}
             />
             <Switch>
                {Object.values(Majors).map((major) =>
                    <Route path={major.path}>
                        <Rounds
                            userObj={this.props.userObj}
                            refreshOnUpdate={this.props.refreshOnUpdate}
                            menuOpen={this.props.menuOpen}
                        />
                    </Route>
                 )}
             </Switch>
            </div>
        )
    }
}

export default AdminView;