import React from 'react';
import { Well } from 'react-bootstrap';
import './style.css';
import axios from 'axios';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

// import DATA from './data';

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    loadCommentsFromServer() {
        axios.get(this.props.url)
        .then(res => {
            this.setState({ data: res.data });
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleCommentSubmit(comment) {
        axios.post(this.props.url, comment)
        .then(res => {
            this.setState({ data: res });
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleDelete(id) {
        // const commentToDelete = {author}; 
        axios.delete(`${this.props.url}/${id}`)
        .then(res => {
            console.log('Comment deleted');
            // this.setState({ data: res.data });
        })
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <Well bsSize="large" className="commentBox">
                <h2>Comments:</h2>
                <CommentList data={ this.state.data } onDelete={ this.handleDelete }/>
                <CommentForm onCommentSubmit={ this.handleCommentSubmit }/> 
            </Well>
        )
    }
}

export default CommentBox;