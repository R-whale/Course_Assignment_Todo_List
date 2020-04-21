import React from 'react';
import './App.css';

import Add from './components/Add/Add';
import TodoList from './components/TodoList/TodoList';
import TodoItem from './lib/todo';
import Loading from './components/Loading/Loading';

const db = [
  {
    content: '学习React'
  },
  {
    content: '看一部电影'
  },
  {
    content: '按时喝水'
  }
]

let data = db.map(item => {
  return new TodoItem(item);
})

function App() {
  return (
    <div className="App">
      <Loading/>
      <Add/>
      <TodoList/>
    </div>
  );
}

export default App;
