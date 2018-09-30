import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(){
    super()
    this.state = {
      newTodo: "",
      todos: []
    }
  }
  formSubmitted(evt){
    evt.preventDefault()
    this.setState({newTodo: "", todos: [...this.state.todos, {title: this.state.newTodo, done: false}]})
  }
  inputChanged(evt){
    this.setState({newTodo: evt.target.value})
  }
  toggleDone(evt, i){
    let todos = [...this.state.todos]
    todos[i].done = evt.target.checked
    this.setState({todos})
  }
  removeTodo(i){
    let todos = [...this.state.todos]
    todos.splice(i, 1)
    this.setState({todos})
  }
  clearCompleted(){
    let todos = [...this.state.todos]
    todos = todos.filter(todo => !todo.done)
    this.setState({todos})
  }

 


  render() {
    return (
      <div className="App container">
      <h2 className = "title is-2">todo in react</h2>
         <form onSubmit={this.formSubmitted.bind(this)}>
           <input className = "input" onChange={this.inputChanged.bind(this)}type = "text" placeholder= "What next?" value = {this.state.newTodo}></input>
         </form>
         <div className = "todo-top-bar">
         <a className="button is-small">All</a>
         <a className="button is-small">Not done</a>
         <a className="button is-small">Done</a>
         </div>
         <div className = "todo-list">
         {this.state.todos.map((el, i)=>{
           return (<span className = "tag is-large todo-item" key = {i}>
           <div className = "todo-left">
           <input onChange= {(evt) => this.toggleDone(evt, i)} type="checkbox" checked = {el.done}></input>
           <span style = {{"textDecoration": el.done ? "line-through": ""}}>{el.title}</span>
          </div>
           <button className = "delete" onClick = {()=>this.removeTodo(i)}></button>
           </span>)
         })}
        </div>
        {this.state.todos.length > 0 && <div>
        <hr className = "todo-line"></hr>
        <div className = "todo-bottom-bar">
        {this.state.todos.filter(el=>el.done).length > 0 && <a className="button is-small" onClick={this.clearCompleted.bind(this)}>Clear completed</a> }
        
        <div className = "todo-items-remaining">{this.state.todos.filter(el=>!el.done).length} items remaining</div></div>    
        </div>}
        
      </div>
    );
  }
}
export default App;