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

        this.handleDelClick = this.handleDelClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleDelClick(){
        const url = "http://localhost:3001/todos/"
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                const idsToDelete = data.filter(t => {return t.project === this.state.id}).map(t => {return t.id});
                idsToDelete.forEach(
                    id => {
                        fetch(url + id,{
                            method: 'DELETE'
                        })
                    }
                )
            }).then(
                fetch("http://localhost:3001/projects/" + this.state.id,{
                method: 'DELETE'}).then(this.props.onDelete)
            )
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
            <tr>
                <td className="projectBar" onClick={this.handleClick}>
                    {this.state.name} <br />
                    {this.state.description}
                </td>
                <td>
                    <button onClick={this.handleDelClick}>Törlés</button>
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

        this.handleChange = this.handleChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleChange(){
        const url = "http://localhost:3001/projects";
        fetch(url)
            .then(resp => resp.json())
            .then(data =>
                {this.setState({projects: data});
            })
    }

    componentDidMount(){
        this.handleChange();
    }

    handleAddClick(){
        this.props.history.push({
            pathname: '/create-project',
            state: {nextId: this.state.projects.length + 1}
        });
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
                    onDelete={this.handleChange}
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
                <button className="btnAddProject" onClick={this.handleAddClick}>Projekt hozzáadása</button>
            </div>
        );
    }
}

export default withRouter(ProjectTable);