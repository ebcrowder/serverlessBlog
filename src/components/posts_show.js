import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div className="jumbotron">
        <h1 className="display-4">
          <b>Title: </b>
          {post.title}
        </h1>
        <p className="lead">
          <b>Post ID:</b> {post.postId}
        </p>
        <p className="lead">
          <b>Category:</b> {post.categories}
        </p>
        <p>
          <b>Content:</b> {post.content}
        </p>

        <Link className="btn btn-info" to="/">
          Back to Index
        </Link>
        <button
          className="btn btn-danger float-left"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);