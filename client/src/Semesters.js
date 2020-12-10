
import Mode from "./Mode";

const Semesters = {
    FALL_SEMESTER: new Mode({path: "/fall", prettyName: "Fall Semester"}),
    WINTER_SESSION: new Mode({path: "/winter", prettyName: "Winter Session"}),
    SPRNG_SEMESTER: new Mode({path: "/spring", prettyName: "spring Semester"})
};

Object.freeze(Semesters);

export default Semesters;
