import React from 'react';
import { withRouter } from 'react-router';
import TaskTable from './taskTable';
import { getTasks} from '../../reducers/tasksReducer';
import {getStatuses} from '../../reducers/statusReducer';
import {connect} from 'react-redux';
import {fetchTasks} from '../../actions/taskActions';
import {fetchStatuses} from '../../actions/statusActions';
import { Button, Grid } from '@material-ui/core';
import { openNewStatusDialog } from '../../actions/dialogActions';
import { getEditingTaskData } from '../../reducers/dialogReducer';
import NewStatusDialog from './newStatusDialog';
import FormDialog from './formDialog';

class TaskContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projectId: this.props.location.state.selectedProject
        };
    }

    componentDidMount(){
        this.props.fetchTasks();
        this.props.fetchStatuses();
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
        statuses.forEach(status => {
            const statusTasks = tasks.filter(t => {return t.statusName === status.name}).sort((t1, t2) => taskComparator(t1, t2));
            taskTables.push(<Grid key={status.id} item>
                                <TaskTable projectId = {this.state.projectId} status={status} tasks={statusTasks}/>
                            </Grid>)
        });

        return(
            <div>
                <Grid container overflow='auto'>
                {taskTables}
                <Grid item xs>
                    <Button variant='contained' onClick={this.props.openDialog}>Új státusz felvétele</Button>
                </Grid>
                </Grid>
                <NewStatusDialog />
                <FormDialog projectId={this.state.projectId} key={this.props.editingTaskData.id}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        tasks: getTasks(state.tasks),
        statuses: getStatuses(state.statuses),
        editingTaskData: getEditingTaskData(state.dialogs)
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