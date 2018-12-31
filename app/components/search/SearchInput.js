import React, { Component } from 'react'
import styled from 'styled-components'
import { SearchContext } from './SearchContext'
import SvgIcon from '../modules/SvgIcon'

export class SearchInput extends Component {
  static contextType = SearchContext
  
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.context.registerInputRef(this.inputRef)
  }

  handleKeyDown = (e) => {
    let searchString = this.state.value.trim()
    if (searchString === '') return;
    if (e.which === 13) {
      this.submitSearch()
    }
  }
  
  submitSearch = () => {
    // console.log(this.getSearchUrl(this.state.value))
    if (this.state.value !== '' ) {
      chrome.tabs.update({ url: this.getSearchUrl(this.state.value) })
    }
  }
  
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({ value: e.target.value })
  }
  
  getSearchUrl = (searchString) => {
    const formattedSearchString = this.getFormattedSearchString(searchString)
    const { searchEngine, subType } = this.context.state
    switch (searchEngine) {
      case 'google':
        return `https://www.google.com/search?q=${formattedSearchString}`
      case 'youtube':
        return `https://www.youtube.com/results?search_query=${formattedSearchString}`
      case 'dict.cc':
        switch (subType) {
          case 'DE <> EN':
            return `https://www.dict.cc/?s=${formattedSearchString}`
          case 'DE -> EN':
            return `https://de-en.dict.cc/?s=${formattedSearchString}`
          case 'EN -> DE':
            return `https://en-de.dict.cc/?s=${formattedSearchString}`
        }
      case 'woxikon':
        switch (subType) {
          case 'DE synonyms':
            return `https://synonyme.woxikon.de/synonyme/${formattedSearchString}.php`
          case 'EN synonyms':
            return `https://synonyme.woxikon.de/synonyme-englisch/${formattedSearchString}.php`
        }
    }
  }
    
  getFormattedSearchString = (searchString) => {
    return searchString
    .trim()
    .toLowerCase()
    .replace(/\s+/, '+')
  }
  
  getPlaceholder = () => {
    const { searchEngine, subType } = this.context.state
    switch (searchEngine) {
      case 'google':
        return 'Search Google'
      case 'dict.cc':
        return `Search dict.cc  ${subType.replace(/<>/, '↔️').replace(/->/, '→').replace(/<-/, '←')}`
      case 'youtube':
        return 'Search Youtube'
      case 'woxikon':
        switch(subType) {
          case 'DE synonyms':
            return 'Search for german synonyms'
          case 'EN synonyms':
            return 'Search for english synonyms'
        }
    }
  }
  
  render() {
    const { value } = this.state
    return (
      <React.Fragment>
      <StyledSearchInput
        ref={this.inputRef}
        type="text"
        autoFocus={true}
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        placeholder={this.getPlaceholder()}
        name="searchInput"
      />
      <SearchButton
        onClick={this.submitSearch}
      >
        <SvgIcon icon="search" width={28} height={40} fill={'grey'} />
      </SearchButton>
      <EmptyPixelFiller/>
      </React.Fragment>
    )
  }
}

const StyledSearchInput = styled.input.attrs(props => ({
  name: props.name || ''
}))`
  width: 650px;
  height: 40px;
  border: 1px solid #ccc;
  padding: 8px 44px 7px 20px;
  color: #000000d1;
  font-size: 26px;
  font-family: SegoeUI;
  box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
  transition: box-shadow 0.18s;
  ::placeholder {
    transition: color 0.18s;
  }
  :focus {
    outline: none;
    ::placeholder {
      color: #a2a2a2;
    }
  }
`

const EmptyPixelFiller = styled.div`
  height: 1px;
  width: 1px;
  position: relative;
  background: #ccc;
  bottom: 57px
`

const SearchButton = styled.div`
position: relative;
top: -47px;
left: 668px;
cursor: pointer;
`

export default SearchInput
