import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddtoPaste, UpdateToPaste } from '../redux/PasteSlice';
import { useEffect } from 'react';


const Home = () => {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState(''); // For text area content
    const [searchParam, setSearchParam] = useSearchParams();
    const pasteId = searchParam.get("pasteId")
    const allPastes = useSelector((state) => state.paste.pastes);

    const dispatch = useDispatch();


    function createPaste() {
        const paste = {
          title,
          content: value,
          _id: pasteId || Date.now().toString(36),
          createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            //update created paste
            dispatch(UpdateToPaste(paste))
        }

        else {
            //create new paste
            dispatch(AddtoPaste(paste))
        }
            
        //for clear title, textarea, id i.e. cleaning
        setTitle('')
        setValue('')
        setSearchParam({})

    }


    useEffect(() => {
        if (pasteId) {
            const pastes = allPastes.find((p) => p._id === pasteId);
            setTitle(pastes.title);
            setValue(pastes.content);
        }

    }, [pasteId] )

    return (
        <div>
            <input
                type="text"
                placeholder='Enter Title...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={createPaste}>
                <div>
                    {pasteId ? "Update my paste" : "Create my Paste" }
                </div>
            </button>

            <div>
                <textarea
                    value={value}
                    placeholder='Enter Notes Here...'
                    rows={10}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Home
