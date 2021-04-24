import React from 'react'
// import { BuildControls } from './BuildControls/BuildControls';
import styles from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

export const Burger = (props) => {
    // Usando una estructura de array de objetos con nombre-cantidad
    // let ingredients = props.ingredients.map( (ingredient, index) => {
    //     if(ingredient.quantity > 0)
    //         return <BurgerIngredients key={index} type={ingredient.name} />
    //     else
    //         return null;
    // });

    // Object.keys devuelve un array de los ingredientes, sin su cantidad

    
    let ingredients = Object.keys(props.ingredients)
    .map((igKey) => {
        // Con map iteramos por cada uno de los ingredientes y con 
        // [...Array(props.ingredients[igKey])].map((_, i) obtenemos un array dependiendo del length del objeto
        // para devolver tantos BurgerIngredients como cantidad tiene ese ingrediente
        return  [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredients type={igKey} key={igKey+i} />
        })
    })
    // Queremos obtener el length para saber si esta vacia la hamburguesa y darle al usuario feedback para que empiece
    // a crear su hamburguesa
    // Con reduce el array de arrays que teniamos, lo vamos a reducir en un solo array con cada uno de los objetos
    // BurgerIngredients que hemos creado
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);


    if(ingredients.length === 0) {
        ingredients = <p>Add some ingredients!!</p>    
    }


    return (
        <div className={styles.Burger}>
            <BurgerIngredients type='bread-top' />
            {ingredients}
            <BurgerIngredients type='bread-bottom' />
           
        </div>
    )
}

export default Burger;