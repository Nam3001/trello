import React, { useState, createContext, useCallback } from 'react'
import AppNav from './components/AppNav/AppNav'
import BoardNav from './components/BoardNav/BoardNav'
import Board from './components/Board/Board'
import data from './assets/data/data'

export const BoardContext = createContext()

function App() {
    const [boardName, setBoardName] = useState(data[0].boardName)
    const [board, setBoard] = useState(data[0])

    const handleChangeBoardName = useCallback((event) => {
        setBoardName(event.target.value)
    }, [])

    const updateBoardName = () => {
        const newBoard = { ...board }
        newBoard.boardName = boardName
        console.log(newBoard)
        setBoard(newBoard)
    }

    const contextValue = {
        boardName,
        handleChangeBoardName,
        boardData: board,
        setBoardData: setBoard,
        updateBoardName
    }

    return (
        <BoardContext.Provider value={contextValue}>
            <div className="App">
                <AppNav />
                <BoardNav />
                <Board boardData={board} />
            </div>
        </BoardContext.Provider>
    )
}
export default App
