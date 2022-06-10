import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './AddNewItem.module.scss'
const cx = classNames.bind(styles)

function Component(props, ref) {
    const { event, cardContent, columnName, type, placeholder, columnId } =
        props
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
        },
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
                e.target === inputRef.current ||
                e.target === addItemRef.current
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
                'add-column': props.type === 'column',
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
                onClick={() => event.onAddItem(columnId)}
            >
                {type === 'card' ? 'thêm thẻ' : 'Thêm danh sách'}
            </button>
            <button className={cx('close')} onClick={close}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}

const AddNewItem = forwardRef(Component)
AddNewItem.propTypes = {
    event: PropTypes.shape({
        onClose: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onAddItem: PropTypes.func.isRequired,
    }),
    cardContent: PropTypes.string,
    columnName: PropTypes.string,
    placeholder: PropTypes.string,
    columnId: PropTypes.string,
    type: PropTypes.oneOf(['column', 'card']),
}

export default React.memo(AddNewItem)
