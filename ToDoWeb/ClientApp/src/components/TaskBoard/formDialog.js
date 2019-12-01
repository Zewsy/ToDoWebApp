import React from 'react';
import {styles} from './formDialogStyles';
import {withStyles} from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import {closeDialog, submitDialog} from '../../actions/dialogActions';
import {getEditingTaskData, getDialogTitle, isDialogActive} from '../../reducers/dialogReducer';
import { getStatuses } from '../../reducers/statusReducer';

class FormDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {id: this.props.editingTaskData.id,
                      statusName: this.props.editingTaskData.statusName,
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
        const task = {id: this.state.id, project: this.props.projectId, statusName: this.state.statusName, title: this.state.title, description: this.state.description, priority: this.state.priority, deadline: this.state.deadline}
        this.props.submitDialog(task);
        this.props.closeDialog();
    }

    render(){
        const classes = this.props.classes;
        const statusOptions = this.props.statuses.map(s => {return (<option value={s.name} key={s.id}>{s.name}</option>)});
        return(
            <Dialog open={this.props.isDialogActive} onClose={this.props.closeDialog}>
                <DialogTitle>{this.props.dialogTitle}</DialogTitle>
                <DialogContent>
                        <InputLabel className={classes.dialog}>Cím</InputLabel>
                        <TextField className={classes.dialog} name="title" value={this.state.title} onChange={this.handleChange}/>

                        <InputLabel className={classes.dialog}>Leírás</InputLabel>
                        <TextField className={classes.dialog} name="description" value={this.state.description} onChange={this.handleChange}/>
                        
                        <InputLabel className={classes.dialog}>Határidő</InputLabel>
                        <TextField className={classes.dialog} type="date" name="deadline" value={moment(this.state.deadline).format("YYYY-MM-DD")} onChange={this.handleChange}/>
                        
                        <InputLabel className={classes.dialog}>Állapot</InputLabel>
                        <Select className={classes.dialog} native name="statusName" value={this.state.statusName} onChange={this.handleChange}>
                            {statusOptions}
                        </Select>

                        <InputLabel className={classes.dialog}>Prioritás</InputLabel>
                        <TextField className={classes.dialog} type="number" name="priority" value={this.state.priority} onChange={this.handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSubmitClick}>
                        {this.props.dialogTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        );   
    }
}

function mapDispatchToProps(dispatch){
    return{
        closeDialog: () => dispatch(closeDialog()),
        submitDialog: (task) => dispatch(submitDialog(task))
    }
}

function mapStateToProps(state){
    return{
        isDialogActive: isDialogActive(state.dialogs),
        dialogTitle: getDialogTitle(state.dialogs),
        editingTaskData: getEditingTaskData(state.dialogs),
        statuses: getStatuses(state.statuses)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(FormDialog )));