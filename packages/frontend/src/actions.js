export const FETCH_TASKS_PENDING = 'FETCH_TASKS_PENDING';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_TASK_DONE = 'SET_TASK_DONE';
export const UPDATE_TASK = 'UPDATE_TASK';
export const SET_TASK_NOT_DONE = 'SET_TASK_NOT_DONE';
export const SHOW_ALL_TODOS = 'SHOW_ALL_TODOS';
export const SHOW_ALL_COMPLETE = 'SHOW_ALL_COMPLETE';
export const SHOW_ALL_PENDING = 'SHOW_ALL_PENDING';
export const SET_FILTER = 'SET_FILTER';
export const SET_TO_UPDATE = 'SET_TO_UPDATE';

export function fetchTaskPending() {
    return {
        type: FETCH_TASKS_PENDING
    }
}

export function fetchTaskSuccess(tasks) {
    return {
        type: FETCH_TASKS_SUCCESS,
        tasks: tasks
    }
}

export function fetchTaskError(error) {
    return {
        type: FETCH_TASKS_ERROR,
        error: error
    }
}

export function addTask(task){
    return {
        type: ADD_TASK,
        task:task
    }
}

export function deleteTask(taskId){
    return {
        type:DELETE_TASK,
        id:taskId
    }
}

export function setTaskDone(positionInState, taskId){
    return {
        type:SET_TASK_DONE,
        id: taskId
    }
}

export function updateTaskAction(taskUodated){
    return {
        type:UPDATE_TASK,
        task: taskUodated
    }
}

export function setTaskNotDone(positionInState, taskId){
    return {
        type:SET_TASK_NOT_DONE,
        id:taskId
    }
}

export function setFIlterAction(filterToSee){      
    return {
        type: SET_FILTER,
        filter:filterToSee
    }
}

export function setTaskUpdateAction(taskId){
    return {
        type: SET_TO_UPDATE,
        id:taskId
    }
}