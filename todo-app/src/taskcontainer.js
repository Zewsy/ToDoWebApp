import React from 'react';
import Modal from './Modals';
import './tasks.css';
import { withRouter } from 'react-router'

function TaskMapper(task, clickHandler){
    return (
    <Task
        id = {task.id}
        title = {task.title}
        description = {task.description}
        deadline = {task.deadline}
        status = {task.status}
        priority = {task.priority}
        project = {task.project}
        onEditClick = {() => clickHandler()}
    />);
}

class TaskContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            projectId: this.props.location.state.selectedProject,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(){
        const url = "http://localhost:3001/todos"
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                this.setState({tasks: data});
            })
    }

    componentDidMount(){
        this.onChange();
    }

    render(){
        const tasks = this.state.tasks;
        var maxId = tasks.length;
        const pendingTasks = tasks.filter(t => {return t.status.match("Függőben") && t.project === this.state.projectId});
        const inProgressTasks = tasks.filter(t => {return t.status.match("Folyamatban") && t.project === this.state.projectId});
        const doneTasks = tasks.filter(t => {return t.status.match("Kész") && t.project === this.state.projectId});
        const suspendedTasks = tasks.filter(t => {return t.status.match("Elhalasztva") && t.project === this.state.projectId});
        return(
            <div>
                <TaskTable maxId={maxId} tasks={pendingTasks} status="Függőben" projectId={this.state.projectId} onChange={() => this.onChange()}/>
                <TaskTable maxId={maxId} tasks={inProgressTasks} status="Folyamatban" projectId={this.state.projectId} onChange={() => this.onChange()}/>
                <TaskTable maxId={maxId} tasks={doneTasks} status="Kész" projectId={this.state.projectId} onChange={() => this.onChange()}/>
                <TaskTable maxId={maxId} tasks={suspendedTasks} status="Elhalasztva" projectId={this.state.projectId} onChange={() => this.onChange()}/>
            </div>
        );
    }
}

class TaskTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalActive: false
        };
    }

    openModal(){
        this.setState({
            isModalActive: true
        });
    }

    closeModal(){
        this.setState({
            isModalActive: false
        });
    }
    
    render(){
        const tasks = this.props.tasks.map(t => TaskMapper(t, () => this.openModal()));
        let modal = null;
        if(this.state.isModalActive){
            modal = <Modal maxId={this.props.maxId} onClose={() => this.closeModal()} status={this.props.status} projectId = {this.props.projectId} onChange={() => this.props.onChange()}/>
        }
        return(
            <div>
                <table className="taskTable">
                    <StatusBar Name={this.props.status} onAddClick={() => this.openModal()}/>
                    {tasks}
                </table>
                {modal}
            </div>
        );
    }
}

class StatusBar extends React.Component{
    render(){
        return(
            <th>
                {this.props.Name}
                <button id="btnAddTask" onClick={() => this.props.onAddClick()}>+</button>
            </th>
        );
    }
}

class Task extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            deadline: this.props.deadline,
            status: this.props.status,
            priority: this.props.priority,
            project: this.props.project
        }
    }

    render(){
        const deadline = new Date(this.state.deadline);
        return(
            <tr className="task">
                <button className="btnTaskEdit" onClick={() => this.props.onEditClick()}>
                    Edit
                </button>
                {this.state.title} <br />
                {this.state.description} <br />
                {deadline.toLocaleDateString()} <br />
            </tr>
        );
    }
}

export default withRouter(TaskContainer);