import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props)=>{
    
    const ingredientsTemplate = Object.keys(props.ingredients).map(ingredientKey=>{
        return [...Array(props.ingredients[ingredientKey])].map((_,i)=>{
            return <BurgerIngredient type={ingredientKey} key ={ingredientKey+i}/>
        })
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsTemplate.length===0?<p>Please add ingredients...</p>:ingredientsTemplate}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;