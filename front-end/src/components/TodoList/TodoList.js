import React from 'react';
import Todo from '../Todo/Todo';
import './TodoList.css';
import TodoItem from '../../lib/todo';

export default class TodoList extends React.Component {
  constructor() {
    super();
    window.todoListApi.addItem = this.addItem.bind(this);
    this.state = {
      todoList: [],
      addState: false
    }
    this.todoDomMap = {};
  }
  async loadData() {
    try {
      window.todoListApi.showLoading();
      let response = await fetch('http://localhost:8080/tasklist');
      let todoList = await response.json();
      window.todoListApi.hideLoading();
      console.log(todoList)
      if (todoList instanceof Array) {
        let oriList = this.state.todoList;
        for (let item of todoList) {
          let todoItem = new TodoItem(item);
          oriList.unshift(todoItem);
        }
        this.setState({
          todoList: oriList
        })
      }
    } catch (err) {
      console.error(err);
    }
  }
  async addItem(item) {
    await this.addAnimation();
    
    let todoList = this.state.todoList;
    todoList.unshift(item);
    this.setState({
      todoList
    })
  }
  delete(id) {
    let index = -1;
    for (let i = 0; i < this.state.todoList.length; i++) {
      let item = this.state.todoList[i];
      if (id === item.id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {      
      let todoList = this.state.todoList;
      todoList.splice(index, 1);
      this.setState({
        todoList
      })
    }
  }
  get todoDomList() {
    return this.state.todoList.map(item => {
      if (this.todoDomMap.hasOwnProperty(item.id)) {
        return this.todoDomMap[item.id];
      } else {
        let domItem = <Todo todoItem={item} onDelete={(key) => this.delete.bind(this)(key)} key={item.id}/>;
        this.todoDomMap[item.id] = domItem;
        return domItem;
      }
    })
  }
  addAnimation() {
    return new Promise(resolve => {
      this.setState({
        addState: true
      })
      setTimeout(() => {
        this.setState({
          addState: false
        })
        resolve();
      }, 300)
    })
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    let className = ['todolist'];
    if (this.state.addState) {
      className.push('todo-add-animation');
    } else {
      className.push('todo-unadd-animation');
    }

    return (
      <section className={className.join(' ')}>
        {this.todoDomList}
      </section>
    )
  }
}