import React from 'react';
const TodoList = (props) => {
return(
    <React.Fragment>
    <form onSubmit={props.formSubmitted}>
          <input className="input" onChange={props.inputChanged} type="text" placeholder={props.placeholder} value={props.newTodo} />
    </form>
    </React.Fragment>)
}

export default TodoList;