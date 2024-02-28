---
title: Intro to [neo]vim
sidebar:
    order: 5
    # hidden: true
    badge: New
---

## Benefits
* on basically every server/computer
* useful on ssh sessions bc its in the command-line
* customize it to fit you exactly
* encourages you to learn about how exactly your editor works

## History
ed
vi
vim - bram moolenar - vim-script
nvim - community maintained - lua

## Changes are atomic
[c]hange [w]ord
. repeats that
[count] + verb + noun
[repetitions] + operation + target
Try to remember everything as a neumonic

## Modal editor
### Normal mode
### Insert mode
### Visual mode
### Command mode
### Transition Diagram

## vim Motions
Even if you don't switch to using `vim` full time as your editor like I have, I think you should at least try using vim motions in your IDE. Intellij, VSCode, Zed, Sublime, etc. all have vim motion bindings.
hjkl
wWeEbB
fFtT
gg G
^$

:q[!]
:wq (write and quit)

aiAI

/?nN
yank paste

TODO: this is how I should introduce vi


2 delete word
delete inner/inside word
change inside "

## Niceties
### Capslock -> ESC
In Windows you can use AutoHotkey
```ahk
#Requires AutoHotKey v2.0+
#Warn  ; Enable warnings to assist with detecting common errors.
SendMode "Input"  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir  ; Ensures a consistent starting directory.
#SingleInstance Force

; Capslock send ESC key
Capslock::Esc

; Shift+Capslock will toggle Capslock state
+CapsLock:: {
    SetCapsLockState(!GetKeyState("CapsLock", "T"))
}
```
### $EDITOR env var

## Additional References
* [thoughtbot - Mastering the Vim Language](https://www.youtube.com/watch?v=wlR5gYd6um0)
