#!/bin/sh
gpio -g mode 21 out
i=0
for var in 0 1 2 3 4
do
  gpio -g write 21 1
  sleep 0.1
  gpio -g write 21 0
  sleep 0.1
done


