import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import { isNewStatusDialogActive } from '../../reducers/dialogReducer';
import { closeDialog } from '../../actions/dialogActions';
import { addStatus } from '../../actions/taskActions';

class NewStatusDialog extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleSubmitClick(){
        this.props.addStatus(this.state.name);
        this.props.closeDialog();
    }

    handleChange(e){
        this.setState(
            {name: e.target.value}
        )
    }

    render(){
        return(
            <Dialog open={this.props.isDialogActive} onClose={this.props.closeDialog}>
                <DialogTitle>Új státusz felvétele</DialogTitle>
                <DialogContent>
                    <TextField name="name" value={this.state.name} onChange={this.handleChange}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSubmitClick}>
                        Felvétel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

function mapStateToProps(state){
    return{
        isDialogActive: isNewStatusDialogActive(state.dialogs)
    }
}

function mapDispatchToProps(dispatch){
    return{
        closeDialog: () => dispatch(closeDialog()),
        addStatus: (name) => dispatch(addStatus(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStatusDialog);