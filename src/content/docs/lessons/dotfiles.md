---
title: Managing .dotfiles and your dev environment
description: How to configure your development environment with files, so that your settings always persist
sidebar:
    order: 6
    # hidden: true
    badge: New
---

## Config files

Most unix programs are configured by using some sort of "dotfile". These are just files with specific names in specific locations that the program knows to look for. These files usually contain some set of settings in a unique syntax for each application.

Many times, there is a system-wide config file location, a user-specific config file location, and sometimes a directory specific configuration. A good example of this is `gdb`:
* `/.gdbinit` - system-wide
* `$HOME/.gdbinit` - user-specific
* `**/.gdbinit` - directory-specific
Where each more specific location takes priority when assigning settings.

Some examples of these files that I use on a daily basis are:
* `.bashrc` - config for interactive shells
* `.bash_profile` - config for login shells and how they differ depending on interactive shell or not
* `.profile`
* `.gitconfig`
* `.gitignore`
* `.vimrc`
* `.gdbinit`
* `.tmux.conf`

### shell types

#### login
Login shells are shells that run setup files that are connected to this user account. For example, `~/.bash_profile` will be run.

You can check if it's a login shell by running:
```bash
$ echo $0
```
If the shell name is preceded by a `-`, it is a login shell


#### interactive
Interactive shells are shells that that have a tty connected to stdin

You can check if it's an interactive shell by running:
```bash
$ echo $-
```
If the letter "i" is in this string, it is an interactive shell. Alternatively, you can check if `$PS1` is set, or a myriad of other options. In general, this should be clear, because you can type commands into it or not.

<!-- #### examples

|           |  interactive | non-interactive |
|-----------|--------------|-----------------|
| **login**     | `ssh jledon@unix.andrew.cmu.edu` | `source script.sh` which has a #! shebang  |
| **non-login** |      `bash -c 'echo $-; echo $0;'` or `ssh jledon@unix.andrew.cmu.edu 'echo $-; echo $0;'` |  | -->

### Syncing between machines

There are lots of options for syncing your dotfiles between computers.
* GNU Stow
* yadm (Yet Another Dotfile Manager)
* Ansible playbooks
* A single Github repo with a symbolic linking script

## Locations

The most common location is going to be in `$HOME`; almost every program looks there first.

The other common alternative is `$XDG_CONFIG_HOME`, which, unless specified otherwise, will default to `$HOME/.config/`. The idea behind XDG (Cross-Desktop Group) is to standardize programs, but this env variable is specifically referring to config files.

A special example is `$HOME/.ssh/config`, which is in the `.ssh/` folder, which is generally where other ssh related files are, such as keys or fingerprints.

## Homework

Create and submit 3 personalized dotfiles (`.bashrc`, `.gitconfig`, etc.), with 5 or more custom settings per file. Each line should be commented as to why this is a beneficial change for your setup. Submit these 3 or more files to the appropriate assignment on canvas.
