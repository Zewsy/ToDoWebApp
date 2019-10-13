import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectTable from './ProjectTable'
import CreateProject from './CreateProject'
import TasksBoard from './TasksBoard'

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

export default App