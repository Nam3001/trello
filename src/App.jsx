import React from 'react'
import AppNav from './components/AppNav/AppNav'
import BoardNav from './components/BoardNav/BoardNav'
import Board from './components/Board/Board'

function App() {
    return (
        <div className="App">
            <AppNav />
            <BoardNav />
            <Board />
        </div>
    )
}
export default App
