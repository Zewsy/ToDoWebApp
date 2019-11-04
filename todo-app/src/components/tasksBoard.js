import React from 'react';
import TaskContainer from './taskContainer';
import { withRouter } from 'react-router';
import {projectButtonTheme} from './taskBoardTheme';

import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';

function TasksBoard(props){
        return(
            <div>
                <ProjectOptionsBar history={props.history} />
                <ProjectTasksTable name={props.location.state.name}/>
            </div>
        );
}

function ProjectOptionsBar(props){
    return(
        <div>
            <h1>Projekt Feladatok
                <ThemeProvider theme={projectButtonTheme}>
                        <Button href='/create-project'>Projekt hozzáadása</Button>
                        <Button href='/'>Projekt kiválasztása</Button>
                </ThemeProvider>
            </h1>
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