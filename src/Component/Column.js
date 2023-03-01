import React from "react";
import Task from "./Task";

function Column({column, columnI, dragging, getStyles, handleDragStart, handleDragEnter}){
    return(
        <div key={column.title} onDragEnter={dragging && !column.items.length?(e)=>{handleDragEnter(e,{columnI,taskI:0})}:null} className="tasks_column">
                    <h2>{column.title}</h2>
                    {column.items.map((task,taskI)=>(
                        <Task 
                            key={taskI} 
                            task={task} 
                            taskI={taskI}  
                            dragging={dragging}
                            columnI={columnI}
                            getStyles={getStyles} 
                            handleDragStart={handleDragStart}
                            handleDragEnter={handleDragEnter}
                        />
                    ))}
        </div>
    )
}

export default Column