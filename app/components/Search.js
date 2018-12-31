import React, { Component } from 'react'
import SearchInput from './search/SearchInput'
import SearchEngineSelection from './search/SearchEngineSelection';
import styled from 'styled-components'
import SearchProvider from '../components/search/SearchProvider'

export class Search extends Component {

/*  constructor() {
    super()
    this.state = {
      scale: 1,
      width: 
    }
  }*/

  render() {
    // const { width, scale } = this.state
    return (
      <SearchProvider>
        <DivForCentering>
          <SearchWrapper>
            <SearchEngineSelection/>
            <SearchInput/>
          </SearchWrapper>
        </DivForCentering>
      </SearchProvider>
    )
  }
}

const DivForCentering = styled.div`
  position: fixed;
  left: 50%;
  bottom: 435px;
`

/* 
  height: 132 px
  top 760px

*/

const SearchWrapper = styled.div`
  position: relative;
  left: -50%;
  top: -50%
`

export default Search
