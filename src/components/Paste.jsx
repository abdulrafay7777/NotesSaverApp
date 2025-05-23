import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveFromPaste } from '../redux/pasteslice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './Paste.css';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredItems = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(RemoveFromPaste(pasteId));
  }

  return (
    <div className='searches'>
      <input
        type="search"
        placeholder='Enter search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        {filteredItems.length > 0 && filteredItems.map((paste) => {
          // Format date here
          const formattedDate = paste.createdAt
            ? format(new Date(paste.createdAt), 'MMMM d, yyyy')
            : 'No date available';

          return (
            <div key={paste?._id}>
              <div>{paste.title}</div>

              <div>{paste.content}</div>

              <div>
                <button>
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                </button>

                <Link to={`/pastes/${paste._id}`}>
                  <button>View</button>
                </Link>

                <button onClick={() => handleDelete(paste?._id)}>Delete</button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success('Copied to clipboard!');
                  }}
                >
                  Copy
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste.title,
                          text: paste.content,
                          url: window.location.href,
                        })
                        .then(() => toast.success('Shared successfully!'))
                        .catch(() => toast.error('Sharing failed.'));
                    } else {
                      toast.error('Web Share API not supported in this browser.');
                    }
                  }}
                >
                  Share
                </button>

                {/* Render the formatted date */}
                <div>{formattedDate}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Paste;
