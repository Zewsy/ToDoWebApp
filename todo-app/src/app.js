import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectTable from './components/Home/projectTable'
import CreateProject from './components/CreateProject/createProject'
import TasksBoard from './components/TaskBoard/tasksBoard'

const App = () => (
    <div>
      <main>
        <Switch>
            <Route exact path='/' component={ProjectTable}/>
            <Route path='/create-project' component={CreateProject}/>
            <Route path='/tasks' component={TasksBoard}/>
        </Switch>
      </main>
    </div>
)

export default App;