import React from 'react'
import style from './App.module.scss'
import classNames from 'classnames'

function App() {
    return (
        <div className="App">
            <div className={classNames(style.app)}></div>
        </div>
    )
}
export default App
