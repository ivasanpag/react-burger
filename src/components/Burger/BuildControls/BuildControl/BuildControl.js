import React from 'react';
import styles from './BuildControl.module.css';
import Button from '@material-ui/core/Button';

export const BuildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <p>{props.label}</p>
            <Button onClick={props.addIng} variant="contained" color="primary">Add</Button>
            <Button onClick={props.removeIng} disabled={props.disabledIng}  variant="contained" color="primary">Remove</Button>
        </div>
    )
}

