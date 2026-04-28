import './App.css'
import { DrawingBoard } from './components/DrawingBoard'

function App() {
  return (
    <main className="app-shell">
      <section className="drawing-card" aria-labelledby="app-title">
        <h1 id="app-title">Drawing App with Undo/Redo</h1>
        <p>
          Click anywhere on the canvas below to add points. Use the undo/redo
          buttons to navigate through your drawing history.
        </p>

        <DrawingBoard />
      </section>
    </main>
  )
}

export default App
