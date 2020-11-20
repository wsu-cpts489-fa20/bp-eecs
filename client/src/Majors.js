import Mode from "./Mode";

/*
 * An enumeration of the majors which this website supports.
 */

const Majors = {
    COMPUTER_SCIENCE: new Mode({path: "/cpts", prettyName: "Computer Science"}),
    COMPUTER_ENGINEERING: new Mode({path: "/cpte", prettyName: "Computer Engineering"}),
    ELECTRICAL_ENGINEERING: new Mode({path: "/ee", prettyName: "Electrical Engineering"}),
    SOFTWARE_ENGINEERING: new Mode({path: "/se", prettyName: "Software Engineering"})
};

Object.freeze(Majors);

export default Majors;