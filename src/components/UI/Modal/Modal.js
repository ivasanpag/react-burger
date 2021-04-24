import React, { Component } from 'react'
import { Backdrop } from '../Backdrop/Backdrop'
import styles from './Modal.module.css'

export default class Modal extends Component {
    /* No usamos PureComponent porque PureComponent comprueba todas las props y solo nos interesa show*/
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    

    render() {
        return (
            <React.Fragment>
            <Backdrop show={this.props.show} clickBackdrop={this.props.clickBackdrop}/>
            <div
                style={{ display: this.props.show ? 'block' : 'none' }}
                className={styles.Modal}>
                {this.props.children}
            </div>
        </React.Fragment>
        )}
}

