import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './statusBarStyles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function StatusBar(props){
    return(
        <tr>
            <th>
                {props.Name}
                <Fab className={props.classes.btnAdd} aria-label="add" size='small' onClick={props.onAddClick}>
                    <AddIcon size='medium' color='action' />
                </Fab>
            </th>
        </tr>
    );
}

export default withStyles(styles)(StatusBar);