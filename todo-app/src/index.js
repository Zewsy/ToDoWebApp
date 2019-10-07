import React from 'react';
import ReactDOM from 'react-dom';

class ProjectBoard extends React.Component{
    render(){
        return(
            <ProjectOptionsBar />
        );
    }
}

class ProjectOptionsBar extends React.Component{
    render(){
        return(
            <label>ProjectBoard</label>
        );
    }
}

ReactDOM.render(
    <ProjectBoard />,
    document.getElementById('root')
)