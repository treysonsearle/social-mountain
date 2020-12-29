import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPost = this.searchPost.bind(this);
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      this.setState({ posts: results.data });
    });
    
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( results => {
      this.setState({ posts: results.data });
    });
  
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      this.setState({ posts: results.data });
    });

  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data });
      console.log(results.data)
    });
  }
  searchPost(text) {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      console.log(results.data)
      let array = results.data.filter(e =>   {
        console.log(e.text)
        console.log(text)
        return encodeURI(e.text).includes(encodeURI(text)) } );
      console.log(array)
      this.setState({posts: array})
    });
  }
  



  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostFn = {this.searchPost}/>

        <section className="App__content">

          <Compose  createPostFn={ this.createPost }/>
          {posts.map( post => (
            <Post key={ post.id }
                  id={ post.id }
                  text={ post.text }
                  date={ post.date }
                  updatePostFn={ this.updatePost }
                  deletePostFn={ this.deletePost }
                 
                  />
          ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
