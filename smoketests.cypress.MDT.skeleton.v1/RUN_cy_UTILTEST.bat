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
set TAGNAME=UTILTEST

REM Get the current UTC date and time in `YYYYMMDDHHMMSS.xxx` format
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I

REM Format the datetime to `YYYY-MM-DDTHH-MM-SSZ`
set datetime=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%T%datetime:~8,2%-%datetime:~10,2%-%datetime:~12,2%Z

REM Define the output filename with timestamp
set outputFile=cy_results_%TAGNAME%_%datetime%.txt

REM Run the npm command and redirect output to the timestamped file
npm run cy:%TAGNAME% > %outputFile%

REM Display a message indicating where the output is saved
echo Results saved to %outputFile%

REM End of script
