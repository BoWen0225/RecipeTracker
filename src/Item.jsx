import React, { useState, useEffect } from "react";
import OrangeClock from "./img/OrangeClock.svg";
import Alarm from "./sounds/Alarm.mp3";


export function Item({ id, title, completed,
  description,
  time,
  toggleItem,
  deleteItem,
  index, }) {
    const [showDescription, setShowDescription] = useState(false);
    const [timerRunning, setTimerRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState({ minutes: 0, seconds: 0 });
    const [timerPaused, setTimerPaused] = useState(false);
    const [progress, setProgress] = useState(100);
    const [timeUpAudio] = useState(new Audio(Alarm));
    timeUpAudio.loop = true;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
const [editedDescription, setEditedDescription] = useState(description);

  useEffect(() => {

    setEditedTitle(title);
    let interval;
    timeUpAudio.pause();

    if (timerRunning && !timerPaused) {
      if (remainingTime.minutes > 0 || remainingTime.seconds > 0) {
        timeUpAudio.pause();
        const totalTimeInSeconds = time.minutes * 60 + time.seconds;
          const remainingTimeInSeconds = remainingTime.minutes * 60 + remainingTime.seconds;
          const newProgress = (remainingTimeInSeconds / totalTimeInSeconds) * 100;
          setProgress(newProgress);
        interval = setInterval(() => {
          setRemainingTime((prevRemainingTime) => {
            if (prevRemainingTime.seconds === 0) {
              return {
                minutes: prevRemainingTime.minutes - 1,
                seconds: 59,
              };
            } else {
              return {
                minutes: prevRemainingTime.minutes,
                seconds: prevRemainingTime.seconds - 1,
              };
            }
          });

          
        }, 1000);
      } else {
        setProgress(0);
        timeUpAudio.play();
    
      }
    }

    return () => clearInterval(interval);
    timeUpAudio.pause();
    timeUpAudio.currentTime = 0;
  
  }, [title,timerRunning, timerPaused, remainingTime, time]);
  const handleTimerClick = () => {
    if (!timerRunning) {
      setRemainingTime(time);
    }
    setTimerRunning(!timerRunning);
  };

  const handlePauseClick = () => {
    setTimerPaused(!timerPaused);
  };


  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleDescriptionDoubleClick = () => {
    setIsDescriptionEditing(true);
  };


  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    
  if (editedTitle.trim() === "") {

    setEditedTitle(title);
  } else {

       const updatedItems = JSON.parse(localStorage.getItem("ITEMS")).map((item) =>
       item.id === id ? { ...item, title: editedTitle } : item
     );
     localStorage.setItem("ITEMS", JSON.stringify(updatedItems));
   
  }
  };

  const handleDescriptionBlur = () => {
    setIsDescriptionEditing(false);
    
  if (editedDescription.trim() === "") {

    setEditedDescription(description);
  } else {
 
       const updatedItems = JSON.parse(localStorage.getItem("ITEMS")).map((item) =>
       item.id === id ? { ...item, description: editedDescription } : item
     );
     localStorage.setItem("ITEMS", JSON.stringify(updatedItems));
   
  }
  };

  const titleContainerWidth = Math.max(editedTitle.length * 8 + 16, 100) + "px"; 

  return (
    <div className="item">
      <div className="content">
        <div className="description-button-container" style={{ minWidth: titleContainerWidth }}>
        <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={toggleItem}
            />
          </label>
          <span className="number">{index + 1}</span>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
              style={{
                width: "10%",
                padding: "8px",
                fontSize: "14px",
              }}
            />
          ) : (
            <div onDoubleClick={handleDoubleClick}>{editedTitle}</div>
          )}
            <button onClick={deleteItem} className="btn btn-danger">   -
          </button>
        </div>
        {showDescription && (
          <div className="description">
{isDescriptionEditing ? (
  <textarea
    value={editedDescription}
    onChange={handleDescriptionChange}
    onBlur={handleDescriptionBlur}
    autoFocus
    style={{
      width: "100%",
      padding: "8px",
      fontSize: "14px",
    }}
  />
) : (
  <div onDoubleClick={handleDescriptionDoubleClick}>
    {editedDescription}
  </div>
)}
            </div>
        )}
            <button
          onClick={() => setShowDescription(!showDescription)}
          className="btn btn-dropdown"
        >
          {showDescription ? "Hide Description" : "Show Description"}
        </button> 
        {timerRunning && (
          <div className="progress-bar">
            <div
              className="progress-bar-inner"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {timerRunning && (
           <p>
           {remainingTime.minutes === 0 && remainingTime.seconds === 0 ? (
             "Time's up"
           ) : (
             `Remaining Time: ${remainingTime.minutes} min ${remainingTime.seconds} s`
           )}
         </p>
        )}
        {time && (
          <div className="playerButtons">
            <button onClick={handleTimerClick} className="btn btn-timer">
              {timerRunning ? (
                "Stop"
              ) : (
                <p>
                  <img
                    src={OrangeClock}
                    alt="orangeclock"
                    className="btn btn-clock"
                    id="orangeclock"
                  />
                  Start timer: {time.minutes} min {time.seconds} s
                </p>
              )}
            </button>
            
            {timerRunning && (
             
              <button onClick={handlePauseClick} className="btn btn-timer">
                {timerPaused ? "Resume" : "Pause"}
              </button>
              
              
             
              
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}