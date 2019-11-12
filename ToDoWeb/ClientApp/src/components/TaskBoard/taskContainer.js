import React from 'react';
import { withRouter } from 'react-router';
import TaskTable from './taskTable';
import { getTasks, getStatuses } from '../../reducers/tasksReducer';
import {connect} from 'react-redux';
import {fetchTasks, fetchStatuses} from '../../actions/taskActions';
import { Button, Grid } from '@material-ui/core';
import { openNewStatusDialog } from '../../actions/dialogActions';
import NewStatusDialog from './newStatusDialog';

class TaskContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projectId: this.props.location.state.selectedProject
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        this.props.fetchTasks();
        this.props.fetchStatuses();
    }

    handleChange(){
       this.fetchData();
    }

    componentDidMount(){
        this.fetchData();
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
        const statuses = this.props.statuses;
        const taskTables = [];
        let i = 1;
        statuses.forEach(status => {
            const statusTasks = tasks.filter(t => {return t.status === status.id && t.project === this.state.projectId}).sort((t1, t2) => taskComparator(t1, t2));
            taskTables.push(<Grid item><TaskTable key={i} projectId = {this.state.projectId} status={status.name} tasks={statusTasks} onChange={this.handleChange}/></Grid>)
            i++;
        });

        return(
            <div>
                <Grid container maxWidth='1000px' overflow='auto'>
                {taskTables}
                <Grid item xs>
                    <Button variant='contained' onClick={this.props.openDialog}>Új státusz felvétele</Button>
                </Grid>
                </Grid>
                <NewStatusDialog />
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        tasks: getTasks(state.tasks),
        statuses: getStatuses(state.tasks)
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchTasks: () => dispatch(fetchTasks()),
        fetchStatuses: () => dispatch(fetchStatuses()),
        openDialog: () => dispatch(openNewStatusDialog())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskContainer));