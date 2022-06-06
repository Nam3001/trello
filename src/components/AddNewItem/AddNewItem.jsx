import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef
} from 'react'
import classNames from 'classnames/bind'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './AddNewItem.module.scss'
const cx = classNames.bind(styles)

function AddNewItem(props, ref) {
    const { event, cardContent, columnName, type, placeholder } = props
    const inputRef = useRef()
    const componentRef = useRef()
    const addItemRef = useRef()
    const Type = type === 'column' ? 'input' : 'textarea'

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current.focus()
        },
        scrollIntoView() {
            componentRef.current.scrollIntoView()
        }
    }))

    useEffect(() => {
        componentRef.current.scrollIntoView()
        inputRef.current.focus()
    }, [])

    const close = useCallback(() => {
        if (type === 'column') {
            componentRef.current.classList.add(styles.hidden)
            setTimeout(() => {
                event.onClose()
            }, 100)
        } else {
            event.onClose()
        }
    }, [event, type])

    useEffect(() => {
        const hiddenComponent = (e) => {
            if (
                e.target === componentRef.current ||
                e.target.className === cx('card-input')
                // e.target === inputRef.current alway false -> use className to check if click on inputRef
            )
                return
            close()
        }
        window.addEventListener('click', hiddenComponent)

        return () => window.removeEventListener('click', hiddenComponent)
    }, [close])

    return (
        <div
            ref={componentRef}
            className={cx({
                'add-card': props.type === 'card',
                'add-column': props.type === 'column'
            })}
        >
            <Type
                className={cx('card-input')}
                value={type === 'card' ? cardContent : columnName}
                rows="3"
                placeholder={placeholder}
                onChange={event.onInput}
                ref={inputRef}
            />
            <button
                ref={addItemRef}
                className={cx('add-button')}
                onClick={event.onAddItem}
            >
                {type === 'card' ? 'thêm thẻ' : 'Thêm danh sách'}
            </button>
            <button className={cx('close')} onClick={close}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}

export default React.memo(forwardRef(AddNewItem))
