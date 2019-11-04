import React from 'react';
import Task from './task';
import Modal from './modal';
import {connect} from 'react-redux';
import {addTask, editTask} from '../../actions/taskActions';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
                title: '',
                description: '',
                priority: '',
                deadline: '',
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
        task.id = this.state.editingTaskData.id;
        task.project = this.props.projectId;
        this.props.editTask(task);
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
                <Fab aria-label="add" size='small' onClick={props.onAddClick}>
                    <AddIcon size='medium' color='action' />
                </Fab>
            </th>
        </tr>
    );
}

function mapDispatchToProps(dispatch){
    return{
        addTask: (task) => dispatch(addTask(task)),
        editTask: (task) => dispatch(editTask(task))
    }
}

export default connect(null, mapDispatchToProps)(TaskTable);