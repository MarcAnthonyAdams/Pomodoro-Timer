# Pomodoro Timer

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student.

I implemented the following (simplified from the original technique):

Set the focus duration (default to 25 minutes, no less than 5 or more than 60).
Set the break duration (default to 5 minutes, no less than 1 or more than 15).
When the user clicks the "play" button, the timer starts.
When the focus time expires, an alarm plays and then the break timer starts.
When the break time expires, the alarm plays again and then the focus timer starts.
This application uses Bootstrap 4 for styling and Open-Iconic icons for icons.

 ## Initial Screen

The initial screen lets the user set the length of the focus and break and break sessions.

The "stop" button is disabled on the initial screen because the user has not yet started the timer.

When the user clicks the "play" button, the timer will always start a new focus session.

## Active Session Screen

After the user clicks the "play" button, the buttons to change the focus and break duration are disabled and the session timer appears.

The session timer shows the type of session, either "Focusing" or "On Break", the total duration of the session, the time remaining, and a progress bar showing how much of the session is complete.

## Paused Session Screen

If the user clicks the "pause" button, "paused" appears below the time remaining.

The session timer shows the type of session, either "Focusing" or "On Break", the total duration of the session, the time remaining, and a progress bar showing how much of the session is complete.

## Stoping a session

Stopping a session returns the application to the initial screen and the user is able to change the focus and break duration.

Clicking the "play" button will always start a new focus session.

**Setup**
Clone a fork of this repository and run

cd pomodoro-timer

**npm install**

**npm start**
 
Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.