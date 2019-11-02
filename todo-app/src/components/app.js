import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectTable from './projectTable'
import CreateProject from './createProject'
import TasksBoard from './tasksBoard'

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