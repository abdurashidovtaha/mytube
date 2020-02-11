import React, { useState } from 'react'
import { ADD_VIDEO } from '../../action';

export default function PostAddVidForm({ dispatch }) {
    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch({type: ADD_VIDEO, videoLink: videoLink, videoName: videoName});
        setVideoName('');
        setVideoLink('');
    };
    const handleSave = evt => {
        let videoLink = evt.target.value;
        setVideoLink(videoLink);
    };
    const handleSaveName = evt => {
        let videoName = evt.target.value;
        setVideoName(videoName);
    };

    const [videoLink, setVideoLink] = useState('');
    const [videoName, setVideoName] = useState('');

    return (
        <form action="" className="post-add-vid-form" onSubmit={handleSubmit}>
            <p   className="add-vid">Добавить видео</p>
            <div className="blockFlex">
                <div className="blockInput">
                    <input type="text" placeholder="Введите URL" onChange={handleSave} value={videoLink}/>
                    <input type="text" placeholder="Введите имя видео" onChange={handleSaveName} value={videoName} className="bottomInput"/>
                </div>
                <button className="buttonAdd">Добавить</button>
            </div>
            
        </form>
    )
}
