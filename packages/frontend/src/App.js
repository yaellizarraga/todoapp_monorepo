import React from 'react';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Tasks from './Tasks';
import './app.css';
import FloatButton from './floatingButton';
import TaskModal from './modal';
import {getTasksError, getTasks, getTasksPending} from './reducers/rootReducer';
import {addTaskDB, updateTask, setInsertMode} from './fetchTasks';

function App(props) {
  const saveTask = (task) => {
      const {addTask} = props;
      addTask(task);
  }

  const updateTask = (task) =>{
    const {updateTask} = props;
    updateTask(task);
  }

  const cancelAdd = (title, description, date) => {
    title.value = "";
    description.value ="";
    date.value = "";
    const {setInsertModeP} = props;
    setInsertModeP();
  }

  return (
    <div className="container">
      <div className="center white-text"><strong><h3>Good morning yael! today you have to...</h3></strong></div>
        <Tasks filter={null}/>
        <TaskModal handleAddTask={saveTask} handleUpdate={updateTask} handleCloseModal={cancelAdd} />
        <FloatButton />
      </div>
  );
}

const mapStateProps = (state) => {
  return {
    error: getTasksError(state),
    tasks: getTasks(state),
    pending: getTasksPending(state)
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addTask: addTaskDB,
  updateTask: updateTask,
  setInsertModeP:setInsertMode
}, dispatch)

export default connect(mapStateProps, mapDispatchToProps)(App);
