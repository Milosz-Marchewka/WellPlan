import DesktopView from './DesktopView'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <DesktopView/>
      </BrowserRouter>
    </>
  )
}

export default App
