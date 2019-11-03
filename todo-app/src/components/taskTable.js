import React from 'react';
import Task from './task';
import Modal from './modals';
import {connect} from 'react-redux';
import {addTask} from '../actions/taskActions';

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
        task.project = this.props.projectId;
        this.props.addTask(task);
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

function mapDispatchToProps(dispatch){
    return{
        addTask: (task) => dispatch(addTask(task))
    }
}

export default connect(null, mapDispatchToProps)(TaskTable);