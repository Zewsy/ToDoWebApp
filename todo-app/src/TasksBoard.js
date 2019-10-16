import React from 'react';
import TaskContainer from './taskcontainer';
import { withRouter } from 'react-router';
import './taskBoard.css';

function TasksBoard(props){
        return(
            <div>
                <ProjectOptionsBar history={props.history} />
                <ProjectTasksTable name={props.location.state.name}/>
            </div>
        );
}

class ProjectOptionsBar extends React.Component{
    constructor(props){
        super(props);

        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleChooseClick = this.handleChooseClick.bind(this);
    }
    
    handleAddClick(){
        this.props.history.push('/create-project');
    }

    handleChooseClick(){
        this.props.history.push('/');
    }

    render(){
        return(
            <div>
                <h2>Projekt Tábla
                    <button className="projectTitleFirstButton" onClick={this.handleAddClick}>Projekt hozzáadása</button>
                    <button onClick={this.handleChooseClick}>Projekt kiválasztása</button>
                </h2>
            </div>
        );
    }
}

function ProjectTasksTable(props){
        return(
            <div>
                <h3>{props.name}</h3>
                <TaskContainer />
            </div>
        );
}

export default withRouter(TasksBoard);