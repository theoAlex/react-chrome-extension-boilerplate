import React, { Component } from 'react'
import { SuggestedSitesContext } from './SuggestedSitesContext'

export default class SuggestedSitesProvider extends Component {

  state = {
    suggestedSites: undefined,
    isSiteEditFormVisible: false,
    editedSite: null,
    addFormTitle: '',
    addFormUrl: '',
    suggestedSitesScaleFactor: 1.05
  }

  /*
  - for every scale factor check the values for percentages of the window.innerHeight
  - observations:
    - when using values under 1 the differences in nessecary height increase
    - when using values oer 1 but below 2 the nessecay values get larger
  - THE HEIGHT HAS TO BE WHATEVER VALUE TIMES THE SCALEFACTOR EQUALS 420PX
  - (window.innerHieght / (scalefactor * 100)) * 100

  1.9: 274 -11 -144 23.003 2.068
  1.8: 285 -13 -135 21.565 2.077
  1.7: 298 -13 -122 19.489 2.077
  1.6: 311 -15 -109 17.412 2.396
  1.5: 326 -16 -94 15.016 2.2556
  1.4: 342 -16 -78 12.460 2.2556
  1.3: 358 -19 -62 9.904 3.035
  1.2: 377 -20 -43 6.869 3.195
  1.1: 397 -23 -23 3.674 
  1.0: 420 0
  0.9: 445 25 +25 3.994 
  0.8: 472 27 +52 8.307 4.313
  0.7: 503 31 +83 13.259 4.952
  0.6: 537 34 +117 18.690 5.431
  0.5: 576 39 +156 24.920 6.23
  0.4: 620 44 +200 31.949 7.028
  0.3: 672 52 +252 40.256 8.307
  0.2: 732 60 +312 49.840 9.584
  0.1: 803 71 +383 61.182 11.342
  */  

  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleMessage)
    chrome.runtime.sendMessage({ loaded: true })
  }

  handleMessage = (request, sender, sendResponse) => {
    switch(true) {
      case request.suggestedSites !== undefined:
        this.setState({ suggestedSites: request.suggestedSites })
    }
  }

  addSite = () => {
    let newArr = this.state.suggestedSites
    console.log(this.state.suggestedSites)
    let highestThumbnailKey, newThumbnailKey
    if (newArr.length !== 0) {
      highestThumbnailKey = this.state.suggestedSites[this.state.suggestedSites.length - 1].thumbnailKey.split('_')[2]
      newThumbnailKey = `thumbnail_key_${parseInt(highestThumbnailKey) + 1}`
    } else {
      newThumbnailKey = 'thumbnail_key_0'
    }
    console.log(newThumbnailKey)
    newArr.push({
      isThumbnailCached: false,
      thumbnailKey: newThumbnailKey,
      title: this.state.addFormTitle,
      url: this.state.addFormUrl
    })
    this.setState({ suggestedSites: newArr, isSiteEditFormVisible: false, addFormTitle: '', addFormUrl: '' })
    chrome.storage.sync.set({suggestedSites:newArr})
    this.closeAddForm()
  }

  getItemHeight = () => {
    if (window.innerHeight >= 938) return 150
    let standardRatio = 938 / 1920
    let currentRatio = window.innerHeight / window.innerWidth
    let responsiveFactor
    if (currentRatio > standardRatio) {
      return ((window.innerWidth / 1920)) * 157
    } else {
      return ((window.innerHeight / 938)) * 157
    }
  }

  getItemWidth = () => {
    if (window.innerWidth >= 1920) return 214
    let standardRatio = 938 / 1920
    let currentRatio = window.innerHeight / window.innerWidth
    let responsiveFactor
    if (currentRatio > standardRatio) {
      return ((window.innerWidth / 1920)) * 214
    } else {
      return ((window.innerHeight / 938)) * 214
    }
  }

  openSiteEditForm = (site) => {
    console.log(site)
    if (site !== null) { // in order to check wether site is really a site object
      this.setState({ editedSite: site, addFormTitle: site.title, addFormUrl: site.url,}, () => {
        this.setState({ isSiteEditFormVisible: true })
      })
    } else {
      this.setState({ editedSite: null, isSiteEditFormVisible: true})
    }
    document.addEventListener('click', this.handleGlobalClose)
  }

  setSuggestedSites = (payload) => {
    this.setState({suggestedSites: payload.suggestedSites})
  }

  getSuggestedSitesInChunks = () => {
    let suggestedSites
    // if (this.context) {
      suggestedSites = this.state.suggestedSites // have to assign this to a spereate varable
      // console.log(suggestedSites)
      let sitesWithoutAddButton = suggestedSites.filter(item => item.thumbnailKey !== null)
      // console.log('filtered', sitesWithoutAddButton)
      sitesWithoutAddButton.push({
        isAddButton: true,
        thumbnailKey: null,
        title: null,
        url: null
      })
      // console.log('added add btn', sitesWithoutAddButton)
      
      // let addBtnIndex = suggestedSites.findIndex(item => item.thumbnailKey === null)
      // if (addBtnIndex !== suggestedSites.length - 1) {
      //   let addButton = suggestedSites.splice(addBtnIndex, 1)
      //   console.log(addButton[0])
      //   sitesWithoutAddButton = suggestedSites.filter(item => item.thumbnailKey !== null)
      //   sitesWithoutAddButton.push(addButton[0])
      //   console.log(sitesWithoutAddButton)
      // }
      let suggestedSitesInChunks = []
      let amountOfRows
      if (sitesWithoutAddButton !== undefined) {
        amountOfRows = Math.ceil(sitesWithoutAddButton.length / 5)
      }
      for (let i = 0; i < amountOfRows; i++) {
        if (i === amountOfRows - 1) {
          suggestedSitesInChunks.push(sitesWithoutAddButton.slice(i * 5))
        } else {
          suggestedSitesInChunks.push(sitesWithoutAddButton.slice(i * 5, i * 5 + 5))
        }
      }
      // console.log(suggestedSitesInChunks)
      // console.log(sitesWithoutAddButton)
      return suggestedSitesInChunks
    // }
  }

  deleteItem = () => {
    const { editedSite } = this.state
    console.log(this.state.suggestedSites.filter(item => item.thumbnailKey !== editedSite.thumbnailKey))
    this.setState({suggestedSites: 
      this.state.suggestedSites.filter(item => item.thumbnailKey !== editedSite.thumbnailKey)
    }, () => {
      console.log('delete', this.state)
      chrome.storage.sync.set({ suggestedSites: this.state.suggestedSites })
      chrome.storage.local.remove(editedSite.thumbnailKey)
    })
    this.closeAddForm()
  }

  closeAddForm = () => {
    this.setState({ isSiteEditFormVisible: false, addFormTitle: '', addFormUrl: ''})
    document.removeEventListener('click', this.handleGlobalClose)
  }

  handleGlobalClose = (e) => {
    let clickIsInsideForm = (
      e.target.getAttribute('name') === 'add-site-form' ||
      e.target.parentElement.getAttribute('name') === 'add-site-form' ||
      e.target.parentElement.parentElement.getAttribute('name') === 'add-site-form'
      )
    if (clickIsInsideForm) return
    this.closeAddForm()
  }

  saveEditedSite = (payload) => {
    const { editedSite, addFormTitle, addFormUrl } = this.state
    console.log(editedSite)
    let newArr = this.state.suggestedSites
    console.log(newArr)
    console.log(newArr.findIndex(item => item.thumbnailKey === editedSite.thumbnailKey))
    console.log(newArr.find(itemA => itemA.thumbnailKey === editedSite.thumbnailKey))
    console.log(payload)
    newArr.splice(newArr.findIndex(item => item.thumbnailKey === editedSite.thumbnailKey), 1, {
      ...newArr.find(itemA => itemA.thumbnailKey === editedSite.thumbnailKey),
      title: addFormTitle,
      url: addFormUrl
    })
    console.log(newArr)
    // console.log(newArr.findIndex(item => item.thumbnailKey = editedSite.thumbnailKey))
    // console.log(newArr.find(itemA => itemA.thumbnailKey = editedSite.thumbnailKey))
    this.setState({ suggestedSites: newArr, editedSite: undefined })
    chrome.storage.sync.set({suggestedSites: newArr})
    this.closeAddForm()
  }

  setAddFormTitle = (payload) => {
    this.setState({addFormTitle: payload.title}, () => {console.log(this.state)})
  }

  setAddFormUrl = (payload) => {
    this.setState({addFormUrl: payload.url}, () => {console.log(this.state)})
  }

  render() {
    // console.log(this.state)
    return (
      <SuggestedSitesContext.Provider value={{ // insert all methods into this object
        state: this.state,
        handleMessage: this.handleMessage,
        getSuggestedSitesInChunks: this.getSuggestedSitesInChunks,
        getItemHeight: this.getItemHeight,
        getItemWidth: this.getItemWidth,
        openSiteEditForm: this.openSiteEditForm,
        closeAddForm: this.closeAddForm,
        deleteItem: this.deleteItem,
        addSite: this.addSite,
        saveEditedSite: this.saveEditedSite,
        setAddFormTitle: this.setAddFormTitle,
        setAddFormUrl: this.setAddFormUrl,
        }}>
        {this.props.children}
      </SuggestedSitesContext.Provider>
    )
  }
}
