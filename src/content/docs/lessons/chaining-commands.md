---
title: Chaining commands together
description: A commandline window tiler, tmux
sidebar:
    order: 8
    hidden: true
    # badge: New
---

Unix philosophy
> 1. Make each program do one thing well.
> 2. Expect the output of every program to become the input to another,
> -- Doug McIlroy

Piping |

xargs

## redirection (`>` | `>>` | `2>&1 /dev/null` | `<` | `<<<`)
`> || 1>` - redirect stdout
`2>` - redirect stderr
`&>` - redirect both stdout and stderr
`2>&1` - direct stderr to go to the same location as stdout
    - `&1` is referring to the location of the file-descriptor 1, which is `stdout`.
        - `2>1` would write `stderr` to a file named "1"
    - be careful with this
    - `echo "hi" > file.txt 2>&1` works file because stdout was redirected first
    - `echo "hi" 2>&1 > file.txt ` wont work because stdout was still pointing to terminal output buffer when redirecting stderr
    - https://phoenixnap.com/kb/bash-redirect-stderr-to-stdout#:~:text=examples%20of%20stdout.-,Redirecting%20stdout%20and%20stderr,represents%20the%20file%20descriptor%20number.
`|&` - pipe both `stdout` and `stderr` to the next command
    - equivalent to `2>&1 |`
    - https://stackoverflow.com/questions/35384999/what-does-mean-in-bash

Using input redirection with gdb is super useful when the binary is expecting input from stdin
gdb ./binary
run < input_file

## Command substitution
`$() vs `` `

## Process substitution
Used when you want to run a command and send that commands output into another
But that second command doesnt take input from stdin so you cant use pipes (|) or input redirection (<), only from files
You could just run the command, and redirect the output to a .tmp file, but then you have to make a file
Instead, you can use process substitution ( <() ), which runs the command and acts as a fd
```bash
$ sort -u <(cat file1 file2) # combine file1 and file2 into a singular file, sort them and remove dups
```
this is a bash specific thing, zsh has something similar though



```bash
$ head -n 5 file.txt > >(grep "word")
```
>() stands in the place of where a file would be. Rather than the command writing to that fd, the output that would have been written is piped into the command inside, and it gets ran.
> expects a file to write to. Rather than passing in a filename, we pass in >(), which is a fd that runs a command instead.


signals

error / return codes

