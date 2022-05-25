import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import style from './AppNav.module.scss'

function AppNav() {
    return (
        <div className={classNames(style.appNav)}>
            <div className={classNames(style.logo)}></div>
            <div className={classNames(style.addBoard)}>
                <FontAwesomeIcon
                    className={classNames(style.icon)}
                    icon={faPlus}
                />
            </div>
        </div>
    )
}

export default AppNav
