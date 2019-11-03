import React from 'react';
import {connect} from 'react-redux';
import {deleteTask} from '../actions/taskActions';

class Task extends React.Component{
    constructor(props){
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDelClick = this.handleDelClick.bind(this);
    }

    handleDelClick(){
        this.props.deleteTask(this.props.id);
        this.props.onDelete();  //TODO
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
                <td>
                    <button className="btnTaskEdit" onClick={this.handleEditClick}>
                        Módosítás
                    </button>
                    <button className="btnDel" onClick={this.handleDelClick}>
                        Törlés
                    </button>
                    <b>{this.props.title}</b> <br />
                    <i>{this.props.description}</i> <br />
                    {deadline.toLocaleDateString()} <br />
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