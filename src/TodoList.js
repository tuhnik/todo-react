import React from 'react';
const TodoList = (props) => {
return(
    <React.Fragment>
    <div className = "todo-list">
         {props.filterTodos().map((el, i)=>{
           return (
        <span className = "tag is-large todo-item" key = {i}>
            <div className = "todo-left">
                <input onChange= {(evt) => props.toggleDone(evt, i)} type="checkbox" checked = {el.done}></input>
                <span style = {{"textDecoration": el.done ? "line-through": ""}}>{el.title}</span>
            </div>
            <button className = "delete" onClick = {()=>props.removeTodo(i)}></button>
        </span>)
         })}
    </div>
    </React.Fragment>
    )
}

export default TodoList;