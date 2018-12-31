import React, { Component } from 'react'
import styled from 'styled-components'
import SvgIcon from '../modules/SvgIcon'
import { SuggestedSitesContext } from './SuggestedSitesContext'

export default class SuggestedSite extends Component {

  static contextType = SuggestedSitesContext

  constructor() {
    super()
    this.state = {
      cachedThumbnail: undefined,
      displayOptionsButton: false
    }
  }

  componentDidMount = () => {
    const { site } = this.props
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch(true) {
        case request[site.thumbnailKey] !== undefined:
          this.setState({ cachedThumbnail: request[site.thumbnailKey] })
      }
    })
  }
  
  renderThumbnail = () => {
    const { cachedThumbnail } = this.state
    const { getItemWidth, getItemHeight } = this.context
    if (cachedThumbnail !== undefined) {
      return <Thumbnail width={getItemWidth()} height={getItemHeight()} src={cachedThumbnail}/>
    }
    return <ThumbnailPlaceholder width={getItemWidth()}  height={getItemHeight()}>
    <div style={{width: '70%', margin: '0 auto'}}>
      Visit website to display a thumbnail 
    </div>
    </ThumbnailPlaceholder>
  }

  editSite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // this.setState({display: false})
    this.context.openSiteEditForm(this.props.site)
  }

  // remove all of this if else stuff when implementing adding / removeing / editing sugestedSites

  navigateToSite = () => {
    const { url } = this.props.site
    if (url.includes('porn')) {
      chrome.tabs.update({ url: 'https://developer.chrome.com/extensions/devguide' })
    } else {
      chrome.tabs.update({url: this.props.site.url})
    }
  }

  getFaviconSrc = () => {
    const { url } = this.props.site
    if (url.includes('porn')) {
      return 'https://www.google.com/s2/favicons?domain=https://developer.chrome.com/extensions/tabs#method-update'
    } else if (url.includes('https://www.youtube.com/feed/subscriptions')) {
      return 'https://www.google.com/s2/favicons?domain=https://www.youtube.com/'
    } else {
      return `https://www.google.com/s2/favicons?domain=${url}`
    }
  }

  getTitle = () => {
    const { url, title } = this.props.site
    if (url.includes('porn')) {
      return 'Chrome Devtools'
    } else {
      return title
    }
  }

  handleMouseEnter = () => {
    setTimeout(() => {
      this.setState({displayOptionsButton: true})
    }, 100)
  }

  handleMouseLeave = () => {
    this.setState({ displayOptionsButton: false })
  }

  handleAddSite = (e) => {
    console.log(e.target)
    this.context.openSiteEditForm(null)
  }

  render() {
    const { isThumbnailCached } = this.props.site
    const { getItemWidth, getItemHeight } = this.context
    if (isThumbnailCached !== undefined) {
      return (
        <SuggestedSiteWrapper
        onClick={this.navigateToSite}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        height={getItemHeight()}
        >
        <TopBar width={getItemWidth()} height={getItemHeight()}>
          <Favicon src={this.getFaviconSrc()}/>
          <Title>
            {this.getTitle()}
          </Title>
          {this.state.displayOptionsButton && 
            <OptionsButton className="options" onClick={this.editSite}>
              <SvgIcon icon="options-vertical-google" height={17} width={20} fill="#404040" />
            </OptionsButton>
          }
        </TopBar>
          {this.renderThumbnail()}
          {/* <button style={{ position: 'relative', bottom: '100px' }} onClick={this.toggleDisplay}>x</button> */}
        
        </SuggestedSiteWrapper>
      )
    } else {
      return (
        <AddSiteButton  height={getItemHeight()} onClick={this.handleAddSite}>
          <SvgIcon icon="add" height={getItemWidth() * 0.1729} width={getItemWidth() * 0.1729} left={(getItemWidth() - getItemWidth() * 0.1729) / 2} top={(getItemHeight() - getItemWidth() * 0.1729) / 2} fill={'#3e3838'}/>
        </AddSiteButton>
      )
    }
  }
}

/* 
(
      <SuggestedSiteWrapper>
        <IconContainer>
          <CircularBackground>
            <Favicon src={`https://www.google.com/s2/favicons?domain=${url}`} />
          </CircularBackground>
        </IconContainer>
      </SuggestedSiteWrapper>
    )
*/

// visit website to get a screenshot

const AddSiteButton = styled.div`
  height: ${props => props.height ? props.height + 'px' : '214px'};
  border: 1px solid #ffffff47;
  cursor: pointer;
  background: #ffffff69;
  transition: background 0.15s;
  :hover {
    background: #ffffff89;
  }
`

const OptionsButton = styled.div`
  background: transparent;
  width: 17px;
  height: 17px;
  margin: 5px 0px 0 4px;
  opacity: 0;
  transition: opacity 0.05s;
`

const TopBar = styled.div`
  width: ${props => props.width ? props.width + 'px' : '214px'};
  height: 28px;
  background: #fafafaee;
  display: grid;
  grid-template-columns: 31px auto 26px;
  transition: background 0.1s;
`

const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px 0px 0 2px;
  font-size: 0.8em;
  color: #000000d6;
`

const Thumbnail = styled.div`
  background-image: ${props => props.src ? 'url(' + props.src + ')' : 'none' };
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: ${props => props.width ? props.width + 'px' : '214px'};
  height: ${props => props.height ? props.height + 'px' : '214px'};
`

const ThumbnailPlaceholder = styled.div`
  background: #ccc;
  width: ${props => props.width ? props.width + 'px' : '214px'};
  height: ${props => props.height ? props.height - 28 + 'px' : '214px'};
  text-align: center;
  color: #000000a1;
  padding-top: ${props => props.height ? 0.24 * props.height + 'px' : '0'};
  font-size: ${props => props.width ? props.width * 0.0598 + 'px' : '0'};
  font-weight: 500;
`

const SuggestedSiteWrapper = styled.div`
  overflow: hidden;
  height: ${props => props.height ? props.height + 'px' : '214px'};
  border-radius: 3px;
  border: 1px solid #71707073;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: box-shadow 0.2s;
  :hover {
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
    border-color: #7d7d7d73;
    > div:first-of-type {
      background: #fefefe;
    }
    .options {
      opacity: 1;
    }
  }
`

const IconContainer = styled.div`
  background: transparent;
  height: 130px;
  width: 130px;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 10px;
  transition: background 0.3s;
  :hover {
    background: #ffffff33;
  }
`

const Favicon = styled.img.attrs(props => {
  src: props.src
})`
height: 16px;
width: 16px;
position: relative;
top: 6px;
left: 5px;
`
