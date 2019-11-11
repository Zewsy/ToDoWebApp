import React from 'react';
import {connect} from 'react-redux';
import {deleteTask} from '../../actions/taskActions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './taskStyles';

class Task extends React.Component{
    constructor(props){
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDelClick = this.handleDelClick.bind(this);
    }

    handleDelClick(){
        this.props.deleteTask(this.props.id);
        this.props.onDelete();
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
        const classes = this.props.classes;
        return(
            <tr>
                <td>
                    <Card>
                        <CardContent className={classes.task}>
                            <IconButton aria-label="edit" color='primary' size='medium' className={classes.btnTaskEdit} onClick={this.handleEditClick}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" color='secondary' size='medium' className={classes.btnTaskDel} onClick={this.handleDelClick}>
                                <DeleteIcon />
                            </IconButton>
                            <b>{this.props.title}</b> <br />
                            <i>{this.props.description}</i> <br />
                            {deadline.toLocaleDateString()} <br />
                        </CardContent>
                    </Card>
                </td>
            </tr>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        deleteTask: (id) => dispatch(deleteTask(id))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Task));