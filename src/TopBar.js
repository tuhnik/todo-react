import React from 'react';
const TopBar = (props) => {
return(
    <React.Fragment>
        {props.todos.length > 0 && <nav className = "todo-top-bar breadcrumb has-bullet-separator">
            <ul> {["all", "remaining", "done"].map(el=>{
                return <li className = {props.filter === el? "is-active": ""}> <a onClick={()=> {
                    props.changeState({filter: el})
                    }}>{el}</a></li>
            })}          
            </ul>
        </nav>}
    </React.Fragment>)
}

export default TopBar;