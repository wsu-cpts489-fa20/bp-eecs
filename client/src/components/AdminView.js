import React from "react";
import {Route, Switch} from "react-router-dom";
import Majors from "../Majors";
import Rounds from "./Rounds";

class AdminView extends React.Component {
    render() {
        return (
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
                <Route> 
                    <center>
                        <div>
                        Welcome to the admin page. Click a mode below to view the classes you have on file and 
                        from there you can also add classes! 
                        </div>
                    </center>
                </Route>

            </Switch>
        )
    }
}

export default AdminView;