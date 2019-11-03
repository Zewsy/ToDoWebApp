import React from 'react';
import Modal from './modals';
import './taskContainer.css';
import { withRouter } from 'react-router';
import Task from './task';
import { getTasks } from '../reducers/tasksReducer';
import {connect} from 'react-redux';
import {fetchTasks} from '../actions/taskActions';

function TaskMapper(task, editClickHandler, delClickHandler){
    return (
    <Task
        id = {task.id}
        key={task.id}
        title = {task.title}
        description = {task.description}
        deadline = {task.deadline}
        status = {task.status}
        priority = {task.priority}
        project = {task.project}
        onEditClick = {editClickHandler}
        onDelete = {delClickHandler}
    />);
}

class TaskContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            projectId: this.props.location.state.selectedProject,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
       this.props.fetchTasks();
    }

    componentDidMount(){
        this.props.fetchTasks();
    }

    render(){
        const tasks = this.props.tasks;
        const taskComparator = (t1, t2) => {
            if(t1.priority < t2.priority)
                return -1;
            else if(t1.priority > t2.priority)
                return 1;
            else
                return 0;
        }
        const pendingTasks = tasks.filter(t => {return t.status.match("Függőben") && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
        const inProgressTasks = tasks.filter(t => {return t.status.match("Folyamatban") && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
        const doneTasks = tasks.filter(t => {return t.status.match("Kész") && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
        const suspendedTasks = tasks.filter(t => {return t.status.match("Elhalasztva") && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
        return(
            <div>
                <TaskTable projectId={this.state.projectId} status="Függőben" tasks={pendingTasks} onChange={this.handleChange}/>
                <TaskTable projectId={this.state.projectId} status="Folyamatban" tasks={inProgressTasks} onChange={this.handleChange}/>
                <TaskTable projectId={this.state.projectId} status="Kész" tasks={doneTasks} onChange={this.handleChange}/>
                <TaskTable projectId={this.state.projectId} status="Elhalasztva" tasks={suspendedTasks} onChange={this.handleChange}/>
            </div>
        );
    }
}

class TaskTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalActive: false,
            isEditModalActive: false,
            editingTaskData: {
                status: this.props.status
            }
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal(){
        this.setState({
            isModalActive: true,
            isEditModalActive: false
        });
    }

    openEditModal(taskData){
        this.setState({
            isModalActive: false,
            isEditModalActive: true,
            editingTaskData: taskData
        });
    }

    closeModal(){
        this.setState({
            isModalActive: false,
            isEditModalActive: false,
            editingTaskData: {status: this.props.status}
        });
    }

    handleAdd(task){
        const url = "http://localhost:3001/todos/";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                priority: parseInt(task.priority),
                project: this.props.projectId
            })
        }).then(() => this.props.onChange());
    }

    handleEdit(task){
        const url = "http://localhost:3001/todos/" + this.state.editingTaskData.id;
        fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.editingTaskData.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                priority: parseInt(task.priority),
                project: this.props.projectId
            })
        }).then(() => this.props.onChange());
    }
    
    render(){
        const tasks = this.props.tasks.map(t => TaskMapper(t, this.openEditModal, this.props.onChange));
        let modal = null;
        if(this.state.isModalActive){
            modal = <Modal title="Hozzáadás" editingTaskData={this.state.editingTaskData} onClose={this.closeModal} onSubmit={this.handleAdd}/>
        }
        else if(this.state.isEditModalActive){
            modal = <Modal title="Módosítás" editingTaskData={this.state.editingTaskData} onClose={this.closeModal} onSubmit={this.handleEdit}/>
        }
        return(
            <div>
                <table className="taskTable">
                    <thead>
                        <StatusBar Name={this.props.status} onAddClick={this.openModal} />
                    </thead>
                    <tbody>
                        {tasks}
                    </tbody>
                </table>
                {modal}
            </div>
        );
    }
}

function StatusBar(props){
    return(
        <tr>
            <th>
                {props.Name}
                <button id="btnAddTask" onClick={props.onAddClick}>+</button>
            </th>
        </tr>
    );
}

function mapStateToProps(state){
    return{
        tasks: getTasks(state.tasks)
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchTasks: () => dispatch(fetchTasks())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskContainer));