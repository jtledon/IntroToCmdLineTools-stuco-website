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

redirection (`>` | `>>` | `2>&1 /dev/null` | `<` | `<<<`)
`> || 1>` - redirect stdout
`2>` - redirect stderr
`&>` - redirect both stdout and stderr
`2>&1` - direct stderr to go to the same location as stdout
    - be careful with this
    - `echo "hi" > file.txt 2>&1` works file because stdout was redirected first
    - `echo "hi" 2>&1 > file.txt ` wont work because stdout was still pointing to terminal output buffer when redirecting stderr
    - https://phoenixnap.com/kb/bash-redirect-stderr-to-stdout#:~:text=examples%20of%20stdout.-,Redirecting%20stdout%20and%20stderr,represents%20the%20file%20descriptor%20number.

Using input redirection with gdb is super useful when the binary is expecting input from stdin
gdb ./binary
run < input_file

`$() vs `` `

signals

error / return codes

