import React from 'react';
import Modal from './Modals';
import './tasks.css';

function TaskMapper(task){
    return (
    <Task
        title = {task.title}
        description = {task.description}
        deadline = {task.deadline}
        status = {task.status}
        priority = {task.priority}
    />);
}

class TaskContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: []
        };
    }

    componentDidMount(){
        const url = "http://localhost:3001/todos"
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                this.setState({tasks: data});
            })
    }

    render(){
        const pendingTasks = this.state.tasks.filter(t => {return t.status.match("Pending")}).map(t => TaskMapper(t));
        const inProgressTasks = this.state.tasks.filter(t => {return t.status.match("In Progress")}).map(t => TaskMapper(t));
        const doneTasks = this.state.tasks.filter(t => {return t.status.match("Done")}).map(t => TaskMapper(t));
        const suspendedTasks = this.state.tasks.filter(t => {return t.status.match("Suspended")}).map(t => TaskMapper(t));
        return(
            <div>
                <TaskTable tasks={pendingTasks} status="Függőben"/>
                <TaskTable tasks={inProgressTasks} status="Folyamatban"/>
                <TaskTable tasks={doneTasks} status="Kész"/>
                <TaskTable tasks={suspendedTasks} status="Elhalasztva"/>
            </div>
        );
    }
}

class TaskTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalActive: false
        }
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
        const tasks = this.props.tasks;
        let modal = null;
        if(this.state.isModalActive){
            modal = <Modal onClose={() => this.closeModal()}/>
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
            title: this.props.title,
            description: this.props.description,
            deadline: this.props.deadline,
            status: this.props.status,
            priority: this.props.priority
        }
    }

    render(){
        const deadline = new Date(this.state.deadline);
        return(
            <tr className="task">
                <button className="btnTaskEdit">
                    Edit
                </button>
                {this.state.title} <br />
                {this.state.description} <br />
                {deadline.toLocaleDateString()} <br />
            </tr>
        );
    }
}

export default TaskContainer;