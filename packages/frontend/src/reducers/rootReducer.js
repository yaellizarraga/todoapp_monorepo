import {
    FETCH_TASKS_PENDING, 
    FETCH_TASKS_SUCCESS, 
    FETCH_TASKS_ERROR, 
    ADD_TASK, 
    DELETE_TASK, 
    SET_TASK_DONE, 
    UPDATE_TASK, 
    SET_TASK_NOT_DONE, 
    SET_FILTER, 
    SET_TO_UPDATE
} from '../actions'; 

//Initial state
const initState = {
    filter:null,
    action:'INSERT',
    pending:false,
    users:[],
    tasks:[],
    toUpdate:[],
    error:null
};

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_ACTION_INSERT':
            return {
                ...state,
                action:action.mode,
                toUpdate:[]
            }
        case 'SET_ACTION_UPDATE':
            return {
                ...state,
                action:action.mode
            }
        case SET_FILTER:
                return {
                    ...state,
                    filter:action.filter
                }
        case FETCH_TASKS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                pending: false,
                tasks: action.tasks
            }
        case FETCH_TASKS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case ADD_TASK:
            return {
                ...state,
                tasks:[...state.tasks, action.task]
            }
        case DELETE_TASK:
            let newTaks = state.tasks.filter(task => {
                return task._id !== action.id
            });
            return {
                ...state,
                tasks:newTaks
            }
        case SET_TASK_DONE:
            const index1 = state.tasks.findIndex((task)=>{
                return task._id === action.id
            });
            const task1 = Object.assign({}, state.tasks[index1]);
            task1.taskStatus = true;
            const tasksUpdated1 = Object.assign([], state.tasks);
            tasksUpdated1[index1] = task1;
        return {
            ...state,
            tasks:tasksUpdated1,
            pending:false,
        }
        case SET_TASK_NOT_DONE:
            const index2 = state.tasks.findIndex((task)=>{
                return task._id === action.id
            });
            const task2 = Object.assign({}, state.tasks[index2]);
            task2.taskStatus = false;
            const tasksUpdated2 = Object.assign([], state.tasks);
            tasksUpdated2[index2] = task2;
        return {
            ...state,
            tasks:tasksUpdated2,
            pending:false,
        }
        case UPDATE_TASK:
            const index = state.tasks.findIndex((task)=>{
                return task._id === action.task.id
            });
            const task = Object.assign({}, state.tasks[index]);
            task.title = action.task.title;
            task.description = action.task.description;
            task.date = action.task.date;
            task.status = action.task.taskStatus;
            const tasksUpdated = Object.assign([], state.tasks);
            tasksUpdated[index] = task;
        return {
            ...state,
            tasks:tasksUpdated
        }
        case SET_TO_UPDATE:
            const indexUpdate = state.tasks.findIndex((task)=>{
                return task._id === action.id
            });
            const taskToUpdate = Object.assign({}, state.tasks[indexUpdate]);
            return{
                ...state,
                toUpdate:{
                    id:taskToUpdate._id,
                    title:taskToUpdate.title,
                    description:taskToUpdate.description,
                    date:taskToUpdate.date,
                    taskStatus:taskToUpdate.taskStatus
                }
            }
        default: 
            return state;
    }
};

//Exporting specific info from the store to attach them to the components if we need it.
export const getFIlter = state => state.filter;
export const getAction = state => state.action;
export const getTasks = state => state.tasks;
export const getTasksPending = state => state.pending;
export const getTasksError = state => state.error;
export const getPending = state => state.tasks.filter(task => !task.taskStatus);
export const getComplete = state => state.tasks.filter(task => task.taskStatus);
export const taskToUpdate = state => state.toUpdate;

export default rootReducer;