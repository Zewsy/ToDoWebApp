import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {projectButtonTheme, styles} from './projectOptionsBarStyles';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';

function ProjectOptionsBar(props){
    return(
        <div>
            <h1>Projekt Feladatok
                <ThemeProvider theme={projectButtonTheme}>
                    <Button className={props.classes.btnProject} href='/create-project'>Projekt hozzáadása</Button>
                    <Button className={props.classes.btnProject} href='/'>Projekt kiválasztása</Button>
                </ThemeProvider>
            </h1>
        </div>
    );
}

export default withStyles(styles)(ProjectOptionsBar);