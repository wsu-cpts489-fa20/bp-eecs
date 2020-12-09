import React from 'react';
import {withRouter} from 'react-router-dom';

class RoundForm extends React.Component {
    constructor(props) {
        super(props);
        //Create date object for today, taking time zone into consideration
        let today = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000);
        //store date as ISO string
        //If logging a new round, the starting state is a default round with
        //today's date.
        this.state = {
            date: today.toISOString().substr(0, 10),
            courseId: "",
            courseName: "",
            type: "practice",
            description: "",
            prerequisites: "",
            cpts: false,
            cpte: false,
            ee: false,
            se: false,
            faIcon: "fa fa-save",
            btnLabel: "Save Round Data"
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            const round = this.props.rounds[id];
            this.setState({
                ...round,
                faIcon: "fa fa-edit",
                btnLabel: "Update Round Data"
            });
        }
    }


    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }


    //handleSubmit -- When the user clicks on the button to save/update the
    //round, start the spinner and invoke the parent component's saveRound
    //method to do the actual work. Note that saveRound is set to the correct
    //parent method based on whether the user is logging a new round or editing
    //an existing round.
    handleSubmit = (event) => {
        //start spinner
        this.setState({
            faIcon: "fa fa-spin fa-spinner",
            btnLabel: (this.props.match.path.endsWith("add") ?
                "Saving..." : "Updating...")
        });
        //Prepare current round data to be saved
        let roundData = this.state;
        delete roundData.faIcon;
        delete roundData.btnLabel;
        //call saveRound on 1 second delay to show spinning icon
        setTimeout(this.props.saveRound, 1000, roundData);

        event.preventDefault();
    }

    handleCheckbox = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        this.setState({
            [name]: value
        })
    }


    computeSGS = (strokes, min, sec) => {
        return `${Number(strokes) + Number(min)}:${sec}`;
    }

    render() {
        return (
            <form className="padded-page" onSubmit={this.handleSubmit}>
                <center>
                    Majors:
                    <p></p>
                    <label>
                        Computer Science
                        <input name="cpts" className="form-control checkbox-size" type="checkbox"
                            value={this.state.cpts} onChange={this.handleCheckbox}/>
                    </label>
                    &nbsp;&nbsp;
                    <label>
                        Computer Engineering
                        <input name="cpte" className="form-control checkbox-size" type="checkbox"
                            value={this.state.cpte} onChange={this.handleCheckbox}/>
                    </label>
                    &nbsp;&nbsp;
                    <label>
                        Electrical Engineering
                        <input name="ee" className="form-control checkbox-size" type="checkbox"
                            value={this.state.ee} onChange={this.handleCheckbox}/>
                    </label>
                    &nbsp;&nbsp;
                    <label>     
                        Software Engineering
                        <input name="se" className="form-control checkbox-size" type="checkbox"
                            value={this.state.se} onChange={this.handleCheckbox}/>
                    </label>
                    <p></p>
                    <label>
                        Course Id:
                        <input name="courseId" className="form-control form-center" type="text"
                               value={this.state.courseId} onChange={this.handleChange}
                               placeholder="cpts 489" size="50" maxLength="50"/>
                    </label>
                    <p></p>
                    <label>
                        Course Name:
                        <input name="courseName" className="form-control form-center" type="text"
                               value={this.state.courseName} onChange={this.handleChange}
                               placeholder="Web development" size="50" maxLength="50"/>
                    </label>
                    <p></p>
                    <label>Description of Course:
                        <textarea name="description" className="form-control" rows="6" cols="75"
                                  placeholder="Introduction to MERN Stack development" value={this.state.description}
                                  onChange={this.handleChange}/>
                    </label>
                    <p></p>
                    <label>Prerequisites:
                        <textarea name="prerequisites" className="form-control" rows="6" cols="75"
                                  placeholder="350, 360, 311" value={this.state.prerequisites}
                                  onChange={this.handleChange}/>
                    </label>
                    <p></p>
                    <p></p>
                    <button type="submit" style={{width: "70%", fontSize: "36px"}}
                            className="btn btn-primary btn-color-theme">
                        <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
                    </button>
                </center>
            </form>
        );
    }
}

export default withRouter(RoundForm);