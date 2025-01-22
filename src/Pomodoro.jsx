import React, { useState, useEffect } from 'react';
import './Pomodoro.css';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work or break

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Switch modes
            if (mode === 'work') {
              setMode('break');
              setMinutes(5);
            } else {
              setMode('work');
              setMinutes(25);
            }
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const switchMode = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('work');
      setMinutes(25);
    }
    setSeconds(0);
  };

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="pomodoro-container">
      <div className={`timer-display ${mode}`}>
        <div className="mode-indicator">
          <span className={`mode-pill ${mode}`}>
            <span>{mode === 'work' ? '⚔️' : '☕'}</span>
            {mode === 'work' ? 'Work Time' : 'Break Time'}
          </span>
        </div>
        <div className="time-block">
          <div className="time">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ 
                width: `${((mode === 'work' ? 25 - minutes : 5 - minutes) * 100) / (mode === 'work' ? 25 : 5)}%`
              }}
            />
          </div>
        </div>
      </div>
      <div className="controls">
        <button 
          onClick={toggleTimer} 
          className={`minecraft-btn ${isActive ? 'active' : ''}`}
        >
          <span>{isActive ? '⏸️' : '▶️'}</span>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer} 
          className="minecraft-btn"
        >
          <span>🔄</span>
          Reset
        </button>
        <button 
          onClick={switchMode} 
          className="minecraft-btn mode-switch"
        >
          <span>{mode === 'work' ? '🌙' : '☀️'}</span>
          {mode === 'work' ? 'Take Break' : 'Work Time'}
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;