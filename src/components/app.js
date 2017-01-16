import React from 'react';
import ReactDOM from 'react-dom';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
require("style-loader!css-loader!./app.css");

const todos = [
    {
        task: 'finish todos-react app',
        isCompleted: true
    }, {
        task: 'make dinner',
        isCompleted: true
    } , {
        task: 'clean apertment',
        isCompleted: false
    } , {
        task: 'watch a movie',
        isCompleted: false
    } , {
        task: 'call mom',
        isCompleted: false
    }
]

export default class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        todos,
        isCreating: false,
        onAction: false
      }
    }

    render() {

        return (
          <div className='container'>
              <nav className='navBar'>
                <div className='dropdown-menu-icon' onClick={this.onActionClick.bind(this)}>
                  <img className='dropdown-img' src="src/static/dropdown.png" alt='menu icon'/>
                </div>
                <div>
                  <img  className='title-img' src="src/static/title.png" alt='to do list title'/>
                </div>
                <div className='create-icon' onClick={this.onCreateClick.bind(this)}>
                  <img  className='add-btn' src="src/static/addbtn.png" alt='create new to do icon'/>
                </div>
              </nav>

              <div id='a'>
                  {this.renderCreateSection()}
                  {this.renderCloseBtn()}
              </div>


              <div className='todos-list'>
                  <TodosList
                      onAction = {this.state.onAction}
                      todos = {this.state.todos}
                      createTask={this.createTask.bind(this)}
                      toggleTask={this.toggleTask.bind(this)}
                      saveTask={this.saveTask.bind(this)}
                      deleteTask={this.deleteTask.bind(this)}
                  />
              </div>

          </div>
        )
    }

    onCreateClick() {
        this.setState({ isCreating: true })
    }

    onActionClick() {
      if(this.state.onAction === false){
        this.setState({ onAction: true })
      }
      if(this.state.onAction === true){
        this.setState({ onAction: false })
      }
    }

    onCloseClick() {
        this.setState({ isCreating: false })
    }

    renderCreateSection() {
      if(this.state.isCreating){
        return (
          <CreateTodo
              todos = {this.state.todos}
              isCreating = {this.state.isCreating}
              createTask={this.createTask.bind(this)}
              onCloseClick = {this.onCloseClick.bind(this)}
          />

        )
      }
      return;
    }

    renderCloseBtn() {
      if(this.state.isCreating){
        return(
            <button onClick={this.onCloseClick.bind(this)} className='close-btn'>X</button>
        )
      }
      return;
    }

    toggleTask(task) {
      const foundTodo = _.find(this.state.todos, todo => todo.task === task);
      foundTodo.isCompleted = !foundTodo.isCompleted;
      this.setState({
        todos: this.state.todos
      });
    }

    createTask(task) {
          this.state.todos.push({
          task,
          isCompleted: false
        })

        this.setState({
           todos: this.state.todos
        });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos }); //referesh the page
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }

}
