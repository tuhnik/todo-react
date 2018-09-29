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
  render() {
    return (
      <div className="App">
         <form onSubmit={this.formSubmitted.bind(this)}>
           <input onChange={this.inputChanged.bind(this)}type = "text" value = {this.state.newTodo}></input>
         </form>
         <ul> {this.state.todos.map((el, i)=>{
           return (<li key = {i}>
           <input onChange= {(evt) => this.toggleDone(evt, i)} type="checkbox"></input>
           <span style = {{"textDecoration": el.done ? "line-through": ""}}>{el.title}</span>
           <button onClick = {()=>this.removeTodo(i)}>X</button>
           </li>)
         })}
         </ul>
      </div>
    );
  }
}
export default App;