import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.postId}>
          <Link to={`/posts/${post.postId}`}>{post.title}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="float-right">
          <Link className="btn btn-info" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h1>Serverless Blog</h1>
        <br />
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
