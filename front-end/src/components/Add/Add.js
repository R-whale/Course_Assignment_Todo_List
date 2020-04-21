import React from 'react';
import './Add.css';
import TodoItem from '../../lib/todo';

export default class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }
  async addItem() {
    if (!this.state.value) return;

    let todoItem = new TodoItem({
      content: this.state.value
    })
    
    window.todoListApi.showLoading();
    await fetch('http://localhost:8080/addtask', {
      body: JSON.stringify(todoItem),
      method: 'POST'
    });
    window.todoListApi.hideLoading(); 

    window.todoListApi.addItem(todoItem);
    this.setState({
      value: ''
    })
  }
  changeValue(e) {
    let value = e.target.value;
    this.setState({ value });
  }
  render() {
    return (
      <div className='add-area'>
        <h1 className='add-title'>Todo List</h1>
        <div className='add-input'>
          <input placeholder='新的待办'
            value={this.state.value}
            onChange={e => this.changeValue.bind(this)(e)}
          />
          <button onClick={this.addItem.bind(this)}>提交</button>
        </div>
      </div>
    )
  }
}