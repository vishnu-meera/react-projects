import React, { Component } from 'react';
import styled  from 'styled-components';
import './App.css';
import AppBar from './AppBar';

const AppLayout = styled.div`
  padding:30px;
`;


const Content = styled.div`
`;

const firstVisitonPage = ()=>{
  let cryptoDashboardData = localStorage.getItem('cryptoDash');
  if(!cryptoDashboardData){
    return {
      page:"Settings",
      firstVisit:true
    }
  }
};
class App extends Component {
  state={
    page:'Dashboard',
    ...firstVisitonPage()
  };

  displayContent = (page)=> this.state.page === page;

  firstVisitMessage = () =>{
    if(this.state.firstVisit)
      return <div>Welcome to CryptoDashBoard, please select to your coin.</div>
  };

  confirmFavorites = () =>{
    localStorage.setItem('cryptoDash','test');
    this.setState({
      firstVisit:false,
      page:'Dashboard'
    })
  };

  settingsContent = () =>{
    return (<div>
      {this.firstVisitMessage()}
      <div onClick={this.confirmFavorites}>
        Confirm Favorities
      </div>
    </div>);
  };

  render() {
    return (
      <AppLayout>
        {AppBar.call(this)}
        <Content>
          {this.displayContent("Settings") && this.settingsContent()}
        </Content>
      </AppLayout>
    );
  }
}

export default App;
