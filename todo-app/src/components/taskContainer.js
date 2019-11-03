import React from 'react';
import './taskContainer.css';
import { withRouter } from 'react-router';
import TaskTable from './taskTable';
import { getTasks } from '../reducers/tasksReducer';
import {connect} from 'react-redux';
import {fetchTasks} from '../actions/taskActions';

class TaskContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projectId: this.props.location.state.selectedProject
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
       this.props.fetchTasks();
    }

    componentDidMount(){
        this.props.fetchTasks();
    }

    render(){
        const tasks = this.props.tasks;
        const taskComparator = (t1, t2) => {
            if(t1.priority < t2.priority)
                return -1;
            else if(t1.priority > t2.priority)
                return 1;
            else
                return 0;
        }
        const pendingTasks = tasks.filter(t => {return t.status.match("Függőben") && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
        const inProgressTasks = tasks.filter(t => {return t.status.match("Folyamatban") && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
        const doneTasks = tasks.filter(t => {return t.status.match("Kész") && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
        const suspendedTasks = tasks.filter(t => {return t.status.match("Elhalasztva") && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
        return(
            <div>
                <TaskTable projectId={this.state.projectId} status="Függőben" tasks={pendingTasks} onChange={this.handleChange}/>
                <TaskTable projectId={this.state.projectId} status="Folyamatban" tasks={inProgressTasks} onChange={this.handleChange}/>
                <TaskTable projectId={this.state.projectId} status="Kész" tasks={doneTasks} onChange={this.handleChange}/>
                <TaskTable projectId={this.state.projectId} status="Elhalasztva" tasks={suspendedTasks} onChange={this.handleChange}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        tasks: getTasks(state.tasks)
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchTasks: () => dispatch(fetchTasks())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskContainer));