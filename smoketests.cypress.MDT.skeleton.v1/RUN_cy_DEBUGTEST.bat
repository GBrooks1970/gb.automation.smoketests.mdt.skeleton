@echo off
REM ============================
REM Batch Script for Running an npm Command with a Tag Name
REM and Saving Output with a UTC Timestamped Filename
REM Benefits of This Script:
REM Automated and Unique Log Files: Prevents overwriting previous logs.
REM Standardized UTC Timestamp: Makes logs easy to compare across different time zones.
REM Clear and Readable Filename Format: Helps organize logs efficiently.
REM ============================

REM Set the tag name (Modify this as needed)
set TAGNAME=DEBUGTEST

REM Get the current UTC date and time in a WMIC-free way
for /f %%I in ('powershell -NoProfile -Command "(Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH-mm-ssZ')"') do set datetime=%%I

REM Define the output filename with timestamp
set outputFile=cy_results_%TAGNAME%_%datetime%.txt

REM Run the npm command and redirect output to the timestamped file
npm run cy:%TAGNAME% > %outputFile%

REM Display a message indicating where the output is saved
echo Results saved to %outputFile%

REM End of script
