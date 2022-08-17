@echo off
set message=Hello World
echo |set /p= %message%
echo , getting things ready now...
echo npm uninstall -g @forge/cli
call npm uninstall -g @forge/cli 
echo npm install -g @forge/cli
call npm install -g @forge/cli 