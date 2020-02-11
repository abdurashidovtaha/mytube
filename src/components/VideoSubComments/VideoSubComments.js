import React from 'react'
import VideoSubComment from '../VideoSubComment/VideoSubComment'

export default function VideoSubComments({subComments, dispatch}) {
    return (
        <div>
            <VideoSubComment 
            subComment={subComments}
            dispatch={dispatch}
            />
        </div>
    )
}
