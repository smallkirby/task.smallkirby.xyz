#!/bin/bash

tmux split-window -v
tmux split-window -h
tmux select-pane -t 1
tmux split-window -h

tmux send-keys -t 1 '\
npm run build && npm run dev \
' C-m

tmux send-keys -t 2 '\
npm run emulate \
' C-m

tmux send-keys -t 3 '\
git branch \
' C-m
