import React, { useState, createContext, useCallback, useEffect } from 'react'
import AppNav from './components/AppNav/AppNav'
import BoardNav from './components/BoardNav/BoardNav'
import Board from './components/Board/Board'
import Loading from './components/Loading/Loading'

import boardApi from './api/boardApi'
import isEmpty from 'lodash.isempty'

import styles from './App.module.scss'

export const BoardContext = createContext()

function App() {
    const [boardName, setBoardName] = useState('')
    const [error, setError] = useState(false)
    const [board, setBoard] = useState({})

    useEffect(async () => {
        try {
            const boards = (await boardApi.getAll()).data

            setBoardName(boards[0].boardName)
            setBoard(boards[0])
        } catch (error) {
            setError(error.message)
            console.error(error)
        }
    }, [])

    useEffect(() => {
        if (!isEmpty(board)) {
            boardApi.update('board1', JSON.stringify(board))
        }
    }, [board])

    const updateBoardName = useCallback(
        (boardName) => {
            const newBoard = { ...board }
            newBoard.boardName = boardName
            setBoard(newBoard)
        },
        [board]
    )

    const contextValue = {
        boardName,
        boardData: board,
        setBoardData: setBoard,
        updateBoardName,
    }

    if (error) {
        return (
            <div className={styles.error}>
                <h1>{error}</h1>
            </div>
        )
    }

    if (isEmpty(board)) {
        return <Loading />
    }

    return (
        <BoardContext.Provider value={contextValue}>
            <div className="App">
                <AppNav />
                <BoardNav />
                <Board setBoardData={setBoard} boardData={board} />
            </div>
        </BoardContext.Provider>
    )
}
export default App
