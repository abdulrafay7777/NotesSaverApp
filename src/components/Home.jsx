import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddtoPaste, UpdateToPaste } from '../redux/pasteslice';
import './Home.css';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParam, setSearchParam] = useSearchParams();
  const pasteId = searchParam.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

  // Function to format ISO date string to "June 1, 2025"
  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: pasteId
        ? allPastes.find((p) => p._id === pasteId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(UpdateToPaste(paste));
    } else {
      dispatch(AddtoPaste(paste));
    }

    setTitle('');
    setValue('');
    setSearchParam({});
  }

  useEffect(() => {
    if (pasteId) {
      const pastes = allPastes.find((p) => p._id === pasteId);
      if (pastes) {
        setTitle(pastes.title);
        setValue(pastes.content);
      }
    }
  }, [pasteId, allPastes]);

  const currentPaste = allPastes.find((p) => p._id === pasteId);

  return (
    <div>
      <div className="title">
        <input
          type="text"
          placeholder="Enter Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Show formatted date if pasteId exists and currentPaste is found */}
        {pasteId && currentPaste && (
          <div
            className="created-at"
            // style={{ marginTop: '8px', color: '#555', fontSize: '0.9rem' }}
          >
            Created on: {formatDate(currentPaste.createdAt)}
          </div>
        )}
      </div>

      <div>
        <textarea
          className="txt"
          value={value}
          placeholder="Enter Notes Here..."
          rows={15}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="btn">
        <button onClick={createPaste}>
          {pasteId ? 'Update my paste' : 'Create my Paste'}
        </button>
      </div>
    </div>
  );
};

export default Home;
