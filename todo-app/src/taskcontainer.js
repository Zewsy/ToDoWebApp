import React from 'react';
import Modal from './Modals';
import './tasks.css';
import { withRouter } from 'react-router'

function TaskMapper(task, editClickHandler, delClickHandler){
    return (
    <Task
        id = {task.id}
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
        const url = "http://localhost:3001/todos"
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                this.setState({tasks: data});
            })
    }

    componentDidMount(){
        this.handleChange();
    }

    render(){
        const tasks = this.state.tasks;
        const pendingTasks = tasks.filter(t => {return t.status.match("Függőben") && t.project === this.state.projectId});
        const inProgressTasks = tasks.filter(t => {return t.status.match("Folyamatban") && t.project === this.state.projectId});
        const doneTasks = tasks.filter(t => {return t.status.match("Kész") && t.project === this.state.projectId});
        const suspendedTasks = tasks.filter(t => {return t.status.match("Elhalasztva") && t.project === this.state.projectId});
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
                    <StatusBar Name={this.props.status} onAddClick={this.openModal} />
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
                <button id="btnAddTask" onClick={this.props.onAddClick}>+</button>
            </th>
        );
    }
}

class Task extends React.Component{
    constructor(props){
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDelClick = this.handleDelClick.bind(this);
    }

    handleDelClick(){
        const url = "http://localhost:3001/todos/" + this.props.id;
        fetch(url,{
            method: 'DELETE'
        }).then(this.props.onDelete);
    }

    handleEditClick(){
        const taskData = {id: this.props.id,
                        title: this.props.title,
                        description: this.props.description,
                        deadline: this.props.deadline,
                        status: this.props.status,
                        priority: this.props.priority};
        this.props.onEditClick(taskData);
    }
    
    render(){
        const deadline = new Date(this.props.deadline);
        return(
            <tr className="task">
                <button className="btnTaskEdit" onClick={this.handleEditClick}>
                    Módosítás
                </button>
                <button classNamme="btnDel" onClick={this.handleDelClick}>
                    Törlés
                </button>
                <br />
                {this.props.title} <br />
                {this.props.description} <br />
                {deadline.toLocaleDateString()} <br />
            </tr>
        );
    }
}

export default withRouter(TaskContainer);