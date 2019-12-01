import React from 'react';
import Task from './task';
import {connect} from 'react-redux';
import {openEditDialog, closeDialog} from '../../actions/dialogActions';
import {addTask, editTask} from '../../actions/taskActions';
import StatusBar from './statusBar';
import {styles} from './taskTableStyles';
import {withStyles} from '@material-ui/core/styles';

function TaskMapper(task, editClickHandler){
    return (
    <Task
        id = {task.id}
        key={task.id}
        title = {task.title}
        description = {task.description}
        deadline = {task.deadline}
        statusName = {task.statusName}
        priority = {task.priority}
        project = {task.project}
        onEditClick = {editClickHandler}
    />);
}

function TaskTable(props){
    const classes = props.classes;
    const tasks = props.tasks.map(t => TaskMapper(t, props.openEditDialog));
    return(
        <div>
            <table className={classes.taskTable}>
                <thead>
                    <StatusBar status={props.status}/>
                </thead>
                <tbody>
                    {tasks}
                </tbody>
            </table>
        </div>
    );
}

function mapDispatchToProps(dispatch){
    return{
        addTask: (task) => dispatch(addTask(task)),
        editTask: (task) => dispatch(editTask(task)),
        openEditDialog: (task) => dispatch(openEditDialog(task)),
        closeDialog: () => dispatch(closeDialog())
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(TaskTable));