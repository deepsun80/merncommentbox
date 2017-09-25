import React from 'react';
import './style.css';
import { FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            text: ''
        }
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange(event) {
        this.setState({
           author: event.target.value
        });
    }
    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        let author = this.state.author.trim();
        let text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    }
    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <FormGroup 
                    controlId="formControlsTextarea"
                    value={ this.state.author }
                    onChange={ this.handleAuthorChange }>
                    <ControlLabel>Author:</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Enter your name" />
                </FormGroup>
                <FormGroup 
                    controlId="formControlsTextarea"
                    value={ this.state.text }
                    onChange={ this.handleTextChange }>
                    <ControlLabel>Text:</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Say something..." />
                </FormGroup>
                <Button type="submit">
                    SUBMIT
                </Button>
            </form>
        );
    }
}

export default CommentForm;