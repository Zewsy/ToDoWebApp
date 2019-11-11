import React from 'react';
import { withRouter } from 'react-router';
import {addProject} from '../../actions/projectActions';
import {connect} from 'react-redux';
import {styles, formTheme} from './createProjectStyles';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

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
        const classes = this.props.classes;
            return(
                <ThemeProvider theme={formTheme}>
                    <div>
                        <Typography variant='h1'>Projekt hozzáadása</Typography>
                        <form onSubmit={this.handleSubmitClick}>
                            <p className={classes.formInput}>
                                <TextField label='Név' name='name' value={this.state.name} onChange={this.handleChange}/> <br/>
                                <TextField label='Leírás' name="desc" value={this.state.desc} onChange={this.handleChange}/> <br />
                                <Button variant='contained' color='primary' type="submit"> Projekt hozzáadása </Button>
                            </p>
                        </form>
                    </div>
                </ThemeProvider>
            );
    }
}

function mapDispatchToProps(dispatch){
    return {
        addProject: (p) => dispatch(addProject(p))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(CreateProject)));