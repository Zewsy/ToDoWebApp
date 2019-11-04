import React from 'react';
import {connect} from 'react-redux';
import {deleteTask} from '../actions/taskActions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActionArea from '@material-ui/core/CardActionArea';

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
        return(
            <tr>
                <td>
                    <Card>
                        <CardContent className="task">
                            <Fab aria-label="edit" color='primary' size='small' className="btnTaskEdit" onClick={this.handleEditClick}>
                                <EditIcon />
                            </Fab>
                            <Fab aria-label="delete" color='secondary' size='small' className="btnDel" onClick={this.handleDelClick}>
                                <DeleteIcon />
                            </Fab>
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

export default connect(null, mapDispatchToProps)(Task);