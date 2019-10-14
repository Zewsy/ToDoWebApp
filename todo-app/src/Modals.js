import React from 'react';
import './Modals.css';

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {statusValue: this.props.status};

        this.handleChange = this.handleChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
    }
    
    handleChange(event){
        this.setState({
            statusValue: event.target.value
        });
    }

    handleSubmitClick(){
        const url = "http://localhost:3001/projects";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
            });
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
                    <form>
                        Cím: <input type="text" value={this.state.title} onChange={this.handleTitleChange}/> <br />
                        Leírás: <input type="text" value={this.state.desc} onChange={this.handleDescChange} /> <br />
                        Határidő: <input type="date" value={this.state.date} onChange={this.handleDateChange}/> <br />
                        Állapot: {statusSelect} <br />
                        Prioritás: <input type="number" value={this.state.priority} onChange={this.handlePriorityChange} /> <br />
                        <input type="submit" value="Hozzáadás" onClick={() => this.handleSubmitClick()}/>
                    </form>
                </div>
            </div>
        );   
    }
}

export default Modal;