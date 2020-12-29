import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super()
    this.state = {
      searchInput: ''
    }



  }
    
  updateInput(input){
    this.setState({searchInput: input})
  }
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed"
                 type="text" 
                 value={this.searchInput}
                 onChange={ ( e ) => this.updateInput( e.target.value )}/>

          <SearchIcon id="Search__icon" 
                      onClick={() => this.props.searchPostFn(this.state.searchInput)}/>
        </div>
        
      </section>
    )
  }
}