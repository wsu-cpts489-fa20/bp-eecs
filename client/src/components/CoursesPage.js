import React from 'react';

class CoursesPage extends React.Component {

    render() {
        return (
        <div className="padded-page">
            <center>
            <h1 >Courses</h1>
            <h2>This page is under construction.</h2>
            <img src={require('../images/WSU-logo.png')}
             height="200" width="200"/>
            <p style={{fontStyle: "italic"}}>Version CptS 489 React Demo</p>
            </center>
        </div>
        );
    }   
}

export default CoursesPage;