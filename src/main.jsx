import { createRoot } from 'react-dom/client'
import './Index.css'
import App from './App'

function Main(){
  return(
    <App></App>
  )
}


createRoot(document.getElementById('root')).render(<Main />)
