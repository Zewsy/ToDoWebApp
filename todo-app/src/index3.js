import React from 'react';
import ReactDOM from 'react-dom';
import TaskContainer from './taskcontainer';

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
                <TaskContainer />
            </div>
        );
    }
}

ReactDOM.render(
    <ProjectBoard />,
    document.getElementById('root')
)