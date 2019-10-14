import React from 'react';
import TaskContainer from './taskcontainer';
import { withRouter } from 'react-router';

class TasksBoard extends React.Component{
    render(){
        return(
            <div>
                <ProjectOptionsBar history={this.props.history} />
                <ProjectTasksTable />
            </div>
        );
    }
}

class ProjectOptionsBar extends React.Component{
    handleAddClick(){
        this.props.history.push('/create-project');
    }

    handleChooseClick(){
        this.props.history.push('/');
    }

    render(){
        return(
            <div>
                Projekt Tábla
                <button onClick={() => this.handleAddClick()}>Projekt hozzáadása</button>
                <button onClick={() => this.handleChooseClick()}>Projekt kiválasztása</button>
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

export default withRouter(TasksBoard);