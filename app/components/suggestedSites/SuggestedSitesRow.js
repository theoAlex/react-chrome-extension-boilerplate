import React, { Component } from 'react'
import styled from 'styled-components'
import SuggestedSite from './SuggestedSite'
import { SuggestedSitesContext } from './SuggestedSitesContext'

export default class SuggestedSitesRow extends Component {

  static contextType = SuggestedSitesContext

  render() {
    // console.log(this.context.getSuggestedSitesInChunks())
    // console.log(this.context)
    const { chunk, openSiteEditForm } = this.props
    const { getItemWidth } = this.context
    return (
      <StyledRow
        amountOfItems={chunk.length}
        width={getItemWidth()}
      >
        {chunk.map((site) => (
          <SuggestedSite
            openSiteEditForm={openSiteEditForm}
            key={site.thumbnailKey}
            site={site}
          />
        ))} 
      </StyledRow>
    )
  }
}

const StyledRow = styled.div`
  display: grid;
  margin: 0 auto; ${'' /* can be switched out with the posotion absolute and relative trick to center somehting */}
  grid-template-columns: ${props => props.amountOfItems ? `repeat(${props.amountOfItems}, ${props.width}px)` : '0' };
  left: ${props => props.amountOfItems ? (1070 - (props.amountOfItems * props.width) - ((props.amountOfItems - 1) * 20)) / 2 + 'px': '0'};
  grid-column-gap: 20px;
`
