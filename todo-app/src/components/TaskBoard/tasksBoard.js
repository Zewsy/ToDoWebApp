import React from 'react';
import TaskContainer from './taskContainer';
import { withRouter } from 'react-router';
import ProjectOptionsBar from './projectOptionsBar';

function TasksBoard(props){
        return(
            <div>
                <ProjectOptionsBar history={props.history} />
                <ProjectTasksTable name={props.location.state.name}/>
            </div>
        );
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