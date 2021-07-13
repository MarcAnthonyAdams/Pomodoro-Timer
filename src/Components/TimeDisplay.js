import React from "react";
import { secondsToDuration } from "../utils/duration";


function TimeDisplay({ session,  timerOnAction, timerOnTime, isTimerRunning, progressCount }) {

  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
          <h2 data-testid="session-title">
            {timerOnAction()} for {timerOnTime()} minutes
          </h2>
          {/* TODO: Update message below correctly format the time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session.timeRemaining)} remaining
          </p>
          <h4>{isTimerRunning ? "" : "PAUSED" }</h4>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progressCount()} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${progressCount()}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default TimeDisplay;