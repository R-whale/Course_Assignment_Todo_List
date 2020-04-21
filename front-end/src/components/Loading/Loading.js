import React from 'react';
import './Loading.css';

export default class Loading extends React.Component {
  constructor() {
    super();
    window.todoListApi.showLoading = this.show.bind(this);
    window.todoListApi.hideLoading = this.hide.bind(this);
    this.state = {
      show: false,
      content: ''
    }
  }
  show(content = 'loading') {
    this.setState({
      show: true,
      content
    })
  }
  hide() {
    this.setState({
      show: false,
      content: ''
    })
  }
  render() {
    if (!this.state.show) {
      return (
        <div style={{display: 'none'}}/>
      )
    } else {
      return (
        <div className='loading-bg'>
          <div className='loading-box'>
            <div className='loading-circle'></div>
          </div>
        </div>
      )
    }
  }
}