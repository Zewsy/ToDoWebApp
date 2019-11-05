import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './statusBarStyles';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

function StatusBar(props){
    return(
        <tr>
            <th>
                {props.Name}
                <IconButton className={props.classes.btnAdd} aria-label="add" size='small' onClick={props.onAddClick}>
                    <AddIcon size='medium' color='action' />
                </IconButton>
            </th>
        </tr>
    );
}

export default withStyles(styles)(StatusBar);