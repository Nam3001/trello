import React from 'react'
import style from './Column.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Card from '../Card/Card'

function Column({ className, children }) {
    return (
        <div className={className}>
            <div className={style.column}>
                <div className={style.header}>
                    <textarea>column1</textarea>
                </div>
                <div className={style.body}>
                    {children}
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                    <Card>card1</Card>
                </div>
                <div className={style.footer}>
                    <div className={style.footerInner}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Thêm thẻ</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Column
