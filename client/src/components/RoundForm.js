import React from 'react';
import AppMode from './../AppMode.js';

class RoundForm extends React.Component {
  constructor(props) {
  super(props);
  //Create date object for today, taking time zone into consideration
  let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
  //store date as ISO string
  if (this.props.mode === AppMode.ROUNDS_LOGROUND) {
    //If logging a new round, the starting state is a default round with
    //today's date.
    this.state = {date:  today.toISOString().substr(0,10), 
                  courseId: "",
                  courseName: "",
                  type: "practice",
                  description: "",
                  prerequisites: "",
                  holes: "18",
                  strokes: 80,
                  minutes: 50,
                  seconds: "00",
                  notes: "",
                  faIcon: "fa fa-save",
                  btnLabel: "Save Round Data"}
  } else {
    //if editing an existing round, the starting state is the round's
    //current data
    let thisRound = {...this.props.startData};
    delete thisRound.id;
    thisRound.faIcon = "fa fa-edit";
    thisRound.btnLabel = "Update Round Data";
    this.state = thisRound;
  }
}
  
  
    handleChange = (event) => {
        const name = event.target.name;
        if (name === "seconds") {
          let newSec = (event.target.value.length < 2 ? "0" + 
            event.target.value : event.target.value);
          let newSGS = this.computeSGS(this.state.strokes, this.state.minutes, 
                                       newSec);
          this.setState({seconds: newSec, SGS: newSGS});
        } else if (name === "strokes") {
          let newStrokes = event.target.value;
          let newSGS = this.computeSGS(newStrokes, this.state.minutes, 
            this.state.seconds);
          this.setState({strokes: newStrokes, SGS: newSGS});
        } else if (name === "minutes") {
            let newMin = event.target.value;
            let newSGS = this.computeSGS(this.state.strokes, newMin, 
              this.state.seconds);
            this.setState({minutes: newMin, SGS: newSGS});
        } else {
          this.setState({[name]: event.target.value});
        }
    }
  
  
    //handleSubmit -- When the user clicks on the button to save/update the
    //round, start the spinner and invoke the parent component's saveRound
    //method to do the actual work. Note that saveRound is set to the correct
    //parent method based on whether the user is logging a new round or editing
    //an existing round.
    handleSubmit = (event) => {
        //start spinner
        this.setState({faIcon: "fa fa-spin fa-spinner",
                        btnLabel: (this.props.mode === AppMode.ROUNDS_LOGROUND ? 
                                    "Saving..." : "Updating...")});
        //Prepare current round data to be saved
        let roundData = this.state;
        delete roundData.faIcon;
        delete roundData.btnLabel;
        //call saveRound on 1 second delay to show spinning icon
        setTimeout(this.props.saveRound,1000,roundData); 
        event.preventDefault(); 
        }
  

    computeSGS = (strokes, min, sec) => {
      return (Number(strokes) + Number(min)) 
                  + ":" + sec;
    }
  
    render() {
      return (
        <form className="padded-page" onSubmit={this.handleSubmit}>
          <center>
          
            <label>
              Course Id:
              <input name="courseId" className="form-control form-center" type="text"
                value={this.state.courseId} onChange={this.handleChange}
                placeholder="cpts 489" size="50" maxLength="50" />
            </label>
          <p></p>
          <label>
              Course Name:
              <input name="courseName" className="form-control form-center" type="text"
                value={this.state.courseName} onChange={this.handleChange}
                placeholder="Web development" size="50" maxLength="50" />
            </label>
          <p></p>
          <label>Description of Course:
              <textarea name="description" className="form-control" rows="6" cols="75" 
                placeholder="Introduction to MERN Stack development" value={this.state.description} 
                onChange={this.handleChange} />
          </label>
          <p></p>
          <label>Prerequisites:
              <textarea name="prerequisites" className="form-control" rows="6" cols="75" 
                placeholder="350, 360, 311" value={this.state.prerequisites} 
                onChange={this.handleChange} />
          </label>
          <p></p>
          <p></p>
          <button type="submit" style={{width: "70%",fontSize: "36px"}} 
            className="btn btn-primary btn-color-theme">
              <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
          </button>
          </center>
        </form>
      );
    }
}

export default RoundForm;