import React, { Component } from 'react';
import axios from 'axios';

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: this.props.comment.body,
    }
    axios.defaults.withCredentials = true;
  }

  handleInput = (e) => {
    this.setState({body: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const comment = {body: this.state.body}
    axios.put(`/projects/${this.props.project.id}/tasks/${this.props.task.id}/comments/${this.props.comment.id}`, {comment: comment})
      .then(response => {
        console.log(response)
        this.props.updateComment(response.data)
        this.setState(response.data)
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="tile">
        <form>
          <input className="commentInput" type="text" name="body" placeholder="Type your comment"
                 value={this.state.body} onChange={this.handleInput}
                 ref={this.props.bodyRef} />
          <button onClick={this.handleSubmit}>Add</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;