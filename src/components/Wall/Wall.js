import React, { useState, useReducer } from 'react'
import PostAddVidForm from '../PostAddVidForm/PostAddVidForm.js'
import Post from '../Post/Post.js';
import { ACTION_LIKE, ACTION_REMOVE, ACTION_ADD, MAIN_COMMENT_LIKE, SUB_COMMENT_LIKE, MAIN_COMMENT_REMOVE, SUB_COMMENT_REMOVE, MAIN_COMMENT_ADD, ADD_VIDEO } from '../../action.js';

let nextPostVideoId = 1;
let nextMainCommentId = 1;
let nextSubCommentId = 1;

const initialData = [
    {
        id: nextPostVideoId++,
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        videoName: 'byGoogle',
        likes: 7,
        isLiked: false,
        comments: []
    }
];

function commentLike(comments, id) {
    return comments.map(o => {
        if (o.id !== id) {
            return o
        }
        if (o.isLiked) {
            return { ...o, likes: o.likes - 1, isLiked: false };
        }
        return { ...o, likes: o.likes + 1, isLiked: true };
    })
};

function subCommentLike(mainComments, id) {
    return mainComments.map(
        p => ({ ...p, comments: commentLike(p.comments, id) })
    )
};

function remove(data, id) {
    return data.filter(o => o.id !== id);
};

function subCommentRemove(mainComments, id) {
    return mainComments.map(
        p => ({ ...p, comments: remove(p.comments, id) })
    )
};

function addComment(data, message) {
    return [{ id: nextMainCommentId++, name: 'Taha', content: message, likes: 0, isLiked: false, comments: [] }, ...data]
}

function addSubComment(data, id, message) {
    return data.map(
        p =>
            ({
                ...p, comments: p.id !== id ? p.comments : [...p.comments, {
                    id: nextSubCommentId++, name: 'Bakha', content: message, likes: 0, isLiked: false
                }]
            })
    )
}

function reducer(data, action) {
    switch (action.type) {
        case ACTION_LIKE:
            const { likePostId } = action;
            return commentLike(data, likePostId);
        case MAIN_COMMENT_LIKE:
            const { mainCommentId } = action;
            return data.map(
                o => ({ ...o, comments: commentLike(o.comments, mainCommentId) })
            );
        case SUB_COMMENT_LIKE:
            const { subCommentId } = action;
            return data.map(
                o => ({ ...o, comments: subCommentLike(o.comments, subCommentId) })
            );
        case ACTION_REMOVE:
            const { removePostId } = action;
            return remove(data, removePostId);
        case MAIN_COMMENT_REMOVE:
            const { mainCommentRemoveId } = action;
            return data.map(
                o => ({ ...o, comments: remove(o.comments, mainCommentRemoveId) })
            );
        case SUB_COMMENT_REMOVE:
            const { subCommentRemoveId } = action;
            return data.map(
                o => ({ ...o, comments: subCommentRemove(o.comments, subCommentRemoveId) })
            );
        case ACTION_ADD:
            const { addPostId } = action;
            const { message } = action;
            return data.map(
                o => ({
                    ...o,
                    comments: o.id !== addPostId ? o.comments : addComment(o.comments, message)
                })
            );
        case MAIN_COMMENT_ADD:
            const { mainCommentAddId } = action;
            const { mainMessage } = action;
            return data.map(
                o => ({
                    ...o,
                    comments: addSubComment(o.comments, mainCommentAddId, mainMessage)
                })
            );
        case ADD_VIDEO:
            const { videoLink } = action;
            const { videoName } = action;
            return [...data, { id: nextPostVideoId++, videoUrl: videoLink, videoName: videoName, likes: 0, isLiked: false, comments: [] }];
        default:
            return data;
    }
}

export default function Wall() {
    const [data, dispatch] = useReducer(reducer, initialData);

    const myTubeIcon = 'https://cdn.worldvectorlogo.com/logos/youtube-icon.svg';

    return (
        <div className="mainBlock">
            <header>
                <figure>
                    <img src={myTubeIcon} alt="" className="myTubeIcon" />
                </figure>
                <div className="postAddForm">
                    <PostAddVidForm dispatch={dispatch} />
                </div>
            </header>
            <main>
                <h2>Все видео</h2>
                <article>
                    <ul>
                        {
                            data.map(o => <Post
                                data={o}
                                dispatch={dispatch}
                            />)
                        }
                    </ul>
                </article>
            </main>
        </div>
    )
}
