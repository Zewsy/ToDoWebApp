import React from 'react';
import TaskContainer from './taskcontainer';

class TasksBoard extends React.Component{
    render(){
        return(
            <div>
                <ProjectOptionsBar />
                <ProjectTasksTable />
            </div>
        );
    }
}

class ProjectOptionsBar extends React.Component{
    render(){
        return(
            <div>
                Projekt Tábla
                <button>Projekt hozzáadása</button>
                <button>Projekt kiválasztása</button>
            </div>
        );
    }
}

class ProjectTasksTable extends React.Component{
    render(){
        return(
            <div>
                TestProject
                <TaskContainer />
            </div>
        );
    }
}

export default TasksBoard;