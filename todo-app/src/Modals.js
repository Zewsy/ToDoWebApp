import React from 'react';
import './Modals.css';
import { withRouter } from 'react-router';


class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {statusValue: this.props.status};

        this.handleChange = this.handleChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }
    
    handleChange(event){
        this.setState({
            statusValue: event.target.value
        });
    }

    handleSubmitClick(e){
        e.preventDefault();
        const url = "http://localhost:3001/todos"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.maxId + 1,
                title: this.state.title,
                description: this.state.desc,
                deadline: this.state.date,
                status: this.state.statusValue,
                priority: parseInt(this.state.priority),
                project: this.props.projectId
            })
        }).then(this.props.onChange);
        this.props.onClose();
    }

    handleTitleChange(e){
        this.setState({title: e.target.value});
    }

    handleDescChange(e){
        this.setState({desc: e.target.value});
    }

    handleDateChange(e){
        this.setState({date: e.target.value});
    }

    handlePriorityChange(e){
        this.setState({priority: e.target.value});
    }

    render(){
        const statusSelect = (
            <select value={this.state.statusValue} onChange={this.handleChange}>
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
                    <h4>Teendő hozzáadása</h4>
                    <form onSubmit={this.handleSubmitClick}>
                        Cím: <input type="text" value={this.state.title} onChange={this.handleTitleChange}/> <br />
                        Leírás: <input type="text" value={this.state.desc} onChange={this.handleDescChange} /> <br />
                        Határidő: <input type="date" value={this.state.date} onChange={this.handleDateChange}/> <br />
                        Állapot: {statusSelect} <br />
                        Prioritás: <input type="number" value={this.state.priority} onChange={this.handlePriorityChange} /> <br />
                        <input type="submit" value="Hozzáadás"/>
                    </form>
                </div>
            </div>
        );   
    }
}

export default withRouter(Modal);