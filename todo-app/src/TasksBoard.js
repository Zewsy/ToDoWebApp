import React from 'react';
import TaskContainer from './taskcontainer';
import { withRouter } from 'react-router';

function TasksBoard(props){
        return(
            <div>
                <ProjectOptionsBar history={props.history} />
                <ProjectTasksTable />
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
                Projekt Tábla
                <button onClick={this.handleAddClick}>Projekt hozzáadása</button>
                <button onClick={this.handleChooseClick}>Projekt kiválasztása</button>
            </div>
        );
    }
}

function ProjectTasksTable(props){
        return(
            <div>
                TestProject
                <TaskContainer />
            </div>
        );
}

export default withRouter(TasksBoard);