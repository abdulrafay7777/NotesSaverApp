import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveFromPaste } from '../redux/pasteslice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);  //make paste data available

  const [searchTerm, setSearchTerm] = useState(''); //search tracking

  const dispatch = useDispatch();
  


  // Filter items based on search term
  const filteredItems = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  function handleDelete(pasteId) {
    dispatch(RemoveFromPaste(pasteId))
  }




  return (
    <div>
      <input
        type="search"
        placeholder='Enter search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      <div className='flex flex-col gap-5'>
        {
          filteredItems.length > 0 && filteredItems.map(
            (paste) => {
              return (
                <div className='border' key={paste?._id}>
                  <div>
                    {paste.title}
                  </div>

                  <div>
                    {paste.content}
                  </div>

                  <div className='flex flex-row gap-4'>

                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                      Edit
                      </a>
                    </button>



                    <Link to="ViewPaste">
                      <button >
                        View
                      </button>
                    </Link>


                    <button onClick={() => handleDelete(paste?._id)}>
                      delete
                    </button>
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
                          navigator.share({
                            title: paste.title,
                            text: paste.content,
                            url: window.location.href,
                          })
                            .then(() => toast.success('Shared successfully!'))
                            .catch((error) => toast.error('Sharing failed.'));
                        } else {
                          toast.error('Web Share API not supported in this browser.');
                        }
                      }}
                    >
                      Share
                    </button>


                    {/* //Date */}
                    <div>
                      {paste.createdAt}
                    </div>

                  </div>


                </div>
              )
            }
          )
        }



      </div>



    </div>
  )
}

export default Paste
