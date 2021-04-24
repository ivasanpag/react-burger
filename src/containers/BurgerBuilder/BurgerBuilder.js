import React, { Component } from 'react';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import styles from '../../components/Burger/BuildControls/BuildControl/BuildControl.module.css';
import Button from '@material-ui/core/Button';
import axios from '../../axios-order';
import CircularProgress from '@material-ui/core/CircularProgress';
import WithErrorHandlers from '../../hoc/withErrorHandlers';

const INGREDIENTS_PRICE = {
    meat: 4,
    cheese: 1,
    bacon: 2,
    salad: 0.6
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // Seria una forma de pasar ingredientes 
    // state = {
    //     ingredients : [

    //         {name: 'bread-top', quantity:1},
    //         {name: 'meat', quantity: 1},
    //         {name: 'cheese', quantity: 2},
    //         {name: 'bacon', quantity: 1},
    //         {name: 'bread-bottom', quantity: 1},

    //     ],
    // }

    state = {
        // ingredients: {
        //     meat: 0,
        //     cheese: 0,
        //     bacon: 0,
        //     salad: 0
        // },
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false, 
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients')
        .then(response => this.setState({ingredients: response.data}))
        .catch(error => this.setState({error: true}));
    }
    

    isPurchasable = (ingredients) => {
        const isPurchasable = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0) !== 0;
        this.setState({ purchasable: isPurchasable });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const newCount = oldCount + 1;
        const newPrice = oldPrice + INGREDIENTS_PRICE[type];

        const ingredientsTmp = { ...this.state.ingredients };
        ingredientsTmp[type] = newCount;
        this.setState({ ingredients: ingredientsTmp, totalPrice: newPrice });
        this.isPurchasable(ingredientsTmp);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        if (oldCount === 0) return;

        const newCount = oldCount - 1;
        const newPrice = oldPrice - INGREDIENTS_PRICE[type];
        const ingredientsTmp = { ...this.state.ingredients };
        ingredientsTmp[type] = newCount;
        this.setState({ ingredients: ingredientsTmp, totalPrice: newPrice });
        this.isPurchasable(ingredientsTmp);


    }

    orderNowHandler = () => {
        if (!this.state.purchasable) return;

        this.setState({ purchasing: true });
    }

    clickBackdropHandler = () => {
        if (!this.state.purchasing) return;

        this.setState({ purchasing: false });
    }

    checkoutHandler = () => {
        this.setState({loading: true});

        // Para mostrar el loading
        // setTimeout(() => {
           
        // }, 5000);
        
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            user: 'ivanj.sanchez90@gmail.com'
            
        };

        axios.post('/order.json', order)
        .then(response => console.log(response))
        // .catch(error => console.log(error));   
        this.setState({ purchasing: false, loading: false});

        
    }

    render() {

        let disableIngredientsButton = { ...this.state.ingredients };
        for (let ing in disableIngredientsButton) {
            disableIngredientsButton[ing] = disableIngredientsButton[ing] <= 0; // meat: false, cheese: true..
        }

        let orderSummary = null;
        if(this.state.loading) {
            <CircularProgress />
        }

        let burger = this.state.error ? <p>Cannot load ingredients. Sorry</p> : <CircularProgress />;
        if(this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <div className={styles.BuildControl}>
                        <div>
                            <p>Total price: {this.state.totalPrice.toFixed(2)} €</p>
                        </div>
                        <BuildControls

                            addIng={this.addIngredientHandler}
                            removeIng={this.removeIngredientHandler}
                            disabledIng={disableIngredientsButton} />
                        <Button onClick={this.orderNowHandler} disabled={!this.state.purchasable} variant="contained" color="secondary">ORDER NOW</Button>
                    </div>
                </React.Fragment>
            )
           orderSummary = <OrderSummary totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}  checkout={this.checkoutHandler}/>

        }
         
        return <React.Fragment>
            <Modal show={this.state.purchasing} clickBackdrop={this.clickBackdropHandler}>
                {orderSummary}
            </Modal>

            {burger}
        </React.Fragment>
    }
}

export default WithErrorHandlers(BurgerBuilder, axios);