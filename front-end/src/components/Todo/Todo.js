import React from 'react';
import './Todo.css';
import edictIcon from './edict.png';
import deleteIcon from './delete.png';
import Time from '../../lib/time';

export default class Todo extends React.Component {
  constructor({ todoItem, onDelete }) {
    super();
    this.onDelete = onDelete;
    this.state = {
      todoItem,
      edict: false,
      delete: false
    }

    this.lastValue = null;
  }
  edict() {
    this.setState({
      edict: true
    })
  }
  unEdict() {
    this.setState({
      edict: false
    })
    this.finishChange();
  }
  async delete() {
    window.todoListApi.showLoading();
    await fetch('http://localhost:8080/task/delete/' + this.state.todoItem.id, {
      method: 'DELETE'
    });
    window.todoListApi.hideLoading();

    this.setState({
      delete: true
    })

    setTimeout(() => {
      if (this.onDelete instanceof Function) {
        this.onDelete(this.state.todoItem.id);
      }
    }, 300)
  }
  changeContent(e) {
    let value = e.target.value;
    let item = this.state.todoItem;
    item.content = value;
    this.setState({
      todoItem: item
    })
  }
  async finishChange() {
    let value = this.state.todoItem.content;
    console.log(value, this.lastValue)
    if (value === this.lastValue) return;
    this.lastValue = value;
    
    window.todoListApi.showLoading();
    await fetch('http://localhost:8080/task/update/' + this.state.todoItem.id, {
      body: JSON.stringify(this.state.todoItem),
      method: 'PUT'
    });
    window.todoListApi.hideLoading();
  }
  get time() {
    return Time(this.state.todoItem.date);
  }
  render() {
    let content;
    if (this.state.edict) {
      content = <input
        ref = {(ref) => {if (ref) ref.focus()}}
        value = {this.state.todoItem.content}
        onBlur = {this.unEdict.bind(this)}
        onChange = {e => this.changeContent.bind(this)(e)}
        className = 'todo-content'
      />;
    } else {
      content = <article className='todo-content'>{this.state.todoItem.content}</article>;
    }
    return (
      <section className='todo-item' style={{
        height: this.state.delete? 0 : '60px',
        opacity: this.state.delete? 0 : 1,
        marginBottom: this.state.delete? 0 : '40px'
      }}>
        <time className='todo-time'>{this.time}</time>
        {content}
        <aside className='todo-aside'>
          <img onClick={this.edict.bind(this)} src={edictIcon}/>
          <img onClick={this.delete.bind(this)} src={deleteIcon}/>
        </aside>
      </section>
    )
  }
}