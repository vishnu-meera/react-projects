import React, {useReducer} from 'react';
import reducer , {initState} from './state/reducer';
import Context from './Context';
import PublishMessage from './components/PublishMessage';
import MessageBoard from './components/MessageBoard';

const App = ()=> {

  const [state, dispatch] = useReducer(reducer, initState);
  console.log("state : ", state);

  return (
    <Context.Provider value={{state,dispatch}}>
      <div className="App">
          <h1>Reaction</h1>
          <hr/>
          <PublishMessage />
          <MessageBoard />
      </div>
    </Context.Provider>
  );
}

export default App;
