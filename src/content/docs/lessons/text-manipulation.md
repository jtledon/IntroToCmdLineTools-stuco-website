---
title: grep, sed, awk, find
description: Parse data way faster than you ever have before
sidebar:
    order: 4
    # hidden: true
    badge: New
---

## Finding files (`find`)

The most common command that you will use when looking for files on your system is the aptly named `find` command.

It has somewhat strange syntax, so using `tldr` is particularly convenient for this command. A common use of `find` will look like the following:
```bash
$ find <start-directory> -iname <file-name>
$ find ~/stuco -iname "*.txt" #case insensitive file name search
```

There are a bunch of other useful flags:
```bash
$ find . -type f # only find files of type "file"
$ find . -maxdepth 2 # only recurse 2 levels deep
$ find . -exec cat {} \; # run the following command for any file that you find, where {} is the placeholder
```

:::note
`ripgrep` using the `--files` flag can also solve a similar need

If you are interested in better default syntax, check out the "rewrite it in Rust" alternative, `fd`
:::

## Parsing text

### `grep`

I've used this command many times throughout this class, and its likely going to the one that you use the most. `grep` actually stands for "Global RegEx Print". It just allows you to find text inside any of the input passed into it.

You can pass text input in using `stdin`:
```bash
$ cat file.txt | grep "search" # using pipes
$ grep "search" < file.txt # using input redirection
$ cat file1.txt | grep "search" < file2.txt # or both
```

You can also pass in file names as input to grep:
```bash
$ grep "search" file.txt # notice that we arent using < (input redirection). This is just a file name which grep opens
$ grep "search" *.md # we can also using file globbing (we will cover this more later)
```

#### `-r/--recursive` flag

Sometimes, though, we have no idea what file what we are looking for is in, but we know a keyword that is around it. When that is the case, we can search the contents of every file.
```bash
$ grep -r "search" [dir] # search the contents of every file, similar to how `find` recursively searches every directory for a file name
$ grep -r "search" --exclude="*.json" # you can, of course, reduce the search area
$ grep -r "search" --include="*.md" # in more ways than one
```

#### RegEx with `grep`

`grep` does support RegEx, but it is enabled with a flag.

In general, you will want to use `grep -P`, as that enabled PCREs, but it wont be a 1-to-1 match with the PCRE2 that I showed in class.

:::note
There are also `egrep`, `pgrep`, and `fgrep` binaries that you can use, which correspond to the `-E`/`--extended-regexp`, `-P`/`--perl-regexp`, and `-F`/`--fixed-strings` flags respectively. These binaries are officially deprecated (although unlikely to lose support anytime soon), and you should use `grep -E` or other flag to enable this behavior.
:::

#### Additional useful flags

* _`--line-number`_: Show the line number this match occurred on
* _`--no-filename`_: Dont print the filename when printing a match (this only works when passing in files to grep, not via `stdin`)
* _`--only-matching`_: Only print the parts of the line that were matched by the regular expression, not the whole line
* _`-A/-B/-C`_: Print the lines after/before/both of the matched line

### `awk`

`awk` is an entire programming language in itself; it is most used for complex text parsing. `awk` defaults to being delimited by whitespace.

This is just an example of one of the things that I've personally written with `awk`. Notice the `length()`, and `split()` functions that are available.
```bash
$ awk '{ \
    split($0, days, " "); \
    for (i = 1; i <= length(days); i++) { \
        if (days[i] ~ /[[:digit:]]-01/)
            printf "\033[1;37;44m%s\033[0m\t", days[i]; \
        else if (days[i] ~ /Mon$/) \
            printf "\033[1;37;43m%s\033[0m\t", days[i]; \
        else printf "%s\t", days[i] \
    } \
    printf "\n" }'
```

There's no way I can cover everything that is available, but these are the basics:

```bash
$ awk '{}' # the general syntax
$ awk '{print $2}' # print the second field
$ awk -F ':' '{print $4}' # change the delimited awk uses
$ awk '{ if ($1 ~ /[[:digit:]]/) print $1 $2}' # conditional match on a line, using a regular expression
$ echo -e "1\n12\n1234\n4346\n234\n93" | awk 'BEGIN {print "this runs first"} {print $1} END {print "this runs at the end"}' # run text before or after processing any/all text
```

There are also built in fields that you can query:
```bash
$ NF # number of fields in this line
$ $NF # the value at the last field in this row
$ NR # number of rows met thus far
```

## Modifying text (`sed`)

All of the commands I have shown up to this point take the text out of a file, and search for something, or reorder the text in some way. What if we wont to modify the contents of a file? That is what `sed` is for.

I personally don't use `sed` very often, but

## Accessing the text in files

### `cat`

I have used this command repeatedly in this class. This just takes the text from the file[s] that you provided it, and writes their contents to `stdout`

### `head` and `tail`

`head` and `tail` show you the top and bottom of a file respectively. You can specify just how much of the file it shows you using the `-n` flag
```bash
$ head -n 10 config.json
$ tail -n 3 out.log
```

#### `tail -F`

The `-F` flag is particularly useful when data is continuously being written to a file. This is likely to be a long-running separate process you are running which is logging data to a file.

```bash
$ tail -F long-running.out
```

:::note[Homework]
This homework will be similar to the previous homework. There will be a new file generated for you at `https://intro-to-cmdline-tools.jtledon.com/parsetext/<alias>.txt`.

* For this homework, you need to find the string that meets the following criteria (in this order):
    * contains a valid social security number.
        * This will be numbers only, with optional -'s
        * 123-45-6789
        * 111223333
    * contains a valid persons name (first and last name only)
        * this will only contain letters (no numbers or special characters)
        * might have any amount of whitespace between the first and last name
        * Jason Ledon
        * Tyler          Mason
    * contains a valid ISO-8601 date
        * 20240221
        * 20241442 is not valid because in 2024-14-42, the 14th month and 42nd day doesnt exist
* Reorder the text such that it is `name : social security num : <month>-<day>-<year>`

This all should be done in a single pipeline of commands in the command-line. I will be running this in the Dockerfile, so if you command works there, you can assume it will work when I'm grading it as well.

This might look like `cat ... | grep ... | ... | ... `

An input text and expected output could be the following:
234-331923       Jason             Tyler 19931106
Jason Tyler : 11-06-1993 : 234-33-1923
:::

