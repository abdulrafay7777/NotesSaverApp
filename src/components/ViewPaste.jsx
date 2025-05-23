import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ViewPaste.css'

const ViewPaste = () => {

  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <div className='view-title'>Paste not found or may have been deleted.</div>;
  }


  return (
    <div className='view-title'>
      <input 
        type="text"
        placeholder='Enter Title...'
        value={paste.title}
        disabled  //diable so cannot change
        onChange={(e) => setTitle(e.target.value)}
      />



      <div >
        <textarea className='txt-area' 
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