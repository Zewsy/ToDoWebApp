import React from 'react';
import { withRouter } from 'react-router';
import {addProject} from '../../actions/projectActions';
import {connect} from 'react-redux';
import './createProject.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        const project = {name: this.state.name, desc: this.state.desc};
        this.props.addProject(project);
        this.props.history.push('/');
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
                    <form onSubmit={this.handleSubmitClick}>
                        <p className="formInput">
                            <TextField label='Név' variant='outlined' name='name' type='text' value={this.state.name} onChange={this.handleChange}/> <br/>
                            <TextField label='Leírás' variant='outlined' name="desc" type="text" value={this.state.desc} onChange={this.handleChange}/> <br />
                            <Button variant='contained' color='primary' type="submit"> Projekt hozzáadása </Button>
                        </p>
                    </form>
                </div>
            );
    }
}

function mapDispatchToProps(dispatch){
    return {
        addProject: (p) => dispatch(addProject(p))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CreateProject));