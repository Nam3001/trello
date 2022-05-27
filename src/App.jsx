import React, { useState, createContext, useCallback } from 'react'
import AppNav from './components/AppNav/AppNav'
import BoardNav from './components/BoardNav/BoardNav'
import Board from './components/Board/Board'
import data from './assets/data/data'

export const BoardContext = createContext()

function App() {
    const [currentBoard, setCurrentBoard] = useState(data[0])
    const [boardName, setBoardName] = useState(currentBoard.boardName)

    const handleChangeBoardName = useCallback((value) => {
        setBoardName(value)
    }, [])

    const contextValue = {
        boardName,
        handleChangeBoardName,
        boardData: currentBoard
    }

    return (
        <BoardContext.Provider value={contextValue}>
            <div className="App">
                <AppNav />
                <BoardNav />
                <Board boardData={currentBoard} />
            </div>
        </BoardContext.Provider>
    )
}
export default App
