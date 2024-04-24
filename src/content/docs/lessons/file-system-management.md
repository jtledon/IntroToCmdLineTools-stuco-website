---
title: Managing permissions and file system space
description: How to manage file/directory permissions, the different types,
sidebar:
    order: 12
    # hidden: true
    badge: New
---

## Announcements
* Final
    * It will be on the Monday, the 6th at 3pm
    * It will be 90 minutes long
    * I would like to do it all at one time, rather than having a sliding window. Let me know if there are any conflicts.
    * I will try to get some practice `git` questions out
    * Topics (could be anything we covered in class or on the website)
        * git state and operations
        * text processing (regex, grep, awk, sed, ripgrep)
        * vim macros (and registers if you want to test it)
        * pipelines and redirection
        * process substitution, command substitution,
        * network requests
        * parallel operations
        * the shell, scripting, and the environment
        * practical operations on files
* Homework
    * There will be no homework for this week
* Final words
    * I really hope you all enjoyed the class and learned something
    * Don't forget to fill out FCEs and also feel free to leave any feedback in today's attendance poll
    * Feel free to take a sticker if youd like one

<!-- tree -->


## Permissions

### Change Mode (`chmod`)

I'm sure most people at this point are familiar with the `chmod` command as a way to change the file permissions of a file. I just wanted to go over the various forms of syntax for the command.

First, it's important to note that there are 3 categories for who might be accessing a file.
1. **User** - the person who created the file
2. **Group** - a set of users who are allowed to access a file. A file can be switched over to be owned by a group by using the `chown` command
3. **Other** - anyone who isn't in the first two categories

And 3 types of accesses:
1. read
2. write
3. execute

There are two forms of `chmod` syntax:
```bash
$ chmod 777 file.txt
$ chmod u+wx file.txt
```

The first form is using the decimal representation of a binary number to set all the permission bits of a file at once.
```bash
$ chmod 777 file.txt

# If you think about the values
#   u  |  g  |  o
# -----------------
#  rwx | rwx | rwx
# -----------------
#   7  |  7  |  7
# -----------------
#  111 | 111 | 111
```
If that example, you gave every user on the system read, write and execute permissions over the file; you could have just as easily given yourself full permissions and limited everyone else:
```bash
$ chmod 744 file.txt
```
Think of this syntax as a way to overwrite all permissions and set them from scratch

The other form is specifying exactly what change you want to make:
```bash
$ chmod u+x file.txt # add execute permissions to the `user` group
$ chmod g+rw file.txt # add read and write permissions to the `group` group
$ chmod o-x file.txt # remove execute permissions from the `other` group
$ chmod ugo+rwx file.txt # same as `chmod 777 file.txt`
```
It preserves any permissions that werent specified in this command

### fs listacl

These are commands used on AFS (Andrew File System), a file system developed as a research project at Carnegie Mellon in the 1980's. If you took Distributed, you'll recognize this as one of the distributed file systems we covered. They are used on lots of systems, most notably for us, the andrew clusters.

The basic premise of how permissions works on AFS systems is access control lists. These provide more fine-grained control of who can do what with a file. These are the access types:
1. **Read**: Allows reading (viewing) the contents of a file or directory.
2. **Write**: Allows modifying (writing) the contents of a file or directory.
3. **Insert**: Allows creating new files or directories within a directory.
4. **Delete**: Allows deleting files or directories.
5. **Lookup**: Allows listing the contents of a directory.
6. **Lock**: Allows locking files to prevent concurrent modifications.
7. **Administer**: Grants administrative privileges over the ACL itself.

You can view this easily:
```bash
$ fs listacl
```
but this will only work if the file system is an andrew file system

### fs setacl

You can set permissions just as easily:
```bash
$ fs sa . system:anyuser none
$ fs sa . system:ece none
$ fs sa . system:authuser none
$ fs sa . jledon write
$ fs sa . jledon@andrew.cmu.edu write
```
In this case, I am revoking access from common groups and added them to some other andrewID. Useful for sharing directories with other students when working in groups.

:::tip
`fs lq` will list the space quote assigned to you by the AFS administrator, and how much you are currently using.
:::

## Process Management

### `ps`

This will show you the running processes on a system. You can pass it additional criteria to show more information, restrict it to certain users, or change the way the processes are displayed. You can read more about the specific options being passed on the man page
```bash
$ ps # basic use to show processes
$ ps aux # show all running processes on the system
$ ps -u $(whoami) -U $(whoami) # jobs that are owned by the current user
```

### `kill`

Combined with the `ps` command this gives you the power to end various processes. This can be useful if you wanted to combine with with `fzf` or your own custom pipeline, or for ending pesky jobs that are taking up too many system resources

```bash
$ kill 1521
$ kill -9 19245 # sends the SIGKILL command; 9 is the signal code
kill -SIGINT 16602 # you can also send the signal by name
```

### `jobs`

Show the jobs that were spawned by the current shell. You can think of a job as an action, which can consist of one or more processes, such as with pipelines of commands: the job is the pipeline but each command is a process that needs to run. This is really useful when using the `SIGSTP` signal, or when dealing with `&` backgrounded operations, when combined with the following commands.
```bash
$ jobs -l # show the jobs with their process id's next to them
```

### `fg` and `bg`

These are commands that can be used to resume a command, either in the foreground, where it has access to the `tty`, or in the background
```bash
$ nvim # press <C-z> to stop the nvim job and return to the terminal briefly without fulling closing neovim
$ cmd # run some command
$ fg # return back to neovim where you left off
```

```bash
$ fg %2 # you can send a job to the foreground that wasn't isn't #1 on the list
```

### `htop`

A "graphical" way to view system resources. Just wanted to let everyone know that it was available.


## File Space

### Disk Usage (`du`) and Disk Free (`df`)

These are just basic commands for figuring out how much space is currently being used, and how much space is free.
```bash
$ du . # show the space, in bytes, that each file is taking up
$ du -h # show it in a human readable format, such as 8k or 7M
$ du -hc -d 1 | sort -hr # don't go into subdirectories, and sort it to show the largest at the top
```

There are Rust-rewrite alternatives like `duf`, for example which have more sane defaults.

<!-- ## The Linux file system -->
<!-- the general linux file system (/bin, /usr, /mnt, /dev, ...) -->


<!-- fuser -->
<!-- ### Additional fun section I'm considering  <!-- TODO: should this be its own day? idt so, not enough content --> -->
<!-- BAD practices that people should use -->
<!-- * using sudo for everything when you run into permissions issues -->
<!-- * `/dev/random` is not actually random. `/dev/urandom` is tho? -->

<style>
    ul {
        /* background: red; */
        line-height: 1.35em;
        /* margin: 0px; */
        /* transform: translateY(-24px); */
    }
</style>
