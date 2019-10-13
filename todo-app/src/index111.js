import React from 'react';
import ReactDOM from 'react-dom';

class ProjectTable extends React.Component{
    render(){
        return(
            <div>
                <h1>Projects</h1>
                <table className="projectsTable">
                    <tr>
                        SampleProject
                    </tr>
                </table>
            </div>
        );
    }
}

ReactDOM.render(
    <ProjectTable />,
    document.getElementById('root')
)