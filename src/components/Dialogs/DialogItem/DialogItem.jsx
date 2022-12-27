import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css';


const DialogItem = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <div className={s.avatar}>
                <img src='https://cs14.pikabu.ru/avatars/3984/x3984095-1602008823.png' />
                <NavLink to={path}>{props.name}</NavLink>
            </div>
        </div>

    )
}


export default DialogItem;