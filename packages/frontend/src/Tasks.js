import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTasksError, getTasks, getTasksPending, getComplete, getPending, getFIlter, taskToUpdate} from './reducers/rootReducer';
import {fetchTasks, setTaskDoneDB, deleteTaskDB, setTaskNotDoneDB, setFilterDB, setTaskUpdateDB} from './fetchTasks';

class Tasks extends Component{


    componentDidMount() {
        const {fetchTasks} = this.props;
        fetchTasks();
    }
     
    render(){
        console.log(this.props);
        const {tasks, taskComplete, taskPending} = this.props;
        var taskSelected = null;
        switch(this.props.filter){
            case 'completed':
                taskSelected = taskComplete;
            break;
            case 'pending':
                taskSelected = taskPending;
            break
            case 'all':
                taskSelected = tasks;
            break;
            default:
                taskSelected = tasks;
        }
        const taskList = taskSelected.length ? (
            taskSelected.map((task, index) => {
                return(
                    <li key={task._id}>
                        <div className="collapsible-header blue-text">{task.title}<span className={(task.taskStatus)?'new badge green':'new badge red'} data-badge-caption={(task.taskStatus)?'Completed':'Pending...'}></span></div>
                        <div className="collapsible-body">
                            <div className="left-align">
                            <span>{task.description}</span>
                            <p>Date: {task.date}</p>
                            </div>
                            <div className="right-align">
                                {(task.taskStatus)?(<button className="btn btn-primary" onClick={()=> this.props.setTaskNotDone(index, task._id)}>Not done yet</button>):(<button className="btn btn-primary" onClick={()=> this.props.setTaskDone(index, task._id)}>Set as done</button>)}
                                <a className="btn btn-primary modal-trigger" href="#modal1" onClick={() => this.props.setTaskUpdate(task._id)}>Update task</a>
                                <button className="btn btn-primary" onClick={() => {this.props.deleteTask(task._id)}}>Delete from list</button>
                            </div>
                        </div>
                    </li>
                )
            })  
        ):(
            <div className="center white-text">
                No task to do. oh yeah!
            </div>
        )
        return (
            <React.Fragment>
                <div className="input-field col s6">
                    <select className="filter col s6" onChange={(select) => {
                        if(select.target.value.toString()==='completed'){
                            this.props.setFIlter('completed');
                        }else if(select.target.value.toString()==='pending'){
                            this.props.setFIlter('pending');
                        }else{
                            this.props.setFIlter('all');
                        }
                    }}>
                    <option value="all" defaultValue={'DEFAULT'}>Show All</option>
                    <option value="completed">Show Completed</option>
                    <option value="pending">Show Pending</option>
                </select>
                </div>
                <ul className="collapsible">
                  {taskList}
                </ul>
            </React.Fragment>
        )
    }
}

const mapStateProps = (state) => {
    return {
      filter: getFIlter(state),
      error: getTasksError(state),
      tasks: getTasks(state),
      pending: getTasksPending(state),
      taskComplete: getComplete(state),
      taskPending: getPending(state),
      taskToUpdate: taskToUpdate(state)
    }
  };

  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchTasks: fetchTasks,
    setTaskDone: setTaskDoneDB,
    deleteTask: deleteTaskDB,
    setTaskNotDone: setTaskNotDoneDB,
    setFIlter: setFilterDB,
    setTaskUpdate: setTaskUpdateDB
}, dispatch)

export default connect(mapStateProps, mapDispatchToProps)(Tasks);
