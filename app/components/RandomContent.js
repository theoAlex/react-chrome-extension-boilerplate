import React, { Component } from 'react'
import styled from 'styled-components'

export default class RandomContent extends Component {
  constructor() {
    super()
    this.state = {
      contentNr: undefined,
      max: 75,
      min: 0,
      contentButtonClicked: false
    }
    this.state.contentNr = this.getRandomInt(this.state.min, this.state.max)
    this.contentRef = React.createRef()
    this.notificationButtonRef = React.createRef()
    this.notificationBadgeRef = React.createRef()
    this.notificationIconRef = React.createRef()
  }

  static propTypes = {

  }

  componentDidMount = () => {
    setTimeout(() => {
      this.notificationBadgeRef.current.style.transform = "scale(1)"
    }, 2000)
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  incr = () => {
    this.setState({contentNr: this.state.contentNr + 1})
  }

  decr = () => {
    this.setState({ contentNr: this.state.contentNr - 1 })
  }

  handleKeydown = (e) => {
    if (e.which === 13) {
      this.setState({contentNr: parseInt(e.target.value)})
    }
  }

  addItem = () => {
    chrome.storage.local.get('addedItems', items => {
      let newArr = []
      if (items.addedItems !== undefined) {
        newArr = [
          this.state.contentNr,
          ...items.addedItems
        ]
      } else {
        newArr = [
          this.state.contentNr
        ]
      }
      chrome.storage.local.set({addedItems: newArr}) 
      this.incr()
    })
  }

  other = () => {
    chrome.storage.local.get('other', items => {
      let newArr = []
      if (items.other !== undefined) {
        newArr = [
          this.state.contentNr,
          ...items.other
        ]
      } else {
        newArr = [
          this.state.contentNr
        ]
      }
      chrome.storage.local.set({ other: newArr })
    })
    this.incr()
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

  showContent = () => {
    if (!this.state.contentButtonClicked) {
      this.setState({contentButtonClicked: true})
      setTimeout(() => {
        this.notificationIconRef.current.src = "icons/done-icon.png"
        this.notificationIconRef.current.style.bottom = "12px"
        this.notificationBadgeRef.current.style.opacity = "0"
      }, 250)
    }
    console.log(this.contentRef.current)
    this.contentRef.current.style.transform = 'translateX(-500px)'
    document.addEventListener('click', this.handleGlobalClose)
  }

  handleGlobalClose = (e) => {
    if (e.target.getAttribute('name') !== 'randomContent') {
      this.contentRef.current.style.transform = 'translateX(0)'
      document.removeEventListener('click', this.handleGlobalClose)
    }
  }

  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <NotificationButton
            onClick={this.showContent}
            ref={this.notificationButtonRef}
          >
          <NotificationBadge
            ref={this.notificationBadgeRef}
           />
          <NotificationIcon
            ref={this.notificationIconRef}
            src="icons/error-icon.png"
          />
            {/*<SvgIcon icon="animal-paw" width={} height={} />*/}
          </NotificationButton>
          <div 
          name="randomContent"
          ref={this.contentRef}
          style={{
            backgroundImage: `url("./img/funny2/${this.state.contentNr}.webp")`,
            backgroundColor: 'black',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            height: '100%',
            width: 'auto',
            zIndex: 0,
            transition: 'transform 0.2s'
          }}/>
        </ContentWrapper>
{/*        <div style={{
          position: 'fixed',
          top: '0',
          right: '0',
          height: '300px',
          width: '300px',
        }}>
          <input type="text" onKeyDown={this.handleKeydown}/>
          <br/>
          <div style={{background: 'white'}}>
            {this.state.contentNr}
          </div>
          <br/>
          <button onClick={this.decr}>{'<<'}</button>
          <button onClick={this.addItem}>add</button>
          <button onClick={this.incr}>{'>>'}</button>
          <button onClick={this.download}>download</button>
        </div>*/}
      </Wrapper>
    )
  }
}

const NotificationButton = styled.div`
  width: 60px;
  height: 50px;
  align-self: end;
  cursor: pointer;
  position: relative;
  bottom: 4px;
`

const NotificationBadge = styled.div`
  position: relative;
  left: 35px;
  transform: scale(0);
  width: 14px;
  height: 14px;
  background: red;
  border-radius: 7px;
  transition: transform 0.05s;
  :after {
    content: '1';
    font-size: 0.6em;
    color: white;
    position: relative;
    bottom: 7px;
    left: 4px;
  }
`

const NotificationIcon = styled.img`
  height: 38px;    
  position: relative;
  bottom: 9px;
`

const Content = styled.div`
  ${'' /* width: auto;
  height: auto; */}
  width: 500px;
  height: 300px;
  background-image: {props => props.src ? "url('" + props.src + "')" : 'null'};
  background-size: contain;
  display: block;
  object-fit: contain;
`

const Wrapper = styled.div`
  z-index: 1000;
  height: auto;
  width: auto;
  position: fixed;
  bottom: 0;
  right: -500px;
  
`

const ContentWrapper = styled.div`
  height: 300px;
  width: 560px;
  display: grid;
  grid-template-columns: 60px 500px;
  ${'' /* display: flex; */}
`
/*
  left: 50%;
  top: 50px;
*/