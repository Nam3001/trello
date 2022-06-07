import React, { useState, createContext, useCallback, useEffect } from 'react'
import isEmpty from 'lodash.isempty'

import AppNav from './components/AppNav/AppNav'
import BoardNav from './components/BoardNav/BoardNav'
import Loading from './components/Loading/Loading'
import Board from './components/Board/Board'
import styles from './App.module.scss'

import { db } from './firebaseConfig'
import { ref, onValue, update, get } from 'firebase/database'

export const BoardContext = createContext()

function App() {
    const boardId = '5sPtMjsurzxxXwG8ddCFT' // just have 1 board on this app
    const boardRef = ref(db, 'boards/' + boardId)
    const [error, setError] = useState(false)

    const [boardName, setBoardName] = useState('')
    const [board, setBoard] = useState({})

    useEffect(async () => {
        try {
            const snapshot = await get(boardRef)
            setBoard(snapshot.val())
        } catch (err) {
            setError(err.message)
        }

        // update board when board child change
        onValue(boardRef, (snap) => {
            const boardData = snap.val()
            if (!boardData) return
            setBoardName(boardData.boardName)
            setBoard(boardData)
        })
    }, [])

    const handleChangeBoardName = useCallback((event) => {
        setBoardName(event.target.value)
    }, [])

    const updateBoardName = () => {
        // update boardName on database when boardName change
        if (boardName !== board.boardName) {
            const updates = {}
            updates['/boardName'] = boardName
            update(boardRef, updates)
        }
    }

    const contextValue = {
        boardName,
        handleChangeBoardName,
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
                <Board boardData={board} />
            </div>
        </BoardContext.Provider>
    )
}
export default App
