import React from 'react';
const BottomBar = (props) => {
return(
    <React.Fragment>
     {props.todos.length > 0 && <div>
        <hr className = "todo-line"></hr>
        <div className = "todo-bottom-bar">
        {props.todos.filter(el=>el.done).length > 0 && <a className="button is-small" onClick={props.clearDone}>Clear done</a> }
        <div className = "todo-items-remaining">{props.todos.filter(el=>!el.done).length} items remaining</div></div>    
        </div>}
    </React.Fragment>
    )
}

export default BottomBar;