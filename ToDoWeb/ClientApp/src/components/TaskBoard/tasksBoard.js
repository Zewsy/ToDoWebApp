import React from 'react';
import TaskContainer from './taskContainer';
import { withRouter } from 'react-router';
import ProjectBar from './projectBar';
import {taskBoardTheme} from './taskBoardTheme';
import {ThemeProvider} from '@material-ui/styles';

function TasksBoard(props){ 
    return(
        <ThemeProvider theme={taskBoardTheme}>
            <div>
                <ProjectBar name={props.location.state.name} history={props.history} />
                <TaskContainer />
            </div>
        </ThemeProvider>
    );
}

export default withRouter(TasksBoard);