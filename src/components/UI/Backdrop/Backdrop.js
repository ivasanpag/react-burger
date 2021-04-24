import React from 'react'
import styles from './Backdrop.module.css'
export const Backdrop = (props) => {
    return (
        props.show ? 
        <div className={styles.Backdrop} onClick={props.clickBackdrop}></div>
        : null
    )
}
