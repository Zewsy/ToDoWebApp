import React from 'react';
import TaskContainer from './taskContainer';
import { withRouter } from 'react-router';
import ProjectBar from './projectBar';

function TasksBoard(props){ 
    return(
        <div>
            <ProjectBar name={props.location.state.name} history={props.history} />
            <TaskContainer />
        </div>
    );
}

export default withRouter(TasksBoard);