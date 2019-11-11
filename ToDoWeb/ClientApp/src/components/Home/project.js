import React from 'react';
import {styles} from './projectStyles';
import {withStyles} from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';

class Project extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.id,
            name: this.props.name,
            description: this.props.description
        }

        this.handleDelClick = this.handleDelClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleDelClick(){
        this.props.deleteProject(this.state.id);
    }

    handleClick(){
        this.props.history.push({
            pathname: '/tasks',
            state: {selectedProject: this.state.id,
                    name: this.state.name}
        });
    }

    render(){
        const classes = this.props.classes;
        return(
            <Card className={classes.projectCard}>
                <CardActionArea onClick={this.handleClick}>
                    <CardContent>
                        <Typography>
                            <b>{this.state.name}</b> <br />
                            {this.state.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size='small' variant='contained' color='secondary' onClick={this.handleDelClick}>Törlés</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Project);