import React from 'react';
import './Modals.css';
import { withRouter } from 'react-router';


class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {status: this.props.editingTaskData.status,
                      title: this.props.editingTaskData.title,
                      description: this.props.editingTaskData.description,
                      priority: this.props.editingTaskData.priority,
                      deadline: this.props.editingTaskData.deadline};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }
    
    handleChange(e){
        const value = e.target.value;
        const name = e.target.name;
        this.setState(prevState => (
            {[name]: value, ...prevState.task}
        ));
    }

    handleSubmitClick(e){
        e.preventDefault();
        const task = {status: this.state.status, title: this.state.title, description: this.state.description, priority: this.state.priority, deadline: this.state.deadline}
        this.props.onSubmit(task);
        this.props.onClose();
    }

    render(){
        const statusSelect = (
            <select name="status" value={this.state.status} onChange={this.handleChange}>
                <option value="Függőben">Függőben</option>
                <option value="Folyamatban">Folyamatban</option>
                <option value="Kész">Kész</option>
                <option value="Elhalasztva">Elhalasztva</option>
            </select>
        );
        return(
            <div id="taskModal" className='modal'>
                <div className="modal-content">
                    <span className="close-btn" onClick={() => this.props.onClose()}>&times;</span>
                    <h4>Teendő {this.props.title.toLowerCase()}</h4>
                    <form onSubmit={this.handleSubmitClick}>
                        Cím: <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/> <br />
                        Leírás: <input type="text" name="description" value={this.state.description} onChange={this.handleChange} /> <br />
                        Határidő: <input type="date" name="deadline" value={this.state.deadline} onChange={this.handleChange}/> <br />
                        Állapot: {statusSelect} <br />
                        Prioritás: <input type="number" name="priority" value={this.state.priority} onChange={this.handleChange} /> <br />
                        <input type="submit" value={this.props.title}/>
                    </form>
                </div>
            </div>
        );   
    }
}

export default withRouter(Modal);