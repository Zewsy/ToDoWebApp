import React from 'react';

class CreateProject extends React.Component{
    render(){
        return(
            <div>
                <h1>Create Project</h1>
                <form className="formCreateProject">
                    Név: <input type="text" /> <br />
                    Leírás: <input type="text" /> <br />
                </form>
            </div>
        );
    }
}

export default CreateProject;