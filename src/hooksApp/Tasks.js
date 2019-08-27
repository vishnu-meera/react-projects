import React , {useState,useEffect,useReducer} from 'react'
import uuid from 'uuid/v4';

const TASK_STORAGE_KEY = 'TASK_STORAGE_KEY';

const TYPES = {
    TYPE_ADD : "TYPE_ADD",
    TYPE_COMPLETE  :"TYPE_COMPLETE"
};

const initTask =  {tasks:[],completedTasks:[]};

const taskReducer = (state,action)=>{

    switch (action.type) {
        case TYPES.TYPE_ADD:
            const {taskObj} = action;
            return {
                ...state,
                tasks:[...state.tasks,taskObj]
            };
        case TYPES.TYPE_COMPLETE:
            const {completedTask} = action;
            return {
                ...state,
                completedTasks:[...state.completedTasks,completedTask],
                tasks : state.tasks.filter(x=>x.id!==completedTask.id)
            }
        default:
            return state;
    }
};

const storeTasks = (taksMap)=>{
    localStorage.setItem(
        TASK_STORAGE_KEY,JSON.stringify(taksMap)
    );
};

const readTasks = ()=>{
    const tasksMap = JSON.parse(localStorage.getItem(TASK_STORAGE_KEY));
    return tasksMap ? tasksMap :initTask
};


const App = ()=>{
    const [task,setTask] = useState('');
    const storedTasks = readTasks();
    const [state,dispatch] = useReducer(taskReducer,storedTasks);
    const {tasks,completedTasks} = state
    
    useEffect(()=>{
        storeTasks({tasks,completedTasks});
    });

    const updateTask = e=> setTask(e.target.value);
    
    const updateTasks = ()=> {
        dispatch({type:TYPES.TYPE_ADD, taskObj :{taskText:task, id:uuid()}});
        setTask("");
    };

    const handleKeyPress = event =>{
        if(event.key === "Enter") updateTasks();
    };

    const completedTaskHandler = completedTask =>{
        dispatch({type:TYPES.TYPE_COMPLETE, completedTask});
    };

    return    (<div>
                <h1>Tasks</h1>
                <div className="form">
                    <input value={task} onChange={updateTask} onKeyPress={handleKeyPress}/>
                    <button onClick={updateTasks}>Add</button>
                </div>
                <div className="task-list">
                    {
                        tasks.map(task=><div key={task.id} onClick={()=>completedTaskHandler(task)}>{task.taskText}</div>)
                    }
                </div>
                <div className="completed-list">
                    {
                        completedTasks.map(task=><div key={task.id}>{task.taskText}</div>)
                    }
                </div>
            </div>)
};

export default App;