---
title: Chaining commands together
sidebar:
    order: 8
    # hidden: true
    # badge: New
---

## Administration

1) I haven't heard from anyone that this time doesn't work, so I am going to move forward with this time slot.
2) The questions will be similar to the homework and attendance questions.
3) In general I would recommend doing it in the class docker container to ensure compatability.
4) I will be in my Zoom room for the duration of the exam period

## Chaining commands together

Unix philosophy
> 1. Make each program do one thing well.
> 2. Expect the output of every program to become the input to another,

-- Doug McIlroy

An added note, a lot of semantics of this lecture will change depending on the shell you are using (sh, bash, zsh, dash, fish), but the concepts should remain.

### Piping (`|`)

We've already talked about this a bit in the class, and even used it in some assignments; piping is the most basic form of connecting two commands together.

Generally, when a command runs, it prints the output to your terminal. This occurs because the command's `stdout` is redirected to the terminal by default. This doesn't have to be the case though. With a pipe, we can send the `stdout` (and `stderr`) to the `stdin` of the following command.

A really common use that we have seen again and again in this class is piping into `grep`.
```bash
$ cat file.txt | grep word
```
Nothing changes in the perspective of the `cat` command; all it knows is that it is writing data to its `stdout`. This redirection is occurring at the shell level: the OS provides the mechanisms to make the redirection possible, but the shell is what connects one commands `stdout` to the next commands `stdin`, which is all opaque to the commands themselves.

### redirection

:::note
Each command has 3 file descriptors: `stdin`, `stdout`, and `stderr`. They each have numbers, corresponding with 0, 1, and 2 respectively.
:::

#### basic redirection (`>` and `>>`)
<!-- TODO: show stdout and stderr without any modifications
```bash
$ curl https://intro-to-cmdline-tools.jtledon.com/parsetext/jledon.txt | grep Amanda
``` -->

The most common form of redirection is `>`. This is the basic redirection that will send `stdout` (but not `stderr`) to a file of your choosing. You can view this with the following command; notice that the `stdout` gets put in the file but `stderr` still prints to the terminal.
```bash
$ curl https://intro-to-cmdline-tools.jtledon.com/parsetext/jledon.txt > only-stdin.txt
```
You can see the text about download progress is not in the file, but the text from the file is. This is because the download progress text is written to `stderr`, and therefore was not redirected.

`>>` is exactly the same as `>` except it appends to a file if it exists, rather than overwriting it.
```bash
$ echo "hi" > file.txt # file.txt contains the text "hi"
$ echo "replace" > file.txt # file.txt contains the text "replace", and nothing else
$ echo "addition" >> file.txt # file.txt contains the text "replace" and "addition"
```

#### `stderr` redirection

Referring back to the previous example, sometimes you dont want the `stderr` output cluttering your terminal. In cases like that, you can specifically redirect the `stderr` output somewhere else. Notice that now the download progress information is gone:
```bash
$ curl https://intro-to-cmdline-tools.jtledon.com/parsetext/jledon.txt 2> /dev/null > only-stdin.txt
$ curl -s https://intro-to-cmdline-tools.jtledon.com/parsetext/jledon.txt > only-stdin.txt # curl's -s flag also helps with this
```

:::note
`/dev/null` is a null file that will discard any data written to it
:::

You can redirect `stdout`, `stdout`, or both, with the following syntax
* `1>` (`>` shorthand) - redirect stdout
* `2>` - redirect stderr
* `&>` - redirect both stdout and stderr

#### file descriptor redirection

You can also refer to other of the 3 file descriptors. For example, you can redirect `stderr` to wherever `stdout` is pointing, without having to know where that is; `stdout` could be redirected to another command's `stdin`, to a new file, or to `/dev/null`.

* `2>&1` - direct stderr to go to the same location as stdout
<!--
    - `&1` is referring to the location of the file-descriptor 1, which is `stdout`.
        - `2>1` would write `stderr` to a file named "1"
    - be careful with this
    - `echo "hi" > file.txt 2>&1` works file because stdout was redirected first
    - `echo "hi" 2>&1 > file.txt ` wont work because stdout was still pointing to terminal output buffer when redirecting stderr
    - https://phoenixnap.com/kb/bash-redirect-stderr-to-stdout#:~:text=examples%20of%20stdout.-,Redirecting%20stdout%20and%20stderr,represents%20the%20file%20descriptor%20number.
-->
* `|&` - pipe both `stdout` and `stderr` to the next command
    - equivalent to `2>&1 |`
    <!-- - https://stackoverflow.com/questions/35384999/what-does-mean-in-bash -->

### input redirection

We just covered output redirection, but there is also input redirection. This can be similar to piping, but has notable differences.

If we wanted to grep the contents of a file, one way would be to do:
```bash
$ cat file.txt | grep word
$ grep word file.txt
```

Lets focus on the first case. We want to call the `cat` command just to get the data into `grep` - that seems wasteful. Instead, we can use input redirection to pass the data to `grep` on `stdin` without having to call `cat` first.
```bash
$ grep word < file.txt
```
We were able to pass the contents of the file on `stdin` without needing to call `cat` to get it to write to its `stdout` first.

