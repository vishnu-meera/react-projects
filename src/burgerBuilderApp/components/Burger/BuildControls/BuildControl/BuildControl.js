import React from 'react';
import classes from './BuildControl.css';

const buildcontrol = (props)=>{
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
                className={classes.Less} 
                onClick={props.addIngredient}>
                More
            </button>
            <button 
                className={classes.More} 
                onClick={props.removeIngredient}
                disabled={props.disabled}>
                Less
            </button>
        </div>
    );
}

export default buildcontrol;