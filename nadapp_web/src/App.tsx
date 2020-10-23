import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { basicLoginRequested } from './store/auth';

function App() {
  const dispatch = useDispatch()

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={() => {
            dispatch(basicLoginRequested({
              username: "test",
              password: "test"
            }))
          }}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
