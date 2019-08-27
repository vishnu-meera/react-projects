import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const orderSummary = (props)=>{

    const ingredients = Object.keys(props.ingredients).map(iKey=>{
        return (
                <li key={iKey}>
                    <span style={{textTransform:'ca'}}>{iKey}</span> : {props.ingredients[iKey]}
                </li>);
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients</p>
            <ul>
                {ingredients}
            </ul>
            <p>Total price : ${props.price}</p>
            <p>Continue to Checkout...</p>
            <Button type="Danger" clicked = {props.cancelClicked}>Cancel</Button>
            <Button type="Success"clicked = {props.continueClicked}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;