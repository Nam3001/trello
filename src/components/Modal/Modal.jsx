import React from 'react'
import classNames from 'classnames/bind'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal(props) {
    const { children, onConfirm, header, content } = props
    return (
        <Popup role="dialog" trigger={children} modal nested>
            {(close) => (
                <div className={cx('modal')}>
                    <button className={cx('close')} onClick={close}>
                        &times;
                    </button>
                    <div className={cx('header')}>
                        <h1>{header}</h1>
                    </div>
                    <div className={cx('content')}>{content}</div>
                    <div className={cx('actions')}>
                        <button
                            className={cx('btn', 'confirm')}
                            onClick={() => onConfirm(close)}
                        >
                            Confirm
                        </button>
                        <button className={cx('btn', 'cancel')} onClick={close}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default Modal
