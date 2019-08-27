import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},

];

const buildcontrols = (props)=>{

    let controlsTemplate = controls.map((control)=>(
        <BuildControl 
            key={control.label} 
            label={control.label} 
            addIngredient={()=>props.addIngredient(control.type)}
            removeIngredient={()=>props.removeIngredient(control.type)}
            disabled = {props.disabled[control.type]}/>
    ))

    return (
        <div className={classes.BuildControls}>
            <p>Current Price :{props.price}$</p>
            {controlsTemplate}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchaseble}
                onClick={props.purchased}>
                Order Now
            </button>
        </div>);
}

export default buildcontrols;