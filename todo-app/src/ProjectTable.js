import React from 'react';
import './projects.css';
import { withRouter } from 'react-router';

class Project extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.id,
            name: this.props.name,
            description: this.props.description
        }
    }

    handleClick(){
        this.props.history.push({
            pathname: '/tasks',
            state: {selectedProject: this.state.id}
        });
    }

    render(){
        return(
            <tr className="rowLink" onClick={() => this.handleClick()}>
                <td className="projectBar">
                    {this.state.name} <br />
                    {this.state.description}
                </td>
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

    handleAddClick(){
        this.props.history.push('/create-project');
    }

    render(){
        const projects = this.state.projects.map(
        p => {
        return (
            <Project id={p.id}
                    name={p.name}
                    description={p.description}
                    key={p.id}
                    history={this.props.history}
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
                <button className="btnAddProject" onClick={() => this.handleAddClick()}>Projekt hozzáadása</button>
            </div>
        );
    }
}

export default withRouter(ProjectTable);