import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import TimeDisplay from "../Components/TimeDisplay";
import TimeControls from "../Components/TimeControls";
import TimeLengths from "../Components/TimeLengths";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  const [ displayTime, setDisplayTime ] = useState(25);
  const [ breakDuration, setBreakDuration ] = useState(5);
  const [ focusDuration, setFocusDuration ] = useState(25);
  const [ pomodoroOn, setPomodoroOn ] = useState(false);
  const [disable, setDisable] = useState(true);


  // ToDo: Allow the user to adjust the focus and break duration.

  function convertDurationMS(duration) {
    return duration * 60;
  }

  function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
  }

  const changeTime = (amount, type) => {
    if(type === "break") {
      pomodoroOn ? setBreakDuration(breakDuration) : setBreakDuration(prev => clamp(prev + amount, 1, 15));
    } else {
      pomodoroOn ? setFocusDuration(focusDuration) : setFocusDuration(prev => clamp(prev + amount, 5, 60));
      if(!pomodoroOn) {setDisplayTime(clamp(focusDuration + amount, 5, 60))};
    }
  };

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };  
          }
          
          return prevStateSession;
        });
      }
      return nextState;
    });
    setPomodoroOn(true);
    setDisable(false)
  }

  function stopTime() {
    setIsTimerRunning(false);
    setPomodoroOn(false);
    setDisable(true);
    setSession(null);
    setDisplayTime(25);
    setFocusDuration(25);
    setBreakDuration(5); 
  }

  const timerOnAction = () => {
    return session.label === "On Break" ? "On Break" : "Focusing";
  }

  const timerOnTime = () => {
    return session.label === "On Break" ? minutesToDuration(breakDuration) : minutesToDuration(focusDuration);
  }

  const progressCount = () => {
   const progressCount = session.label === "On Break" ? convertDurationMS(breakDuration) - session.timeRemaining : convertDurationMS(focusDuration) - session.timeRemaining;
   const countConverted = session.label === "On Break" ? progressCount/convertDurationMS(breakDuration) : progressCount/convertDurationMS(focusDuration);
   const countPercentage = countConverted * 100;
   const progressCountResults = Math.round(countPercentage);
   return progressCountResults;
  };


  return (
    <div className="pomodoro">
      <div>
        <TimeLengths focusDuration={focusDuration} breakDuration={breakDuration} changeTime={changeTime}/>
        <TimeControls isTimerRunning={isTimerRunning} playPause={playPause} stopTime={stopTime} disable={disable}/>
        {pomodoroOn ? <TimeDisplay displayTime={displayTime} convertDurationMS={convertDurationMS} session={session} timerOnAction={timerOnAction} timerOnTime={timerOnTime} isTimerRunning={isTimerRunning} progressCount={progressCount}/> : "" }
      </div>
    </div>
  );
}


export default Pomodoro;
