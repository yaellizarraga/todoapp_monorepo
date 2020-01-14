import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {getTasksError, getTasks, getTasksPending, getAction, taskToUpdate} from './reducers/rootReducer';

const TaskModal = (props) => {
     const idTask = React.createRef();
     const title = React.createRef();
     const description = React.createRef();
     const date = React.createRef();
     useEffect(() => {
        if(props.taskToUpdate.title !== undefined){
            idTask.current.value = props.taskToUpdate.id;
            title.current.value = props.taskToUpdate.title;
            description.current.value = props.taskToUpdate.description;
            date.current.value = props.taskToUpdate.date;
        }
      });
    return (
        <div id="modal1" className="modal">
            <form onSubmit={(e) =>{
                        e.preventDefault();
                        var task = {
                            id:idTask.current.value,
                            title: title.current.value,
                            description: description.current.value,
                            date:date.current.value
                        };
                        console.log(task);
                        console.log(props.action);
                        if(props.action==='INSERT'){
                            if(title.current.value ==='' || description.current.value ==='' || date.current.value===''){
                                alert('Cannot send empty fields');
                                return false;
                            }else{
                               props.handleAddTask(task);
                            }
                            
                        }else if(props.action==='UPDATE'){  
                            if(idTask.current.value ==='' || title.current.value ==='' || description.current.value ==='' || date.current.value===''){
                                alert('Cannot send empty fields or task id is unavailable');
                                return false;
                            }else{
                                props.handleUpdate(task);
                            }
                        }
                    }}>
            <div className="modal-content">
            <h4>{(props.action==='INSERT')?'New task':'Update task'}</h4>
                <div className="row">
                    <div className="col s12">
                        <input type="hidden" ref={idTask}></input>
                        <div className="input-field col s12">
                            <input type="text" className="validate" id="title" name="title" ref={title}/>
                            <label>Title</label>
                        </div>
                        <div className="input-field col s12">
                        <input type="text" className="validate" id="description" name="description" ref={description}/>
                            <label>Description</label>
                        </div>
                        <div className="input-field col s12">
                         <input type="text" className="datepicker" id="date" name="date" ref={date}/>
                         <label>Date</label>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" id="addUpdate" className="waves-effect waves-green btn-flat">{(props.action==='INSERT')?'Add task':'Update task'}</button>
                <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={() => {props.handleCloseModal(title.current, description.current, date.current)}}>Cancel</a>
            </div>
            </form>
        </div>
    )
};  

const mapStateProps = (state) => {
    return {
      action:getAction(state),
      error: getTasksError(state),
      tasks: getTasks(state),
      pending: getTasksPending(state),
      taskToUpdate: taskToUpdate(state)
    }
  };

export default connect(mapStateProps)(TaskModal);