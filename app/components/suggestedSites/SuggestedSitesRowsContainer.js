import React, { Component } from 'react';
import SuggestedSitesRow from './SuggestedSitesRow'
import { SuggestedSitesContext } from './SuggestedSitesContext'
import styled from 'styled-components'

export default class SuggestedSitesRowsContainer extends Component {

	static contextType = SuggestedSitesContext

	getContainerHeight = () => {
		const { suggestedSitesScaleFactor } = this.context.state
		if (suggestedSitesScaleFactor >= 1) {
			return ((window.innerHeight - 300) / (suggestedSitesScaleFactor * 100)) * 100
		} else {
			return null
		}
	}

	render() {
		if (this.context !== undefined && this.context.state.suggestedSites !== undefined){
			const { getItemHeight, getSuggestedSitesInChunks } = this.context
			const { suggestedSitesScaleFactor } = this.context.state
			return (
				<RowsContainer
					amountOfRows={getSuggestedSitesInChunks().length}
					containerHeight={this.getContainerHeight()}
					itemHeight={getItemHeight()}
					scaleFactor={suggestedSitesScaleFactor}
				>
					{getSuggestedSitesInChunks().map((chunk, i) => (
	          <SuggestedSitesRow
	            chunk={chunk}
	            key={i}
	          />
	        ))}
				</RowsContainer>
			);
		} else {
			return <div>loading</div>
		}
	}
}

/*

*/

const RowsContainer = styled.div`
	transform: ${props => props.scaleFactor ? 'scale(' + props.scaleFactor + ')': 'scale(1)'};
  padding-bottom: 60px;
  padding-top: 10px;
  height: ${props => props.containerHeight ? props.containerHeight + 'px' : 'auto'};
  width: auto;
  ${'' /* background: white; */}
  display: grid;
  grid-template-rows: ${props => props.amountOfRows ? 'repeat(' + props.amountOfRows + ',' + props.itemHeight + 'px' + ')' : '0'};
  grid-row-gap: 20px;
  position: relative;
  left: -50%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-mask-image: -webkit-gradient(linear,left 1%,left top,from(rgba(0,0,0,1)),to(rgba(0,0,0,0)));

  ::-webkit-scrollbar {
    width: 0px;
  }
`

/*
  height: ${props => props.containerHeight ? props.containerHeight + ((1 - props.scaleFactor) * props.containerHeight)  + 'px' : 'auto'};
*/