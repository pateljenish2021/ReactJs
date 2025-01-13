import { useState } from 'react'
import NotesKeeper from './components/NotesKeeper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NotesKeeper/>
    </>
  )
}

export default App
