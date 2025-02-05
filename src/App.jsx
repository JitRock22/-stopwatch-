import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'

function App() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false);

  useEffect(() => {
    console.log("useEffect called (running:", running, ")");
    let interval;
    if (running) {
      console.log("Starting interval");
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
        console.log("Time updated:", time);
      }, 10);
    } else if (!running) {
      console.log("Stopping interval");
      clearInterval(interval);
    }
    return () => { console.log("Cleanup function called (running:", running, ")"); 
      clearInterval(interval);
    }; 
  }, [running]);


  return (
    <>
      <div className='container'>
        <h1>STOPWATCH</h1>
        <div className='hero'>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        {running ? (<button className="stop button-24" onClick={() => { setRunning(false) }}>Stop</button>) : (<button className="start button-24" onClick={() => { setRunning(true) }}>Start</button>)}


        <button className="restart button-24" onClick={() => { setTime(0) }}>Restart</button>
      </div>

    </>
  )
}

export default App
