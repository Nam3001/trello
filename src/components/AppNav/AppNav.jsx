import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import styles from './AppNav.module.scss'

function AppNav() {
    return (
        <div className={classNames(styles.appNav)}>
            <div className={classNames(styles.logo)}></div>
            <div className={classNames(styles.addBoard, 'btn')}>
                <FontAwesomeIcon
                    className={classNames(styles.icon)}
                    icon={faPlus}
                />
            </div>
        </div>
    )
}

export default React.memo(AppNav)
