---
title: Reading documentation
description: A brief introduction about several different ways to read the documentation on linux commands
sidebar:
    # label: Custom auto-generated label
    order: 0
    hidden: false

    # badge:
    #     text: New
    #     variant: default

    # attrs:
    #    target: _blank # open in new tab
---

This might be a little basic, but it will be really important for the rest of this class. Reading the documentation is a core skill that you need to be proficient at if you really want to get good at using the command-line.

## `man` Pages

The go-to spot for all information about any command that you might run into. The man pages contain all information about a command, like how to invoke the command, all the possible flags, and sometimes even examples

To use it, just run:
```bash
$ man {cmd}
$ man grep # example
```

### Using a `pager`

the `man` command runs by opening up the docs in something called a pager. A pager is just a way to navigate around a lot of text in the terminal without dumping all the text into `stdout`; you might be familiar with the most common example, `less`, or its sibling, `more`

You can navigate around pagers using `vi`-esque keybindings. Here are the basics:
* `j`  `k` - up and down 1 line respectively
* `q` - exit the pager
* `g` `G` - go to the top and bottom of the contents respectively
* `/word<CR>` - search for word
    * `n` - go to the next instance of {word}
    * `N` - go to the prev instance of {word}

:::note
The `<CR>` character is going to come up a lot. That just means carriage-return. Yes, like a typewriter. It just means "press the return key". For more information on modifier keys and their syntax, head to [this link](http://xahlee.info/emacs/emacs/keyboard_shortcuts_examples.html). The synopsis:
```bash
  A   # Shift + a
<C-b> #  Ctrl + b
<M-c> #   Alt + c
```
:::

## Help Flags

Basically every command has some `-h` or `--help` flag. These are generally very similar to the `man` page docs, but oftentimes aren't as complete. These are passed just like any other flag:
```bash
$ grep --help
```

### How to find what you need from this dump of text to `stdout`

It can be a pain to read through all this text, especially since it isnt in a pager by default.

There are two options:

1. Pipe the output into `grep`
    * `git --help | grep word`
    * don't worry if you don't quite understand this yet, we'll cover it later in the class
2. Pass the output into a pager like `less` or `more`
    * `git --help | less`
    * this gives you all the same scrolling and searching as the `man` pages

## Summaries and Common Use Cases

There are various options for more reasonable man pages that provide a high-level summary, and the most common use-cases and the corresponding flags, without getting too low level into the command and all its options. These are incredibly useful for remembering syntax or a flag quickly.

The two most popular ones are `tldr` and `tealdear`, which can be installed with `brew install tldr` and `brew install tealdear` respectively, provided you have homebrew.

The output looks like the following:
```bash
$ tldr grep

grep

Find patterns in files using regular expressions.
More information: https://www.gnu.org/software/grep/manual/grep.html.

- Search for a pattern within a file:
  grep "search_pattern" path/to/file

- Search for an exact string (disables regular expressions):
  grep --fixed-strings "exact_string" path/to/file

- Search for a pattern in all files recursively in a directory, showing line numbers of matches, ignoring binary files:
  grep --recursive --line-number --binary-files=without-match "search_pattern" path/to/directory

- Use extended regular expressions (supports ?, +, {}, () and |), in case-insensitive mode:
  grep --extended-regexp --ignore-case "search_pattern" path/to/file

  ...
```

## How to read the command specification

There is no hard specification on how command options and flags need to be defined (that I know of), but a convention has emerged.

### Optional vs Required Parameters

* parameters being wrapped in `[square brackets]` generally indicates that the parameter is optional
* parameters being wrapped in `{curly braces}` or `<angle brackets>` or nothing at all, generally indicates that the parameter is required

### Flags

A lot of flags, especially the most common ones, have two forms, the long form and the abbreviated form:
* `-h`: The short form is only prefixed with 1 dash, and is a single letter
* `--help`: Whereas the long form is prefixed with 2 dashes and can be one or multiple full words, separated by other dashes

:::tip
You can usually chain multiple short form flags together:
```bash
$ ls -lha
```

But if the short form flag requires an argument, it must be on the end, like `grep`'s `-A` or `-B` flags:
```bash
$ grep -rHnA 3 -B 3 word
```
:::

If we look at the following specification for the `grep` command:
```bash
grep [OPTION]... PATTERNS [FILE]...
```
We see that you can\
optionally define different options via flags, or none at all\
optionally define various files to search, or none at all\
but you _must_ provide some search pattern

## Homework

1. Make sure that you have a GitHub setup
    * You will probably need to setup an SSH key and link it to your account
    * Ensure that you can clone and push to a repo from your terminal
2. Install Docker and make sure you can run the class Docker container
    * You don't need to know how docker works right now, we'll hopefully get into that later

:::note
To submit this homework fill out the [entry assessment](https://bit.ly/jledon-stuco-assessment), with the GitHub username you will be using in the course
:::

If you need any help, reach out to me on the class Slack. I can get you setup, and send you some videos for reference
