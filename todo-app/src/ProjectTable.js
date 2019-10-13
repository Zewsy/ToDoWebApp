import React from 'react';
import './projects.css';

class Project extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.id,
            name: this.props.name,
            description: this.props.description
        }
    }
    render(){
        return(
            <tr>
                {this.state.name} <br />
                {this.state.description}
            </tr>
        );
    }
}

class ProjectTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            projects: []
        };
    }

    componentDidMount(){
        const url = "http://localhost:3001/projects";
        fetch(url)
            .then(resp => resp.json())
            .then(data =>
                {this.setState({projects: data});
            })
    }

    render(){
        const projects = this.state.projects.map(
        p => {
        return (<tr className="projectBar">
            <Project id={p.id}
                    name={p.name}
                    description={p.description}
            />
        </tr>)});

        return(
            <div>
                <h1>Projects</h1>
                <table className="projectsTable">
                    {projects}
                </table>
            </div>
        );
    }
}

export default ProjectTable;