import React, { useEffect } from "react";

const Task = React.memo(({task, taskI, columnI, dragging, getStyles, handleDragStart, handleDragEnter})=> {
    useEffect(() => {
      console.log('task')
    }, [task]);
    return(
        <div 
        draggable 
        key ={task}
        className ={dragging?getStyles({columnI,taskI}):"task_item"}
        onDragStart={(e)=>handleDragStart(e,{columnI,taskI})} 
        onDragEnter={dragging?(e)=>{handleDragEnter(e,{columnI,taskI})}:null}
        >
            {task}
        </div>
    )
})

export default Task