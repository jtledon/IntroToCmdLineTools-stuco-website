---
title: Intro to tmux
description: A commandline window tiler, tmux
sidebar:
    order: 7
    # hidden: true
    badge: New
---

## The benefit that TMUX provides

### Default pane/window support
You can have multiple command-line sessions open without needed a terminal that supports tabs, or having multiple terminal windows open.

### Terminal session persistence
they persist even after the terminal is closed, because it attaches to its own process. This is great for long-running processes on servers.

### Pair programming
Two people can view each others changes in real time. They need to be `ssh`ed into the same machine though

### Saving your layout and scripting
With a plugin, you can save you pane/session layout.

You can also write a script that will open panes/windows/sessions in a repeatable manner for testing purposes

## Usage

* changing your prefix key
* making new panes and swapping between them
* making new windows and swapping between them
* detaching
* switching sessions
* plugins

## alternatives
* zellij - the new "rewrite it in Rust" alternative
* screen - the historical precursor

## Homework

Record a video of yourself using vim to edit 3 different config files of your choosing. Make sure to include navigating multiple tmux panes and windows. The video should be no longer than a minute.
