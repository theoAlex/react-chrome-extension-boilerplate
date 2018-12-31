import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Background extends Component {
  constructor() {
    super()
    this.state = {
      backgroundNr: undefined,
      max: 66,
      min: 1
    }
    this.state.backgroundNr = this.getRandomInt(this.state.min, this.state.max)
  }
  
  static propTypes = {

  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  incr = () => {
    this.setState({backgroundNr: this.state.backgroundNr + 1})
  }

  decr = () => {
    this.setState({ backgroundNr: this.state.backgroundNr - 1 })
  }

  handleKeydown = (e) => {
    if (e.which === 13) {
      this.setState({backgroundNr: parseInt(e.target.value)})
    }
  }

  addItem = () => {
    chrome.storage.local.get('addedItems', items => {
      let newArr = []
      if (items.addedItems !== undefined) {
        newArr = [
          this.state.backgroundNr,
          ...items.addedItems
        ]
      } else {
        newArr = [
          this.state.backgroundNr
        ]
      }
      chrome.storage.local.set({addedItems: newArr}) 
      this.incr()
    })
  }

  download = () => {
    chrome.storage.local.get('addedItems', function (items) { // null implies all items
      // Convert object to a string.
      var result = JSON.stringify(items);

      // Save as file
      var url = 'data:application/json;base64,' + btoa(result);
      chrome.downloads.download({
        url: url,
        filename: 'addedItems.json'
      });
    });
  }

  render() {
    const { children } = this.props
    return (
      <div
        style={{
          backgroundImage: `url("./img/background1/${this.state.backgroundNr}.jpg")`,
          backgroundRepeat: 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          zIndex: 0
        }}
      >
 {/*     <div style={{
          position: 'fixed',
          top: '0',
          right: '0',
          height: '300px',
          width: '300px',
        }}>
          <input type="text" onKeyDown={this.handleKeydown}/>
          <br/>
          <div style={{background: 'white', position: 'fixed', top: 0, left: 0}}>
            {this.state.backgroundNr}
          </div>
          <br/>
          <button onClick={this.decr}>{'<<'}</button>
          <button onClick={this.addItem}>add</button>
          <button onClick={this.incr}>{'>>'}</button>
          <button onClick={this.download}>download</button>
        </div>*/}
        {children}
      </div>
    )
  }
}

export default Background
