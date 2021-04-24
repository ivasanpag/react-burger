import React from 'react'
import { BuildControl } from './BuildControl/BuildControl';

export const BuildControls = (props) => {
    const controls = [
           
            { type: 'meat', label: 'Meat' },
            { type: 'cheese', label: 'Cheese' },
            { type: 'bacon', label: 'Bacon' },
            { type: 'salad', label: 'Salad' },
        ];

    let buildControls = controls.map((el, index) => {
        return <BuildControl 
        label={el.label} 
        key={el.label} 
        addIng={() => props.addIng(el.type)} 
        removeIng={() => props.removeIng(el.type)}
        disabledIng={props.disabledIng[el.type]} />
    });

    return (
        <React.Fragment>{buildControls}</React.Fragment>
    )
}
