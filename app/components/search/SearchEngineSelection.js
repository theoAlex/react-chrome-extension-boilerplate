import React, { Component } from 'react'
import styled from 'styled-components'
import SearchEngineButton from './SearchEngineButton'
import DictDropdown from './DictDropdown'
import WoxikonDropdown from './WoxikonDropdown'

export class SearchEngineSelection extends Component {

  render() {
    return (
      <SearchEngineSelectionBar>
        <SearchEngineButton engine="google"/>
        <SearchEngineButton engine="youtube"/>
        <SearchEngineButton engine="dict.cc"
        render={(passedProps) => (
          <DictDropdown
            {...passedProps}
          />
        )} />
        <SearchEngineButton engine="woxikon"
        render={(passedProps) => (
          <WoxikonDropdown
            {...passedProps}
          />
        )} />
      </SearchEngineSelectionBar>
    )
  }
}

const SearchEngineSelectionBar = styled.div`
  background: #b5b9bf;
  width: 150px;
  display: grid;
  grid-template-columns: 33px 41px 57px 59px;
  grid-template-rows: 30px;
  position: relative;
  top: 1px;
  }
`

//   > div: first-of - type > div: first - of - type {
//   border - left: 1px solid #ccc;
//   border - right: none;
//   ${ '' /* border-radius: 4px 0 0 0; */ }
// }
//   > div: last - of - type > div: last - of - type {
//   border - right: 1px solid #ccc;
//   border - left: none;
//   ${ '' /* border-radius: 0 4px 0 0; */ }

export default SearchEngineSelection
