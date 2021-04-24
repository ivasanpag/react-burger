
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class OrderSummary extends Component {

    componentDidUpdate(prevProps, prevState) {
        console.log('[OrderSummary.js] componentDidUpdate')
    }
    
    render() {

        const ingredients = Object.keys(this.props.ingredients).map((idKey) => {
            return <li key={idKey}>{idKey} : {this.props.ingredients[idKey]}</li>
        });

        return (
            <React.Fragment>
            <p>Order summary</p>
            <p>You have selected the following ingredients from your delicious burger:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Total price {this.props.totalPrice} €</p>
            <Button onClick={this.props.checkout} color="primary" variant="outlined">Continue</Button>
        </React.Fragment>
        )
    }
}


