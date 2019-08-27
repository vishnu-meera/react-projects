import React from 'react';
import styled ,{css} from 'styled-components';

const Logo = styled.div`
  font-size: 1.5em;
`;

const ControlButton = styled.div`
  cursor: pointer;
  ${props=>props.active && css`
    text-shadow: 1px 4px 2px #03ff03;
  `}
`;

const Bar = styled.div`
  display:grid;
  grid-template-columns:180px auto 100px 100px;
  margin-bottom:30px;
`;

export default function(){
    console.log("hello : ",this.state)
    return(
        <Bar>
        <Logo>Crypto Dashboard</Logo>
        <div></div>
        {!this.state.firstVisit && (<ControlButton 
          active={this.displayContent("Dashboard")}
          onClick={()=>{this.setState({page:"Dashboard"})}}>
            Dashboard
        </ControlButton>)}
        <ControlButton 
          active={this.displayContent("Settings")}
          onClick={()=>{this.setState({page:"Settings"})}}>
            Settings</ControlButton>
      </Bar>
    );
}