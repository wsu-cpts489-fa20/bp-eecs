import Mode from "./Mode";

/*
 * An enumeration of the majors which this website supports.
 */

const Majors = {
    COMPUTER_SCIENCE: new Mode({path: "/cpts", prettyName: "Computer Science", id:"cpts"}),
    COMPUTER_ENGINEERING: new Mode({path: "/cpte", prettyName: "Computer Engineering",id:"cpte"}),
    ELECTRICAL_ENGINEERING: new Mode({path: "/ee", prettyName: "Electrical Engineering",id:"ee"}),
    SOFTWARE_ENGINEERING: new Mode({path: "/se", prettyName: "Software Engineering",id:"se"})
};

Object.freeze(Majors);

export default Majors;