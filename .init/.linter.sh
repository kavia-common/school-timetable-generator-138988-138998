#!/bin/bash
cd /home/kavia/workspace/code-generation/school-timetable-generator-138988-138998/random_time_table_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

