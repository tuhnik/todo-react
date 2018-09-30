import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(){
    super()
    this.state = {
      filter: "all",
      newTodo: "",
      todos: []
    }
  }
  componentDidMount() {
    let todos = localStorage.todos || []
    if(todos) todos = JSON.parse(todos)
    this.setState({todos})
 }
  formSubmitted(evt){
    evt.preventDefault()
    this.setState({newTodo: "", todos: [...this.state.todos, {title: this.state.newTodo, done: false}]}, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    })
  }
  inputChanged(evt){
    this.setState({newTodo: evt.target.value})
  }
  toggleDone(evt, i){
    let todos = [...this.state.todos]
    this.filterTodos(this.state.filter)[i].done = evt.target.checked
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
  clearCompleted(){
    let todos = [...this.state.todos]
    todos = todos.filter(todo => !todo.done)
    this.setState({todos}, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    })
  }

  filterTodos(filter){
    if(filter === "all") {
      return this.state.todos
    }
    if(filter === "remaining") {
      return this.state.todos.filter(el => !el.done)
    }

    if(filter === "done"){
      return this.state.todos.filter(el => el.done)
    }
  }


//   <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
//   <ul>
//     <li><a href="#">Bulma</a></li>
//     <li><a href="#">Documentation</a></li>
//     <li><a href="#">Components</a></li>
//     <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
//   </ul>
// </nav>


  render() {
    return (
      <div className="App container">
      <h2 className = "title is-2"><span role="img" aria-label="logo">📝</span> todo in react</h2>
         <form onSubmit={this.formSubmitted.bind(this)}>
           <input className = "input" onChange={this.inputChanged.bind(this)}type = "text" placeholder= "What next?" value = {this.state.newTodo}></input>
         </form>
         {this.state.todos.length > 0 && <nav className = "todo-top-bar breadcrumb has-bullet-separator">
         <ul>
         <li className = {this.state.filter === "all"? "is-active": ""}> <a onClick={()=> {
           this.setState({filter: "all"})
         }}>All</a>     </li>
         <li className = {this.state.filter === "remaining"? "is-active": ""}><a onClick={()=> {
           this.setState({filter: "remaining"})    
         }}>Remaining</a></li>
          <li className = {this.state.filter === "done"? "is-active": ""}><a onClick={()=> {
           this.setState({filter: "done"})   
         }}>Done</a></li>
         </ul>
         </nav>}
         <div className = "todo-list">
         {this.filterTodos(this.state.filter).map((el, i)=>{
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