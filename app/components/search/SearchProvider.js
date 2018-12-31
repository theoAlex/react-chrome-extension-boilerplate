import React, { Component } from 'react'
import { SearchContext } from './SearchContext'

export default class SearchProvider extends Component {
  state = {
    searchEngine: 'google',
    searchEngineIndex: 0,
    subType: '',
    inputRef: {}
  }

  setSearchEngine = (searchEngine) => {
    this.setState({ searchEngine: searchEngine })
  }

  setSubType = (searchEngine, subType) => {
    this.setState({ searchEngine: searchEngine, subType: subType })
  }

  registerInputRef = (inputRef) => {
    this.setState({ inputRef })
  }

  render() {
    return (
      <SearchContext.Provider value={{
        state: this.state, 
        setSearchEngine: this.setSearchEngine,
        setSubType: this.setSubType,
        registerInputRef: this.registerInputRef
        }}>
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}
