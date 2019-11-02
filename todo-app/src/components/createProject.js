import React from 'react';
import { withRouter } from 'react-router';

class CreateProject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            desc: ""
        }

        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmitClick(e){
        e.preventDefault();
        const url = "http://localhost:3001/projects";
        fetch(url,{
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.desc
            })
        }).then(() => this.props.history.push('/'));
    }
    
    handleChange(e){
        const value = e.target.value;
        const name = e.target.name;
        this.setState(
            {[name]: value}
        );
    }

    render(){
        return(
            <div>
                <h1>Projekt hozzáadása</h1>
                <form onSubmit={this.handleSubmitClick} className="formCreateProject">
                    Név: <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/> <br />
                    Leírás: <input name="desc" type="text" value={this.state.desc} onChange={this.handleChange}/> <br />
                    <input type="submit" value="Projekt hozzáadása"/>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateProject);