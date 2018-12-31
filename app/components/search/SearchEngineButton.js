import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SearchContext } from './SearchContext'
import SvgIcon from '../modules/SvgIcon'

export class SearchEngineButton extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    if (props.engine === 'dict.cc') {
      this.state = {
        subType: 'DE <> EN',
        isDropdownVisible: false
      }
    }
    if (props.engine === 'woxikon') {
      this.state = {
        subType: 'DE synonyms',
        isDropdownVisible: false
      }
    }
  }

  static contextType = SearchContext

  handleClick = () => {
    const { engine } = this.props
    const { subType } = this.state
    const { setSearchEngine, setSubType, state } = this.context
    state.inputRef.current.focus()
    if (engine === 'dict.cc' || engine === 'woxikon') {
      setSubType(engine, subType)
    } else {
      setSearchEngine(engine)
    }
  }

  getIsActive = () => {
    const { engine } = this.props
    const { searchEngine } = this.context.state
    if (searchEngine === engine) return true
    return false
  }

  toggleDropdown = () => {
    this.setState({isDropdownVisible: true})
    document.addEventListener('click', this.handleGlobalClose)
  }

  handleGlobalClose = (e) => {
    if (e.target.getAttribute('name') === `${this.props.engine}-dropdown`) return
    this.setState({isDropdownVisible: false})
    document.removeEventListener('click', this.handleGlobalClose)
  }

  renderDropdownBtn = () => {
    if (!this.props.render) return null;
    return (
      <React.Fragment>
        <StyledDropdownButton
          onClick={this.toggleDropdown}
          active={this.getIsActive()}
        >
          <SvgIcon icon="dropdown3" width={10} height={10} fill="#444" left="3" top="3"/>
        </StyledDropdownButton>
      </React.Fragment>
      )
  }

  renderDropdown = () => {
    if (!this.props.render) return null;
    return this.state.isDropdownVisible && this.props.render({
      handleDropdownClick: this.handleDropdownClick
    })
  }

  handleDropdownClick = (e) => {
    const { engine } = this.props
    const { setSubType, state } = this.context
    state.inputRef.current.focus()
    let subType
    switch (true) {
      case e.target.getAttribute('name') !== null:
        subType = e.target.getAttribute('name')
        break
      case e.target.parentElement.getAttribute('name') !== null:
        subType = e.target.parentElement.getAttribute('name')
        break
      case e.target.parentElement.parentElement.getAttribute('name') !== null:
      subType = e.target.parentElement.parentElement.getAttribute('name')
    }
    this.setState({ subType })
    setSubType(engine, subType)
  }

  renderEngineIcon = () => {
    const { engine } = this.props
    const { subType } = this.state
    switch(engine) {
      case 'google':
        return <img src="./icons/google.png" style={{ height: '15px', width: '15px', margin: '7px 10px 0 7px' }} />
      case 'dict.cc':
        return <img src="./icons/dict.cc.png" style={{ height: '18px', width: '19px', margin: '6px 8px 0 8px' }} />
      case 'youtube':
        return <img src="./icons/youtube.png" style={{ height: '13px', width: '18px', margin: '9px 11px 0px 11px' }} />
      case 'woxikon':
        return <img src="./icons/woxikon.png" style={{ height: '16px', width: '16px', margin: '7px 10px 0 10px' }} />
    }
  }

  render() {
    const { isDropdownVisible } = this.state
    return (
      <EngineButtonWrapper>
        <EngineButtonContainer
          active={this.getIsActive()}
          isDropdownVisible={isDropdownVisible}
        >
          <StyledSearchEngineButton
            onClick={this.handleClick}
            active={this.getIsActive()}
            hasDropdown={this.props.render}
          >
            {this.renderEngineIcon()}
          </StyledSearchEngineButton>
          {this.renderDropdownBtn()}
        </EngineButtonContainer>
        {this.renderDropdown()}
      </EngineButtonWrapper>
    )
  }
}

const StyledSearchEngineButton = styled.div`
  width: auto;
  overflow: hidden;
  cursor: pointer;
`

const StyledDropdownButton = styled.div`
  cursor: pointer;
  overflow: hidden;
  width: 22px;
`

const EngineButtonContainer = styled.div`
  display: flex;
  background: ${props => props.isDropdownVisible ? '#e2e8f3' : props.active ? 'white' : '#b5b9bf' };
  transition: 0.1s;
  :hover {
    background: ${props => props.isDropdownVisible ? '#e2e8f3' : props.active ? 'white' : '#e2e8f3' };
  }
  height: 100%;
`

const EngineButtonWrapper = styled.div`
  :first-of-type {
    border-left: 1px solid #ccc;
  }
`
export default SearchEngineButton
