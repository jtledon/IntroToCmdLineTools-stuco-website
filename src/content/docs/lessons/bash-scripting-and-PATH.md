---
title: The shell
sidebar:
    order: 11
    # hidden: true
    badge: New
---


### Understanding `$PATH`
This section is going to mention `$PATH` quite a bit and I realize I haven't explicitly mentioned that yet in this course. In Unix based systems, `$PATH` is an environment variables that all(?) shells use to indicate where it will look for binaries / scripts to run when you type a command. Common defaults to have in `$PATH` include:
* `/bin`
* `/usr/bin`
* `/sbin`
* `/home/linuxbrew/.linuxbrew/bin`
and many others.

Notice that these are **directories**, _not_ the binaries themselves. `$PATH` should contain a list of colon separated directories in which all of your binaries reside. The shell will search through your path to find the binary or script that matches the command you run.

:::note
This is a first-come, first-serve operation. If your `$PATH` looks like `/home/username/bin:/bin` and you have a binary with the name `foobar` in both directories, the one in `/home/username/bin` will run because it was found first.
:::

You can easily add on a new directory to `$PATH` like so:
```bash
# SPACING MATTERS! Note there is no space on either side of the equal sign
export PATH="/home/jasonledon/.local/bin:$PATH" # prepend to the front of $PATH
export PATH="$PATH:/home/jasonledon/.local/bin" # append on to the end of $PATH
```

## Running code
Many people have a lot of confusion relating to the different ways of "running" a file. You use any of the following:
```bash
$ sh script.sh
$ ./script.sh
$ /path/to/script.sh
$ script.sh
$ source script.sh
$ . script.sh
```
It really breaks down into two distinct ways. Lets talk about them.

### _Executing_ a binary / script
The first 4 commands are essentially all the same:
```bash
$ sh script.sh # execute a file in the current directory called "script.sh" using `sh` to interpret and run the file
$ ./script.sh  # execute a file called script.sh. The ./ denotes the current directory because, generally, the current directory should not be in $PATH
$ /path/to/script.sh # you can provide the absolute path to a script and run it that just the same
$ script.sh          # you can call a script just by its file name so long as your $PATH contains its directory
```

The same syntax works on binaries (for the most part). Lets use `ls` as the example:
```bash
$ ./ls           # so long as you are in /usr/bin
$ /usr/bin/ls    # comes in handy if your $PATH got wiped out somehow during initialization
$ ls             # /usr/bin will generally be in path, so this works fine
$ sh /usr/bin/ls # doesn't work because `ls` isn't a shell script, it's a binary file
```

:::note
A binary file is a compiled piece of code containing machine code, whereas a script is a text file that gets interpreted and run by the invoked shell.

Most scripts will have something called a shebang:
```bash
#!/bin/zsh

mkdir -p $HOME/new
pushd $HOME/new
...
popd
```
to indicate what shell should be interpreting this script


A binary, on the otherhand will likely need to be made executable if it wasn't done so already
```bash
$ chmod +x binary_file
```
:::

### Sourcing a script
The other way to "run" a file is by sourcing it:
```bash
$ source script.sh
$ . script.sh # this is exactly the same as `source script.sh`. `.` is an alias for `source`
```
Similar to `sh`, `source`ing acts on text files that are interpreted by the shell and run, and doesn't work on binary files.

### How is executing different than sourcing?
This is a pretty common question; the difference might seem minimal but it has pretty significant implications.

* executing a binary or script will make it run in a **_subshell_** which returns the result to the caller shell
* sourcing a file will load and execute a script in the **_current shell_**, meaning any side effects will persist

This is why you `source ~/.bashrc` and don't execute it with `./` . You want the modifications to take effect and apply to the current shell.

### Some commands are neither
Some commands, are implemented a little differently; think about a command like `cd`.

`cd` is a binary as indicated by the fact that we cant run it using `sh` or `source`. If it were to be run in a subshell, then that subshell would have changed directories, returned nothing, and left the caller shell in the same directory, but that's not what we see happen; we see the directory change. This is because the shell implements something called shell builtins.

Shell builtins are commands which provide the shell an interface to job control facilities, the directory stack, the command history and the programmable completion facilities.


## Shell expansion

### String interpolation
I've talked about this once before in the class briefly, but I wanted to really drive home the difference between `""` and `''`

When dealing with `""` in the shell, your shell will expand the contents
```bash
$ echo "$HOME"          # /home/jasonledon/
$ cat "$(pwd)/file.txt" # will have the correct file path
```

Whereas `''` is treated as a literal string and the shell does not expand any of its contents
```bash
$ echo '$HOME'          # $HOME
$ cat '$(pwd)/file.txt' # $(pwd)/file.txt
```

###  Globbing
Generally, if you use globbing in a shell (`*.ls`), this will actually be resolved by the shell, not the program itself. In the following example:
```bash
$ grep "word" *.md
```
grep is receiving a list of files from the shell, not the literal string `"*.md"` and performing the expansion itself


There are additional operations that can be performed using shell expansion, such as the following:
```bash
$ touch file.{c,h}     # options
$ ls file.?            # match a single character
$ touch file{A..D}.txt # use ranges
$ ls file[2-4].jpg     # file match operator
$ ls file[2..4].jpg    # naively expands, and will error if file3.jpg doesn't exist
$ echo {1..10}         # standard number ranges
$ echo {100..5..7}     # complex ranges
```

## Writing scripts

### Variables
When writing shell scripts, variables are generally going to be computed using subshells ( `$()` or ` `` ` )
```bash
#!/bin/bash

RESULT=$(find "$dir"/ -maxdepth 1 \( -name "go.mod" -o -name "go.work" -o -name ".git" \) -print -quit)
```

:::caution
Note that there is no space between the word RESULT and the = sign. If there was a space, it will be interpreted as a command called `RESULT` and the shell will try to call it, rather than doing a local variable assignment.
:::

When referencing a variable, you will have to use `$VAR` syntax
```bash
#!/bin/bash

RESULT=$(find "$dir"/ -maxdepth 1 \( -name "go.mod" -o -name "go.work" -o -name ".git" \) -print -quit)
echo $RESULT
```

Sometimes, we need to concatenate a variable with a string, but it may not be clear where the variable ends and the string begins. In that case, you can use `${VAR}` syntax, where you wrap the variable name in `{}` braces, in addition to using the `$`

### Testing
TODO: Need to finish this section
`()` vs `(())` vs `[[]]` vs `[]` vs `test` in `if` conditions


## POSIX
POSIX is an acronym which stands for Portable Operating System Interface. The idea is that tools/programs/scripts which are POSIX compliant will run on any operating system that is also POSIX compliant. The idea is to offer portability during an age of various operating systems with different instructions.

This is why scripts are still often written using `/bin/sh`. `bash` and other shells contain features that might not exist on other POSIX compliant systems (such as <() process redirection).

<!-- ## Running previous commands -->
<!-- `!!` And `!$` and `!^` and all variations for referencing the previous command -->

<!-- interactive vs non-interactive shells: what they are and the impact that it has -->
<!-- `pushd` / `popd` for scripting purposes of changing directories -->
<!-- cron jobs for automating commands to run at a specific time -->
<!-- Environment variables -->
