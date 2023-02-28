import React, { useState, useRef } from "react";
import initialData from "../Config/Datas";

function Tasks(){
    const [datas, setDatas] = useState(initialData)
    const [dragging, setDragging] = useState(false)
    const dragTask = useRef()
    const dragNode = useRef()

    const handleDragStart = (e,params) =>{
        dragTask.current= params
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(()=>{
            setDragging(true)
        },0)
    }

    const handleDragEnter = (e,params) => {
        const currentTask = dragTask.current
        if(e.target !== dragNode.current){
            setDatas(oldDatas => {
                let newDatas = JSON.parse(JSON.stringify(oldDatas))
                newDatas[params.columnI].items.splice(params.taskI,0,newDatas[currentTask.columnI].items.splice(currentTask.taskI,1)[0])
                dragTask.current = params
                return newDatas
            })
        }
    }

    const handleDragEnd = () => {
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragTask.current= null
        dragNode.current = null
    }

    const getStyles= (params) =>{
        const currentTask = dragTask.current
        if(currentTask.columnI === params.columnI && currentTask.taskI === params.taskI){
            return 'current task_item'
        }
        return 'task_item'
    }

    return(
        <div className="tasks">
            {datas.map((column,columnI)=>(
                <div key={column.title} onDragEnter={dragging && !column.items.length?(e)=>{handleDragEnter(e,{columnI,taskI:0})}:null} className="tasks_column">
                    <h2>{column.title}</h2>
                    {column.items.map((task,taskI)=>(
                    <div draggable 
                    key ={task}
                    className ={dragging?getStyles({columnI,taskI}):"task_item"}
                    onDragStart={(e)=>handleDragStart(e,{columnI,taskI})} 
                    onDragEnter={dragging?(e)=>{handleDragEnter(e,{columnI,taskI})}:null}>
                        {task}
                    </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Tasks