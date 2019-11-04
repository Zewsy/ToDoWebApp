import React from 'react';
import './projectTable.css'
import { withRouter } from 'react-router';
import {connect} from 'react-redux';

import {fetchProjects, deleteProject} from '../actions/projectActions';
import {getProjects} from '../reducers/projectsReducer';

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
        return(
            <Card>
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

class ProjectTable extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleChange(){
        this.props.fetchProjects();
    }

    componentDidMount(){
        this.props.fetchProjects();
    }

    handleAddClick(){
        this.props.history.push({
            pathname: '/create-project'
        });
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

        return(
            <div>
                <h1>Projektek</h1>
                <table className="projectsTable">
                    <tbody>
                        {projects}
                    </tbody>
                </table>
                <Button variant='contained' color='primary' className="btnAddProject" onClick={this.handleAddClick}>Projekt hozzáadása</Button>
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
)(ProjectTable ));