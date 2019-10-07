import React from 'react';
import ReactDOM from 'react-dom';

class ProjectBoard extends React.Component{
    render(){
        return(
            <div>
                <ProjectOptionsBar />
                <ProjectTasksTable />
            </div>
        );
    }
}

class ProjectOptionsBar extends React.Component{
    render(){
        return(
            <div>
                ProjectBoard
                <button>Add project</button>
                <button>Edit projects</button>
            </div>
        );
    }
}

class ProjectTasksTable extends React.Component{
    render(){
        return(
            <div>
                TestProject
                <table>
                    <StatusBar Name="Függőben"/>
                    <StatusBar Name="Folyamatban"/>
                    <StatusBar Name="Kész"/>
                    <StatusBar Name="Elhalasztva"/>
                </table>
            </div>
        );
    }
}

class StatusBar extends React.Component{
    render(){
        return(
            <th>
                {this.props.Name}
                <button>+</button>
            </th>
        );
    }
}

ReactDOM.render(
    <ProjectBoard />,
    document.getElementById('root')
)