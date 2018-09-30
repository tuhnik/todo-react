import React, { Component } from 'react';
import TopBar from './TopBar.js'
import './App.css';
class App extends Component {
  constructor(){
    super()
    this.state = {
      placeholder: "What next?",
      filter: "all",
      newTodo: "",
      todos: []
    }
  }

  
  componentDidMount() {
    let todos = localStorage.todos || []
    if(todos.length) todos = JSON.parse(todos)
    this.setState({todos})
    this.changePlaceholder()
 }

 changePlaceholder(){
  let placeholders = ["Better write it down before you forget it...", "Todo or not todo...", "What next?", "Save your ideas here...", "Enter next fun thing to do...", "What are you planning?", "Got some idea?"]
  this.setState({placeholder: placeholders[Math.floor(Math.random()*placeholders.length)]})
 }
 formSubmitted(evt){
    evt.preventDefault()
    if(!this.state.newTodo.trim().length) {
      return
    }
    this.setState({newTodo: "", todos: [...this.state.todos, {title: this.state.newTodo, done: false}]}, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    })
    this.changePlaceholder()
  }
  inputChanged(evt){
    this.setState({newTodo: evt.target.value})
  }
  toggleDone(evt, i){
    let todos = [...this.state.todos]
    this.filterTodos()[i].done = evt.target.checked
    this.setState({todos}, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    })

  }
  removeTodo(i){
    let todos = [...this.state.todos]
    todos.splice(i, 1)
    this.setState({todos}, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    })
   
  }
  clearDone(){
    let todos = [...this.state.todos]
    todos = todos.filter(todo => !todo.done)
    this.setState({todos}, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    })
  }
  filterTodos(){
    if(this.state.filter === "all") {
      return this.state.todos
    }
    if(this.state.filter === "remaining") {
      return this.state.todos.filter(el => !el.done)
    }

    if(this.state.filter === "done"){
      return this.state.todos.filter(el => el.done)
    }
  }
  changeState(obj){
    this.setState(obj)
  }
  render() {
    return (
      <div className="App container">
      <h1 className = "title is-2"><span role="img" aria-label="logo">📝</span> todo in react</h1>
         <form onSubmit={this.formSubmitted.bind(this)}>
           <input className = "input" onChange={this.inputChanged.bind(this)}type = "text" placeholder= {this.state.placeholder} value = {this.state.newTodo}></input>
         </form>
        <TopBar todos = {this.state.todos}
                filter = {this.state.filter}
                changeState = {this.changeState.bind(this)}
        />
         <div className = "todo-list">
         {this.filterTodos().map((el, i)=>{
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
        {this.state.todos.filter(el=>el.done).length > 0 && <a className="button is-small" onClick={this.clearDone.bind(this)}>Clear done</a> }
        
        <div className = "todo-items-remaining">{this.state.todos.filter(el=>!el.done).length} items remaining</div></div>    
        </div>}
        
      </div>
    );
  }
}
export default App;