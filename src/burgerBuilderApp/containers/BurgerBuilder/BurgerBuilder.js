import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    'salad':2,
    'bacon':1,
    'cheese':1,
    'meat':2
}

class BurgerBuilder extends Component{

    constructor(props){
        super(props);
        this.state = {
            ingredients:{
                salad:0,
                bacon:0,
                cheese:0,
                meat:0
            },
            totalPrice:4,
            purchaseble:false,
            purchasing:false
        }
    }

    purchaseHandler = ()=>{
        this.setState({purchasing:true})
    }


    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinue = ()=>{
        console.log(this.state.ingredients);
    }

    updatePurchase(ingredients){
        const sum = Object.keys(ingredients).map(key=>{
            return ingredients[key];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        console.log(sum>0)
        this.setState({purchaseble:sum>0});
    }

    addIngredientHandler = type=>{
        const totalPrice    = this.state.totalPrice + INGREDIENTS_PRICES[type]
        const ingredients   = {...this.state.ingredients};
        ingredients[type]   = this.state.ingredients[type] + 1;
        this.setState({ingredients,totalPrice});
        this.updatePurchase(ingredients)
    }

    removeIngredientHandler = type =>{
        if(!this.state.ingredients[type]<=0){
            const totalPrice    = this.state.totalPrice - INGREDIENTS_PRICES[type]
            const ingredients   = {...this.state.ingredients};
            ingredients[type]   = this.state.ingredients[type] - 1;
            this.setState({ingredients,totalPrice});
            this.updatePurchase(ingredients);
        }else
            return;
    }

    render(){

        const disabledInfo = {...this.state.ingredients};
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cancelClicked = {this.purchaseCancelHandler}
                        continueClicked = {this.purchaseContinue}
                        price = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler} 
                    disabled = {disabledInfo}
                    purchaseble = {this.state.purchaseble}
                    price = {this.state.totalPrice}
                    purchased ={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
