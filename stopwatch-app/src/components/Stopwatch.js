import React from 'react';
import { FaPlayCircle } from "react-icons/fa";
import { IoPauseCircleSharp } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { MdFlagCircle } from "react-icons/md";
//import { LuFlagTriangleRight } from "react-icons/lu";

function Stopwatch(){
const [timer,setTimer]=React.useState(0);// for counting time and displaying lap and reset
// const [laptime, setLaptime]=React.useState({
//     lap:[],
//     laptime:[],
//     total:[]
// })//for lap timing
const [laptime, setLaptime] = React.useState([]); 
const [isPause, setIsPause]=React.useState(true);//for lap and resetting
const [lapButtonClicked, setLapButtonClicked] = React.useState(false); // to track if lap button is clicked
//const [hasStarted, setHasStarted] = React.useState(false); // New state for animation
// let now;
// React.useEffect(()=>{
//     console.log("now: ",now);
//     console.log("minutes: ",now/(60*60)," seconds: ",now/60 );
// },[now])
React.useEffect(() => {
    let interval;
    if (!isPause) {
        interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 10); // Increment timer by 10 milliseconds
        }, 10);
    } else {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
}, [isPause]);

function startTimer(){
    console.log("timer has start");
    // const now=  Date.now();
   
    
    // setTimer(now);
    setIsPause(false);
   // setHasStarted(true); 
}
function pauseTimer(){
    console.log("timer has paused");
    setIsPause(true);
    
}
// function playTimer(){
//     console.log("timer has played");
//     setIsPause(false);
    
// }
function resetTimer(){
    console.log("timer has reset");
    setIsPause(true);
    setTimer(0);
    setLaptime([]);
    setLapButtonClicked(false);
  //  setHasStarted(false); 
    
}
function lapping(){
    console.log("timer saved lap time");
    //setLaptime(prevLaptime => [...prevLaptime, timer]);
    const newLapTime = timer - (laptime.reduce((acc, cur) => acc + cur, 0)); // Calculate the difference from the last lap
    setLaptime(prevLaptime => [...prevLaptime, newLapTime]);
    setLapButtonClicked(true);
}

const formatTime = (time) => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    //const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
    // return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return `${minutes}:${seconds}.${milliseconds}`;
};

const lapTable = (
      <div className={lapButtonClicked ? 'table-container' : 'table-container hidden'}>
    <table>
        <thead>
            <tr>
                <th>Lap</th>
                <th>Lap time</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {laptime.map((lap, index) => (
                <tr key={index}>
                    <td><MdFlagCircle className='lapp'/>&nbsp;{index + 1}</td>
                    <td>{formatTime(lap)}</td>
                    <td>{formatTime(laptime.reduce((acc, cur, i) => i <= index ? acc + cur : acc, 0))}</td>
                    {/* <td>{formatTime(laptime.reduce((acc, cur) =>  acc + cur , 0))}</td> */}
                </tr>
            ))}
        </tbody>
    </table>
    </div>
);

return(

<div className='container'>
    <h1>Stopwatch App</h1>
<div className='stopw-cont'>
    <div className='stopw'>
        {/* <h2 className='time'>00:00.00</h2> */}
        <h2 className='time'>{formatTime(timer)}</h2>
    </div>
    
</div>
<div className='stopwinfo-cont table-container'>
{lapTable}
</div>
<div className='stopw-btn'>
    {timer!==0 && <MdFlagCircle className={'lap'+ (isPause?" icon-disabled":"")} onClick={lapping} />             }
    {timer===0 && <FaPlayCircle className='play' onClick={startTimer}/>  }
    {timer!==0 && isPause && <FaPlayCircle className='play' onClick={startTimer}/>      }
    {timer!==0 && !isPause && <IoPauseCircleSharp className='pause' onClick={pauseTimer}/>    }
    {timer!==0 && <VscDebugRestart className={'reset'+ (isPause?"":" icon-disabled")} onClick={resetTimer}/>  }
    
</div>
</div>
)

}
export default Stopwatch;