import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {

  const {Id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._Id === Id)[0];


  return (
    <div>
      <input
        type="text"
        placeholder='Enter Title...'
        value={paste.title}
        disabled  //diable so cannot change
        onChange={(e) => setTitle(e.target.value)}
      />

      

      <div>
        <textarea
          value={paste.content}
          placeholder='Enter Notes Here...'
          disabled
          rows={10}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ViewPaste

//same copied from Home.jsx