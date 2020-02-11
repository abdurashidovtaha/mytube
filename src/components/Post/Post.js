import React from 'react'
import PostVideo from '../PostVideo/PostVideo'

export default function Post({ data, dispatch }) {
    return (
        <li className="videos-post">
            <PostVideo
                data={data}
                dispatch={dispatch}
            />
        </li>
    )
}
