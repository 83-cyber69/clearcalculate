@echo off
setlocal

REM ============================================================
REM ClearCalculate - One-click local launcher
REM This script:
REM 1) Opens in this script's project folder
REM 2) Installs dependencies if node_modules is missing
REM 3) Starts the dev server (npm run dev)
REM 4) Waits a few seconds, then opens http://localhost:3000
REM 5) Keeps this terminal open while server is running
REM ============================================================

REM Move to the folder where this .bat file lives (project root).
cd /d "%~dp0"

REM Optional title so the terminal is easy to identify.
title ClearCalculate Dev Server

REM Verify npm exists before continuing (helps beginners troubleshoot quickly).
where npm >nul 2>&1
if errorlevel 1 (
  echo.
  echo [ERROR] npm was not found.
  echo Please install Node.js from https://nodejs.org/ and try again.
  echo.
  pause
  exit /b 1
)

REM If dependencies are missing, install them automatically.
if not exist "node_modules" (
  echo.
  echo [INFO] node_modules not found. Running npm install...
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install failed. Please fix the error and run again.
    echo.
    pause
    exit /b 1
  )
)

REM Start browser opener in the background after a short delay.
REM This allows the dev server a moment to boot before opening localhost.
start "" cmd /c "timeout /t 6 /nobreak >nul && start \"\" \"http://localhost:3000\""

echo.
echo [INFO] Starting ClearCalculate at http://localhost:3000
echo [INFO] Keep this window open while using the site.
echo [INFO] Press Ctrl+C in this window to stop the server.
echo.

REM Run the local development server in this same window.
call npm run dev

REM If the server exits, keep terminal open so user can read messages.
echo.
echo [INFO] Dev server has stopped.
pause
