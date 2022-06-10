import React from 'react'
import classNames from 'classnames'
import styles from './Loading.module.scss'
import svg from '../../assets/svg/loading.svg'

function Loading() {
    return (
        <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.nav)}>
                <div className={classNames(styles.logo)}></div>
            </div>
            <div className={classNames(styles.loading)}>
                <img src={svg} alt="Loading..." />
            </div>
        </div>
    )
}

export default React.memo(Loading)
