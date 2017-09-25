import React from 'react';
import './style.css';
import { Panel, Button } from 'react-bootstrap';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        event.preventDefault();
        this.props.onDelete(event.target.value);
    }

    render () {
        let commentNodes = this.props.data.map(comment => {
            return (
                <div key={comment._id}>
                    <h3>Author: {comment.author}</h3>
                    <h3>Text: {comment.text}</h3>
                    <Button value={ comment._id } onClick={ this.handleDelete }>
                        DELETE
                    </Button>
                </div>
            )
        });
        // return (
        //     <Panel>
        //         {this.props.data.map(comment => {
        //             <div key={comment._id}>
        //                 <h3>Author: {comment.author}</h3>
        //                 <h3>Text: {comment.text}</h3>
        //             </div>            
        //         })}
        //     </Panel>
        // );
        return (
            <Panel>
                { commentNodes }
            </Panel>
        )
    }
}

export default CommentList;