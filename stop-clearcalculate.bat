@echo off
setlocal

REM ============================================================
REM ClearCalculate - Local server stopper
REM This script cleanly stops common Next.js dev server processes
REM by terminating node.exe instances.
REM ============================================================

echo.
echo [INFO] Stopping local ClearCalculate server processes...

REM Attempt graceful stop of Node processes used by npm run dev / next dev.
taskkill /IM node.exe /T >nul 2>&1

if errorlevel 1 (
  echo [INFO] No running node.exe process was found.
  echo [INFO] If your server is still running, close that terminal manually.
) else (
  echo [SUCCESS] Local Node/Next.js server processes were stopped.
)

echo.
pause
