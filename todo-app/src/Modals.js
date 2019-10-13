import React from 'react';
import './Modals.css';

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: this.props.status};

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    render(){
        const statusSelect = (
            <select value={this.state.value} onChange={this.handleChange}>
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
                        Cím: <input type="text" /> <br />
                        Leírás: <input type="text" /> <br />
                        Határidő: <input type="date" /> <br />
                        Állapot: {statusSelect} <br />
                        Prioritás: <input type="number" /> <br />
                        <input type="submit" value="Hozzáadás"/>
                    </form>
                </div>
            </div>
        );   
    }
}

export default Modal;