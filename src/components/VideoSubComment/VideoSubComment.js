import React, { useState } from 'react'
import { SUB_COMMENT_LIKE, SUB_COMMENT_REMOVE } from '../../action';

export default function VideoSubComment({ subComment, dispatch }) {
    const [heartColor, setHeartColor] = useState('');
    const [heartLiked, setHeartLiked] = useState(false);

    const handleLike = () => {
        if (heartLiked) {
            setHeartLiked(false);
            setHeartColor('black');
        } else {
            setHeartLiked(true);
            setHeartColor('red');
        }
        dispatch({ type: SUB_COMMENT_LIKE, subCommentId: subComment.id });
    };

    const remove = () => {
        dispatch({ type: SUB_COMMENT_REMOVE, subCommentRemoveId: subComment.id });
    };
    return (
        <div className="subcomment">
            <p>{subComment.name}</p>
            <p>{subComment.content}</p>
            <button onClick={handleLike} className={heartColor}>{subComment.likes}</button>
            <button onClick={remove}>x</button>
        </div>
    )
}
