import React from 'react';
import logo from './logo.svg';
import { helloUMD } from 'lib';
import './App.css';

function App() {
  React.useEffect(() => {
    helloUMD();
  }, [])
  
  return (
    <div className="App">
      <p>Console should print "Hello UMD"</p>
    </div>
  );
}

export default App;