I find this particularly useful when using `gdb` on binaries that require `stdin` input; it allows you to define the data that you want the binary to read on `stdin`, in a file. Then, when the binary is ready to read from `stdin` there is already data there ready for it.
```bash
$ gdb ./prog
$ run < input_file

$ gdb -ex='run < input_file' --args ./prog # one-liner of the same idea
```
This method pairs particularly well with a `.gdbinit` file.

<!-- what is `<<<` -->

### `xargs`

Sometimes, commands don't read from `stdin`, the only read the values that are passed to them on the command-line. `xargs` solves this problem by reading from `stdin` to get the pipe data, and then repeatedly calling the command that you entered. You can verify that the command is called repeatedly in separate instances with the following command:
```bash
$ echo -e "1\n2\n3" | xargs -I {} date "+{}  %s%N"
```

As I hinted in the previous example, `xargs` allows you to specify a placeholder for where the value from `stdin` will get placed in the following command with `-I`. This is particularly useful when you need the values to be placed in a specific location in the next command. For example, at a certain place in a format string, or between two flags:
```bash
$ echo -e "1\n2\n3" | xargs -I {} date "+{}  %s%N"
```

Some notable commands that
```bash
$ find ... | rm # doesnt work
$ find ... | xargs rm # passing it as a cmdline argument rather than via stdin
```

### Command substitution

There are times were you dont want to pass in information over `stdin` or via a file, but you want to include the contents of another command in another one. In situations like that, it is convenient to use command substitution.
```bash
$ ps -u $(whoami) -U $(whoami) # limits the ps output to processes owned by the current user
```

This is actually how most shell scripts are written
```bash
$ VAR=$(cmd)
```

:::note
The `$()` is actually the new syntax for command substitution; the old syntax is `` (backticks). The new syntax is favorable for its readability, and less of a need for escape characters when nesting.
:::

### Process substitution
<!-- Used when you want to run a command and send that commands output into another
But that second command doesnt take input from stdin so you cant use pipes (|) or input redirection (<), only from files
You could just run the command, and redirect the output to a .tmp file, but then you have to make a file
Instead, you can use process substitution ( <() ), which runs the command and acts as a fd
```bash
$ sort -u <(cat file1 file2) # combine file1 and file2 into a singular file, sort them and remove dups
``` -->

Process substitution is useful when you are using a command that requires files as inputs, but you need to perform some operation on the input files before you want to input them. You could make a `.tmp` file perform some operations, and delete it later but that requires making a file. It would be nice if you could perform some operations on the file before sending it to the command, and still pass it in as a file descriptor.

Consider this example where you have two files that. Assume that file1 and file2 are files with lists of words in them. We can get a more reasonable understanding of how different the files actually are and what is missing, because we sort them first.
```bash
$ diff <(sort file1.txt) <(sort file2.txt)
$ comm <(sort file1.txt) <(sort file2.txt) # show whats common between these files rather than whats different
```
`<()` returns a file descriptor which points to the contents returned by `stdout` from the commands inside.

:::caution
This is bash specific; `zsh` has something similar though.
:::


There is also an equivalent version in the other direction. It allows you to pass in `>()`, in the spot where a command would be expecting a file name. The shell handles this, generates a fd, and sends the data that would have gone into this file to `stdin` of the commands inside `>()` instead.

This is a bit of contrived example, but it shows what it can do and how to use it.
```bash
$ head -n 5 file.txt > >(grep "word")
```
`>` expects a file to write to. Rather than passing in a filename, we pass in `>()`: `>()` stands in the place of where a file would be. Rather than the command writing to that fd, the output that would have been written is piped into the command inside the process substituion, and it gets ran.

<!-- signals
error / return codes -->

## Homework

Submit your own set of commands that use all of the following:
* pipes - `|`
* input redirection - `<`
* output redirection - `>`
* `xargs`
* command substitution - `$()`
* process substitution input - `<()`  creating a fd
* process substitution output - `>()` writing to a commands stdin rather than a file

You can have these commands do whatever you want. When you submit the command, include a summary of what this command or pipeline of commands does and what problem it solves.


When using `<()`, you cant do something like `diff <(cat file.txt)` instead of just doing `diff file.txt` because no meaningful change was made; however, if you use something more substantial than `cat`, that would be fine.

I couldnt think of an assignment that would force you to use all of these, so the best I can do is encourage you to use them on your own and think of use-case. I know you can, but try not to use ChatGPT; if everyone uses ChatGPT or the provided examples on the man pages everyone is going to have the same solutions which will be super boring to grade.

:::note[Extra Credit]
For 4 extra credit points on the assignment, submit a pipeline that has 4 or more of these in it. You cannot use `;` to split it up. For example, you could use pipes, processes substitution, command substitution and output redirection. If you do this, you dont need to repeat any of these in other command strings submitted (although you could if you wanted or needed to).
:::

<!-- make a pipeline that reads from a file, sorts it based on the most common words, and writes to stdout all the (now sorted) words. In this pipeline, any words that have a count >= 10 should be printed to stdout in red.

you need to use input redirection, pipes, and process substitution in your pipeline

look into ascii escape codes (give example of a basic echo)
look into `sort` and `uniq` commands
not allowed to use `awk`


maybe sort only the stderr data?? -->
