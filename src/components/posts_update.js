import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePost, fetchPost } from '../actions';

class PostsUpdate extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-danger">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values, id) {
    this.props.updatePost((values, id), () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
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
        </div>

        <div className="container">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Title for Post"
              name="title"
              component={this.renderField}
            />
            <Field
              label="Categories"
              name="categories"
              component={this.renderField}
            />
            <Field
              label="Post Content"
              name="content"
              component={this.renderField}
            />
            <button type="submit" className="btn btn-info">
              Submit
            </button>
            <Link to="/" className="btn btn-danger">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default reduxForm({
  validate,
  form: 'PostsUpdateForm'
})(connect(mapStateToProps, { updatePost, fetchPost })(PostsUpdate));
