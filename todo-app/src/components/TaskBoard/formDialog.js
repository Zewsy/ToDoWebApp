import React from 'react';
import {styles} from './formDialogStyles';
import {withStyles} from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

class FormDialog extends React.Component{
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

    handleSubmitClick(){
        const task = {status: this.state.status, title: this.state.title, description: this.state.description, priority: this.state.priority, deadline: this.state.deadline}
        this.props.onSubmit(task);
        this.props.handleClose();
    }

    render(){
        const classes = this.props.classes;
        return(
            <Dialog open={this.props.open} onClose={this.props.handleClose}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                        <InputLabel className={classes.dialog}>Cím</InputLabel>
                        <TextField className={classes.dialog} name="title" value={this.state.title} onChange={this.handleChange}/>

                        <InputLabel className={classes.dialog}>Leírás</InputLabel>
                        <TextField className={classes.dialog} name="description" value={this.state.description} onChange={this.handleChange}/>
                        
                        <InputLabel className={classes.dialog}>Határidő</InputLabel>
                        <TextField className={classes.dialog} type="date" name="deadline" value={this.state.deadline} onChange={this.handleChange}/>
                        
                        <InputLabel className={classes.dialog}>Állapot</InputLabel>
                        <Select className={classes.dialog} native name="status" value={this.state.status} onChange={this.handleChange}>
                            <option value="Függőben">Függőben</option>
                            <option value="Folyamatban">Folyamatban</option>
                            <option value="Kész">Kész</option>
                            <option value="Elhalasztva">Elhalasztva</option>
                        </Select>

                        <InputLabel className={classes.dialog}>Prioritás</InputLabel>
                        <TextField className={classes.dialog} type="number" name="priority" value={this.state.priority} onChange={this.handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSubmitClick}>
                        {this.props.title}
                    </Button>
                </DialogActions>
            </Dialog>
        );   
    }
}

export default withRouter(withStyles(styles)(FormDialog));