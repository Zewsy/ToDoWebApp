import React from 'react';
import Task from './task';
import FormDialog from './formDialog';
import {connect} from 'react-redux';
import {addTask, editTask} from '../../actions/taskActions';
import StatusBar from './statusBar';
import {styles} from './taskTableStyles';
import {withStyles} from '@material-ui/core/styles';

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
            isDialogActive: false,
            isEditing: false,
            editingTaskData: {
                title: '',
                description: '',
                priority: '',
                deadline: '',
                status: this.props.status
            },
            dialogTitle: ''
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.openEditDialog = this.openEditDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
    }

    openDialog(){
        this.setState({
            isDialogActive: true,
            dialogTitle: 'Teendő hozzáadása'
        });
    }

    openEditDialog(taskData){
        this.setState({
            isDialogActive: true,
            isEditing: true,
            editingTaskData: taskData,
            dialogTitle: 'Teendő módosítása'
        });
    }

    closeDialog(){
        this.setState({
            isDialogActive: false,
            isEditing: false,
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
        const classes = this.props.classes;
        const tasks = this.props.tasks.map(t => TaskMapper(t, this.openEditDialog, this.props.onChange));
        let onSubmit = null;
        if(this.state.isEditing)
            onSubmit = this.handleEdit;
        else
            onSubmit = this.handleAdd;
        return(
            <div>
                <table className={classes.taskTable}>
                    <thead>
                        <StatusBar Name={this.props.status} onAddClick={this.openDialog} />
                    </thead>
                    <tbody>
                        {tasks}
                    </tbody>
                </table>
                <FormDialog
                    open={this.state.isDialogActive}
                    handleClose={this.closeDialog}
                    title={this.state.dialogTitle}
                    editingTaskData={this.state.editingTaskData}
                    onSubmit={onSubmit}
                    key={this.state.editingTaskData.id + 1}
                 />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        addTask: (task) => dispatch(addTask(task)),
        editTask: (task) => dispatch(editTask(task))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(TaskTable));