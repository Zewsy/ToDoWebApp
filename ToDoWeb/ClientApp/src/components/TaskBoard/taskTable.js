import React from 'react';
import Task from './task';
import FormDialog from './formDialog';
import {connect} from 'react-redux';
import {openEditDialog, closeDialog} from '../../actions/dialogActions';
import {addTask, editTask} from '../../actions/taskActions';
import {getEditingTaskData, isEditing} from '../../reducers/dialogReducer';
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

function TaskTable(props){
    const classes = props.classes;
    const tasks = props.tasks.map(t => TaskMapper(t, props.openEditDialog, props.onChange));
    return(
        <div>
            <table className={classes.taskTable}>
                <thead>
                    <StatusBar Name={props.status} />
                </thead>
                <tbody>
                    {tasks}
                </tbody>
            </table>
            <FormDialog projectId={props.projectId} key={props.editId}/>
        </div>
    );
}

function mapStateToProps(state){
    return {
        editId: getEditingTaskData(state.dialogs).id,
        isEditing: isEditing(state.dialogs)
    }
}

function mapDispatchToProps(dispatch){
    return{
        addTask: (task) => dispatch(addTask(task)),
        editTask: (task) => dispatch(editTask(task)),
        openEditDialog: (task) => dispatch(openEditDialog(task)),
        closeDialog: () => dispatch(closeDialog())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskTable));