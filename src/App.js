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
  render() {
    return (
      <div className="App">
         <form onSubmit={this.formSubmitted.bind(this)}>
           <input onChange={this.inputChanged.bind(this)}type = "text" value = {this.state.newTodo}></input>
         </form>
         <ul> {this.state.todos.map((el, i)=>{
           return <li key = {i}>{el.title}</li>
         })}
         </ul>
      </div>
    );
  }
}
export default App;