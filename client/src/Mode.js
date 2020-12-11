class Mode {
    constructor(props) {
        this.path = props.path; // The url path for the mode
        this.prettyName = props.prettyName; // A pretty-formatted name suitable for showing to a user
        this.id = props.id; //an id to click for testcafe
    }
}

export default Mode;
