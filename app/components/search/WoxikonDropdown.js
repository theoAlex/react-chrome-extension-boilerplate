import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class WoxikonDropdown extends Component {

  render() {
    const languages = [
      'DE synonyms',
      'EN synonyms',
    ]
    const { handleDropdownClick } = this.props
    return (
      <Dropdown
        className="woxikon-dropdown"
      >
        {languages.map(language => (
          <DropdownItem
            className="woxkion-dropdown-item"
            name={language}
            key={language}
            onClick={handleDropdownClick}
          >
            <DropdownLabel>
              {language}
            </DropdownLabel>
          </DropdownItem>
        ))
        }
      </Dropdown>
    )
  }
}

const Dropdown = styled.div.attrs(props => ({
  name: props.name || '',
}))`
  ${'' /* padding: 3px 0 0 0; */}
  overflow: hidden;
  background: white;
  position: absolute;
  top: 30px;
  left: 82px;
  cursor: pointer;
  padding: 3px 0 4px 0;
  border-left: 1px solid #ccc; 
  border-top: 1px solid #eee; 
  box-shadow: 0 14px 20px 3px rgba(0,0,0,0.12), 0 6px 10px -5px rgba(0,0,0,0.4);
`
const DropdownItem = styled.div`
  width: 100%;
  padding: 4px 8px 3px 9px;
  :first-of-type {
    padding: 4px 8px 3px 9px;
  }
  :not(:last-of-type) {
    ${'' /* border-bottom: 1px solid #eee; */}
  }
  :hover {
    background: #f1f1f1;
  }
`

const DropdownLabel = styled.div`
  font-family: SegoeUI;
  font-size: 0.95em;
  line-height: 1.8em;
  color: #000000e9;
`
