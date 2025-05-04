import './App.css'
import Home from './components/Home'
import Navbar from './components/navbar'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 



const router = createBrowserRouter(
  [
    {
    path: "/",
      element:
        <div>
          <Navbar />
          <Home />
    </div>
    },
    
    {
      path: "pastes",
      element: 
        <div>
          <Navbar />
          <Paste />
      </div>
    },

    {
      path: "/pastes/:id",
      element: 
        <div>
          <Navbar />
          <ViewPaste />
      </div>

    }

  ]
)






function App() {


  return (
    <div>
      <RouterProvider router = {router}/> 
    </div> 
  )
}
// Router attribute with its value
export default App
