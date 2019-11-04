import React from 'react';
import TaskContainer from './taskContainer';
import { withRouter } from 'react-router';
import './taskBoard.css';

import Button from '@material-ui/core/Button';

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
                <h1>Projekt Tábla
                    <Button variant='contained' color='primary' size='small' className="projectTitleButton" onClick={this.handleAddClick}>Projekt hozzáadása</Button>
                    <Button variant='contained' color='primary' size='small' className="projectTitleButton" onClick={this.handleChooseClick}>Projekt kiválasztása</Button>
                </h1>
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