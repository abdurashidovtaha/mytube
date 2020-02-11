import React from 'react'
import VideoMainComment from '../VideoMainComment/VideoMainComment'

export default function VideoMainComments({ mainComments, dispatch }) {
    return (
        <div>
            <VideoMainComment
                mainComment={mainComments}
                dispatch={dispatch}
            />
        </div>
    )
}
