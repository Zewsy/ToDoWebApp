import React from 'react';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';

import {fetchProjects, deleteProject} from '../../actions/projectActions';
import {getProjects} from '../../reducers/projectsReducer';
import {styles} from './projectTableStyles';
import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Project from './project';

class ProjectTable extends React.Component{
    
    componentDidMount(){
        this.props.fetchProjects();
    }

    render(){
        const projects = this.props.projects.map(
        p => {
        return (
            <Project id={p.id}
                    name={p.name}
                    description={p.description}
                    key={p.id}
                    history={this.props.history}
                    deleteProject={this.props.deleteProject}
            />
        )});

        const classes = this.props.classes;

        return(
            <div>
                <Typography variant='h1' >Projektek</Typography>
                <div className={classes.projectsTable}>
                    <table>
                        <tbody>
                            {projects}
                        </tbody>
                    </table>
                </div>
                <Button href='/create-project' variant='contained' color='primary' className={classes.btnAddProject}>Projekt hozzáadása</Button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        projects: getProjects(state.projects)
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchProjects: () => dispatch(fetchProjects()),
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ProjectTable )));