---
title: Some of the most useful utility tools
sidebar:
    order: 10
    # hidden: true
    badge: New
---

## Wrapper function

### `parallel`

GNU parallel provides you a way to wrap multiple commands and a syntax to express them so that they can execute truly in parallel
```bash
$ parallel echo ::: A B C
```

Similar to `xargs`, you can use `{}` to as a substitution slot for your arguments
```bash
$ parallel echo {}-hi ::: A B C
```

To prove that its actually parallel, lets look at this random sleep example:
```bash
$ parallel 'sleep $((1 + $RANDOM % 3)); echo {}-hi' ::: A B C
```

You can provide multiple input data sources
```bash
$ parallel echo ::: $(seq 5) ::: 1 2 3
```

You can connect the args, rather then getting the permutation
```bash
$ parallel --link echo ::: $(seq 5) ::: jason tyler ledon # wraps
$ parallel echo ::: $(seq 5) :::+ jason tyler ledon # truncates to the shortest length
```

You can also reduce the number of threads that parallel is running on to reduce request and/or cpu load
```bash
$ parallel --jobs 2 'sleep 2; echo {}-hi' ::: A B C D
```

You aren't restricted to using arguments from the command-line, you can also use files
```bash
$ echo -e "jason\nledon" > file.txt ; parallel echo ::: $(seq 5) :::: file.txt # note the fourth :
```

When developing a parallel script, it helps to run with the `--verbose` and `--dry-run` to avoid running incomplete commands
```bash
$ parallel --verbose --dry-run --link 'sleep $((1 + $RANDOM % 3)); echo {}-hi' ::: A B C
```

_lots of the information came from [this video](https://www.youtube.com/watch?v=qypUdm-IE9c) and [this blog post](https://omgenomics.com/parallel/)_

### `tee`

`tee` reads from `stdin`, and then writes this data to all files/fd's listed, as well as to `stdout`
```bash frame='none'
# stdout ---> |-- --> stdin
#
#             |
#            \|/
#
#      (fd operations)
```

```bash
$ echo "sub/folder" | tee file.txt | grep "sub"
$ echo "sub/folder" | tee >(xargs mkdir -p) | grep "sub" # mkdir doesn't read from stdin
$ echo "sub/folder" | tee >(awk -F "/" '{print $2}') | xargs echo # you can modify the stdout stream with additional content
```

### `nohup`

`nohup`, or No Hang Up, is a tool that allows you to run commands in the background. If the terminal that started the process dies, the `nohup` command will continue to run.
```bash
$ nohup ./some-long-script
```

Even if the shell that started the command dies, it will continue to run. This can be really useful when starting long-running commands on ssh sessions.

```bash
$ nohup sleep 5 && echo "successful nohup" > example.out # still succeeds and runs if the terminal closes
```

`nohup` only works on SIGHANG signals, and not SIGKILL, SIGINT, and other common signals, Be careful of that

#### `&`

You can also run `nohup` commands in the background, which is the most common way.
```bash
$ nohup sleep 5 && echo "successful nohup" > example.out &
```

### time

time is just a basic wrapper than runs around a command, timing how long the internal command takes
```bash
$ time sleep 3
```

## Homework

There are files at `https://intro-to-cmdline-tools.jtledon.com/parallel/{}.txt`, where the `{}` can be 1, 2, 3, or 4.

Create a parallel command that appends the contents (in no particular order) of these files to a file called `append.out`

:::caution
Please don't spam the website with requests. Use `--verbose` and `--dry-run` until you're confident it'll work. I'm hosting this on the free plan and don't want to pay for the network requests of an accidental DOS attack.
:::
