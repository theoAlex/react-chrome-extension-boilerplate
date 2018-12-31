import React, { Component } from 'react';
import Background from '../components/Background'
import Search from '../components/Search'
import SuggestedSitesWrapper from '../components/SuggestedSitesWrapper'
import RandomContent from '../components/RandomContent'

class App extends Component {

  render() {
    const { searchData, searchActions } = this.props;

    return (
      <Background>
        <RandomContent/>
        <Search actions={searchActions} searchData={searchData}/>
        <SuggestedSitesWrapper/>
      </Background>
    );
  }
}

export default App;
