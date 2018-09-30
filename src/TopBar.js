import React from 'react';
const TopBar = (props) => {
return(
  <div>
  {props.todos.length > 0 && <nav className = "todo-top-bar breadcrumb has-bullet-separator">
<ul>
<li className = {props.filter === "all"? "is-active": ""}> <a onClick={()=> {
  props.changeState({filter: "all"})
}}>All</a>     </li>
<li className = {props.filter === "remaining"? "is-active": ""}><a onClick={()=> {
  props.changeState({filter: "remaining"})    
}}>Remaining</a></li>
 <li className = {props.filter === "done"? "is-active": ""}><a onClick={()=> {
  props.changeState({filter: "done"})   
}}>Done</a></li>
</ul>
</nav>}
</div>)

}



export default TopBar;