import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {barTheme, styles} from './projectBarStyles';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import {Typography} from '@material-ui/core';

function ProjectBar(props){
    return(
        <div>
            <ThemeProvider theme={barTheme}>
                <Typography variant='h1'>Projekt Feladatok
                    <Button className={props.classes.btnProject} href='/create-project'>Projekt hozzáadása</Button>
                    <Button className={props.classes.btnProject} href='/'>Projekt kiválasztása</Button>
                </Typography>
                <Typography variant='h2' className={props.classes.subTitle}>
                    {props.name}
                </Typography>
            </ThemeProvider>
        </div>
    );
}

export default withStyles(styles)(ProjectBar);