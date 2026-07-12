import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './Index.css'
import App from './App'

function Main(){
  return(
    <BrowserRouter>
     <App></App>
     </BrowserRouter>
   
  )
}

createRoot(document.getElementById('root')).render(<Main />)
