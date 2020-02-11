import React, { useState } from 'react'
import VideoSubComments from '../VideoSubComments/VideoSubComments'
import { MAIN_COMMENT_LIKE, MAIN_COMMENT_REMOVE, MAIN_COMMENT_ADD } from '../../action';

export default function VideoMainComment({ mainComment, dispatch }) {
    const [message, setMessage] = useState('');
    const [heartColor, setHeartColor] = useState('');
    const [heartLiked, setHeartLiked] = useState(false);

    const onSave = evt => {
        const message = evt.target.value;
        setMessage(message);
    };

    const handleLike = () => {
        if (heartLiked) {
            setHeartLiked(false);
            setHeartColor('black');
        } else {
            setHeartLiked(true);
            setHeartColor('red');
        }
        dispatch({ type: MAIN_COMMENT_LIKE, mainCommentId: mainComment.id });
    };

    const remove = () => {
        dispatch({ type: MAIN_COMMENT_REMOVE, mainCommentRemoveId: mainComment.id });
    };

    const addComment = evt => {
        evt.preventDefault();
        dispatch({ type: MAIN_COMMENT_ADD, mainCommentAddId: mainComment.id, mainMessage: message });
        setMessage('');
    };

    return (
        <div className="maincomment">
            <p>{mainComment.name}</p>
            <p>{mainComment.content}</p>
            <button onClick={handleLike} className={heartColor}>{mainComment.likes}</button>
            <button onClick={remove}>x</button>
            <form onSubmit={addComment}>
                <input type="text" placeholder="respond" onChange={onSave} value={message} />
                <button>respond</button>
            </form>
            {mainComment.comments.map(o => <VideoSubComments
                subComments={o}
                dispatch={dispatch}
            />)}
        </div>
    )
}
