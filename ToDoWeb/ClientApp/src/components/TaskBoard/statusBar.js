import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './statusBarStyles';
import {connect} from 'react-redux';
import {openDialog} from '../../actions/dialogActions';
import {deleteStatus} from '../../actions/taskActions';


import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function StatusBar(props){
    return(
        <tr>
            <th>
                {props.Name}
                <IconButton className={props.classes.btnAdd} aria-label="add" size='small' onClick={() => props.openDialog(props.Name)}>
                    <AddIcon size='medium' color='action' />
                </IconButton>
                <IconButton aria-label="remove" size='small' onClick={() => props.deleteStatus(props.Name)}>
                    <RemoveIcon size='medium' color='action' />
                </IconButton>
            </th>
        </tr>
    );
}

function mapDispatchToProps(dispatch){
    return {
        openDialog: (status) => dispatch(openDialog(status)),
        deleteStatus: (status) => dispatch(deleteStatus(status))
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(StatusBar));