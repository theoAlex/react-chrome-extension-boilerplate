import React, { Component } from 'react'
import { SearchContext } from './search/SearchContext'
import styled from 'styled-components'
import SuggestedSitesRow from './suggestedSites/SuggestedSitesRow'
import LoadingAnimation from './modules/loadingAnimation'
import { Transition } from 'react-spring'
import AddSuggestedSiteForm from './suggestedSites/AddSuggestedSiteForm'
import Modal from './modules/Modal'
import SuggestedSitesProvider from '../components/suggestedSites/SuggestedSitesProvider'
import SuggestedSitesRowsContainer from './suggestedSites/SuggestedSitesRowsContainer'
import { SuggestedSitesContext } from './suggestedSites/SuggestedSitesContext'

export default class SuggestedSitesWrapper extends Component {
  static contextType = SuggestedSitesContext

  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleMessage)
    chrome.runtime.sendMessage({ loaded: true })
  }

  handleMessage = (request, sender, sendResponse) => {
    // console.log(request)
    // console.log(this.context) 
    switch(true) {
      case request.suggestedSites !== undefined:
        this.setState({ suggestedSites: request.suggestedSites })
    }
  }

  render() {
    return (
      <SuggestedSitesProvider>
        <StyledSitesWrapper>
          <SuggestedSitesRowsContainer/>
          {/*<button style={{top: 0,position: 'fixed'}} onClick={() => { console.log(this.context);this.setState({}) }}>width: {window.innerWidth}, height: {window.innerHeight}, {typeof this.context}</button>*/}
          <AddSuggestedSiteForm/>
        </StyledSitesWrapper>
      </SuggestedSitesProvider>
    )
  }
}

const StyledSitesWrapper = styled.div`
  width: 1150px;
  position: fixed;
  left: 50%;
  bottom 0px;
`