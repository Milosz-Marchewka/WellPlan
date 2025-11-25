import DesktopView from './DesktopView'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Background from "./assets/background/background.png";

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
