import React, { Component } from 'react'
import styled from 'styled-components'
import Modal from '../modules/Modal'
import { SuggestedSitesContext } from './SuggestedSitesContext'

export default class AddSuggestedSiteForm extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      url: '',
      isEditedSiteSet: false
    }
    this.titleInputRef = React.createRef()
  }

  componentDidUpdate() {
    if (this.context.state.isSiteEditFormVisible) this.titleInputRef.current.focus()
  }

  static contextType = SuggestedSitesContext

  handleKeyDown = (e) => {
    if(e.which === 13) {
      this.handleAddOrDone()
    }
  }

  handleChange = (e) => {
    if (e.target.name === 'title') 
      this.context.setAddFormTitle({ title: e.target.value })
    if (e.target.name === 'url') 
      this.context.setAddFormUrl({ url: e.target.value })
  }

  handleAddOrDone = () => {
    const { addSite, saveEditedSite } = this.context
    const { editedSite } = this.context.state
    if (editedSite !== null) {
      saveEditedSite()
      console.log('edit')
    } else {
      addSite()
      console.log('add')
    }
  }

  addItem = () => {
    const { title, url } = this.state
    if (title.trim() === '' || url.trim() === '') return
    this.context.addSite(this.state)
  }
  
  render() {
    let isSiteEditFormVisible, editedSite, deleteItem, closeAddForm, addFormTitle, addFormUrl

    if (Object.keys(this.context).length !== 0) {
      console.log(this.context)
      isSiteEditFormVisible = this.context.state.isSiteEditFormVisible
      editedSite = this.context.state.editedSite
      addFormTitle = this.context.state.addFormTitle
      addFormUrl = this.context.state.addFormUrl
      deleteItem = this.context.deleteItem
      closeAddForm = this.context.closeAddForm
    }



    if (isSiteEditFormVisible) {
      return (
        <Modal>
          <AddSiteFormContainer>
            <AddSiteForm name="add-site-form">
              <div>
                <OverlappingLabel>
                  Title
                </OverlappingLabel>
                <StyledInput ref={this.titleInputRef} value={addFormTitle} name="title" type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
              </div>
              <div>
                <OverlappingLabel>
                  Url
                </OverlappingLabel>
                <StyledInput value={addFormUrl} name="url" type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
              </div>
              <Buttons>
                <RemoveButton isAdding={editedSite === undefined} onClick={deleteItem}>Remove</RemoveButton>
                <CancelButton onClick={closeAddForm}>Cancel</CancelButton>
                <AddButton onClick={this.handleAddOrDone}>{editedSite !== undefined ? 'Done' : 'Add'}</AddButton>
              </Buttons>
            </AddSiteForm>
          </AddSiteFormContainer>
        </Modal>
      )
    } else {
      return null
    }
  }
}

const AddSiteFormContainer = styled.div`
  position: fixed;
  left: 50%;
`

const StyledInput = styled.input`
  width: 280px;
  height: 42px;
  border-radius: 5px;
  border: 1px solid #b5b8c1;
  outline: none;
  caret-color: #4a4a4a;
  color: rgb(32, 33, 36);
  font-family: Roboto;
  padding: 0 8px 0 12px;
  font-size: 16px;
  transition: border-color 0.2s;
  :focus {
    border-color: #005dd6ba;
  }
`

const OverlappingLabel = styled.div`
  position: absolute;
  font-size: 0.7em;
  background: white;
  margin: -7px 0 0px 10px;
  padding: 0 5px;
`

const AddSiteForm = styled.div`
  position: relative;
  left: -50%;
  bottom: 444px;
  height: 153px;
  width: 300px;
  display: grid;
  padding: 38px 40px 30px 40px;
  grid-template-rows: 38px 38px 38px;
  grid-row-gap:21px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
`

const Buttons = styled.div`
  margin-top: 7px;
  display: flex;
`
const AddButton = styled.button`
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  font-family: Roboto;
  font-weight: 500;
  height: 38px;
  padding: 0 16px;
  transition-duration: 200ms;
  transition-property: background-color, color, box-shadow, border;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgb(26, 115, 232);
  color: white;
  width: 76px;
  :hover {
    background-color: rgb(41, 123, 231);
    box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3), 0 1px 3px 1px rgba(66, 133, 244, 0.15);
  }
  :focus {
    outline: -webkit-focus-ring-color auto 5px;
  }
`
const RemoveButton = styled.button`
    border-radius: 4px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    height: 38px;
    padding: 0 16px;
    -webkit-transition-duration: 200ms;
    transition-duration: 200ms;
    -webkit-transition-property: background-color,color,box-shadow,border;
    transition-property: background-color,color,box-shadow,border;
    -webkit-transition-timing-function: cubic-bezier(0.4,0,0.2,1);
    transition-timing-function: cubic-bezier(0.4,0,0.2,1);
    background-color: ${props => props.isAdding ? '#ccc' : 'white'};
    pointer-events: ${props => props.isAdding ? 'none' : 'initial'};
    border: 1px solid rgb(218,220,224);
    color: ${props => props.isAdding ? '#999' : 'rgb(26,115,232)'};
    width: 92px;
    :hover {
      background-color: rgba(66, 133, 244, 0.04);
      border-color: rgb(210, 227, 252);
    }
    :focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
`
const CancelButton = styled.button`
    margin-left: 37px;
    border-radius: 4px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    height: 38px;
    padding: 0 16px;
    -webkit-transition-duration: 200ms;
    transition-duration: 200ms;
    -webkit-transition-property: background-color,color,box-shadow,border;
    transition-property: background-color,color,box-shadow,border;
    -webkit-transition-timing-function: cubic-bezier(0.4,0,0.2,1);
    transition-timing-function: cubic-bezier(0.4,0,0.2,1);
    background-color: white;
    border: 1px solid rgb(218,220,224);
    color: rgb(26,115,232);
    width: 87px;
    :hover {
      background-color: rgba(66, 133, 244, 0.04);
      border-color: rgb(210, 227, 252);
    }
    :focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
`
