import {fetchTaskPending, fetchTaskSuccess, fetchTaskError, addTask, setTaskDone, setTaskNotDone, deleteTask, setFIlterAction, setTaskUpdateAction, updateTaskAction} from './actions';

function fetchTasks() {
    return dispatch => {
        dispatch(fetchTaskPending());
        fetch('http://localhost:4000/tasks')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchTaskSuccess(res.tasks));
            return res.tasks;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function addTaskDB(task){
    return dispatch => {
        fetch('http://localhost:4000/task/create',{
            method:'POST',
            body: JSON.stringify(task),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(addTask(res.task));
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function setTaskDoneDB(index, taskId){
    return dispatch => {
        fetch('http://localhost:4000/task/update',{
            method:'POST',
            body: JSON.stringify({
                id: taskId,
                flag:'done'
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(setTaskDone(index, taskId));
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function setTaskNotDoneDB(index, taskId){
    return dispatch => {
        fetch('http://localhost:4000/task/update',{
            method:'POST',
            body: JSON.stringify({
                id: taskId,
                flag:'notDone'
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(setTaskNotDone(index, taskId));
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
    }
}

function updateTask(task){
    return dispatch => {
        fetch('http://localhost:4000/task/update',{
            method:'POST',
            body:JSON.stringify({
                task: task,
                flag:'update'
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==='error') {
                throw(res.error);
            }
            dispatch(updateTaskAction(task));
            dispatch({type:'SET_ACTION_INSERT', mode:'INSERT'});
            return res.message;
        })
        .catch(error => {
            dispatch(fetchTaskError(error));
        })
   }
}

function deleteTaskDB(taskId){
        return dispatch => {
            fetch('http://localhost:4000/task/delete',{
                method:'POST',
                body: JSON.stringify({
                    id: taskId
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.message==='error') {
                    throw(res.error);
                }
                dispatch(deleteTask(taskId));
                return res.message;
            })
            .catch(error => {
                dispatch(fetchTaskError(error));
            })
    }
}

function setFilterDB(filter){
    return dispatch => {
        dispatch(setFIlterAction(filter));
    }
}

function setTaskUpdateDB(taskId){
    return dispatch => {
        dispatch({type:'SET_ACTION_UPDATE', mode:'UPDATE'});
        dispatch(setTaskUpdateAction(taskId));
    }
}

function setInsertMode(){
    return dispatch => {
        dispatch({type:'SET_ACTION_INSERT', mode:'INSERT'});
    }
}

export {
    fetchTasks,
    addTaskDB,
    setTaskDoneDB,
    updateTask,
    deleteTaskDB,
    setTaskNotDoneDB,
    setFilterDB,
    setTaskUpdateDB,
    setInsertMode
}