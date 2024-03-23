---
title: Some of the most useful utility tools
sidebar:
    order: 10
    hidden: true
    # badge: New
---

parallel
tee - reads from stdin and allows you to write that same data to a file (OR to one or more commands using process substitution)

- Create a directory called "example", count the number of characters in "example" and write "example" to the terminal:
echo "example" | tee >(xargs mkdir) >(wc -c)

&
nohup
time
