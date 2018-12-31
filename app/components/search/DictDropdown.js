import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export class DictDropdown extends Component {
  static propTypes = {

  }

  render() {
    const translationPairs = [
      'DE <> EN',
      'DE -> EN',
      'EN -> DE',
    ]
    const { handleDropdownClick } = this.props
    return (
      <Dropdown
        className="dict.cc-dropdown"
      >
        {translationPairs.map(pair => (
          <DropdownItem
            className="dict.cc-dropdown-item"
            name={pair}
            key={pair}
            onClick={handleDropdownClick}
          >
            <DropdownLabel>
              <div>
                {pair.slice(0, 2)}
              </div>
              <div style={{ padding: '0 0 0 3px' }}
              >
                {pair.slice(3, 5).replace(/<>/, '↔️').replace(/->/, '→').replace(/<-/, '←')}
              </div>
              <div style={{ paddingLeft: '2px' }}>
                {pair.slice(6, 8)}
              </div>
              
            </DropdownLabel>
          </DropdownItem>
        ))
        }
      </Dropdown>
    )
  }
}

const Dropdown = styled.div.attrs( props => ({
  name: props.name || '',
}))`
  ${'' /* padding: 3px 0 0 0; */}
  overflow: hidden;
  background: white;
  position: absolute;
  top: 30px;
  left: 40px;
  cursor: pointer;
  padding: 4px 0;
  border-left: 1px solid #ccc; 
  border-top: 1px solid #eee; 
  box-shadow: 0 14px 20px 3px rgba(0,0,0,0.12), 0 6px 10px -5px rgba(0,0,0,0.4);
`
const DropdownItem = styled.div`
  width: 100%;
  padding: 2px 8px 3px 9px;
  :first-of-type {
    padding: 2px 8px 3px 9px;
  }
  :not(:last-of-type) {
  }
  :hover {
    background: #f1f1f1;
  }
`

const DropdownLabel = styled.div`
  display: grid;
  grid-template-columns: 24px 24px 24px;
  font-family: SegoeUI;
`

export default DictDropdown
