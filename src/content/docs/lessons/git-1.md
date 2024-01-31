---
title: git:Intermediate
description: An intro into the fundamentals in git
sidebar:
    order: 2
    hidden: false
    badge: New
---

## How to Undo State

### `reset`

The reset command will reset the current state of HEAD to the location that you set. The flag you specify will determine how destructive the command will be.
```bash
$ git reset --soft  @^ # resets the HEAD to the specified commit, but leaves the working directory and staging area unchanged
$ git reset --mixed @^ # default: resets HEAD to the specified commit, but the files in the working directory arent changed
$ git reset --hard  @^ # "delete" the current commit: reset HEAD to the specified commit, and clear any other changes that were in the working directory or staging area
```

### `restore`

The `restore` command will default to restoring the working directory to the current state of `HEAD`. It will _restore_ the current state of the working directory to the commit that you specify.

You can specify a specific file, a directory, or `:/`, which refers to all tracked files

:::tip
`reset` usually acts on branches, across commits\
`restore` is usually used when modifying the state of the working directory and staging area
:::

##### `--staged` flag

This flag is really useful if you want to remove a file from the staging area, but want to keep the changes in the working directory.

### `revert`
revert is a little bit different than the other two commands. The other two commands allow you to move/reset the state of HEAD; revert will create a _**new commit**_ which contains the changes that will undo the changes done in the specified commits.

This is most used when you have already pushed the commits to a remote repo. You wouldn't want to delete a commit or forcibly move a branch location because that might mess with other peoples commit history. This preserves the history but undoes the change.

## Handling Commits

### interactive rebase

rebasing was mentioned in the last lesson: its just a way of moving commits to be on top of another branch, to keep a more linear history. Interactive rebase provides you with a couple more options, and lets you decide what action you make on each commit.

This is generally used to `squash` commits: all that means is you put all the changes from the selected commit, into the previous commit

An example of using this command might be:
```bash
$ git rebase -i @^^^ # allows you to modify or squash the last 3 commits
```

Other common changes that you can perform are:
* **pick**: use this commit
* **reword**: use this commit, but change the message
* **edit**: use this commit, but edit it first
* **squash**: use this commit, but meld it into the previous commit
All of these operations, their summaries, and many other available commands come up when running the interactive `rebase` command

### `reflog`

`reflog` is a git command, but it also refers to a data store used to record every time the tips of branches and other refs (such as HEAD) are updated.

Commit data is almost never deleted, so the reflog allows you to undo any changes, like a `git reset --hard @^`, or git rebase that squashed commits.

An example animation of how you might use the reflog:
<video width="640" height="360" controls>
    <source src="/reflog-restore-commit-animation.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>

And a real world interaction with a git repo:
<video width="640" height="360" controls>
    <source src="/reflog-graph-scaled-no-aliases.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>

:::caution
the reflog will default to deleting entries older than 90 days. This can be tuned to your preference, though.
:::

### dangling commits

A dangling commit is just a commit that has no easy way of being referenced. If it exists in the log heirarchy of some branch, tag, or HEAD; you can `git log` and easily find the commit; these commits would not be considered dangling. An example of a dangling commit would be the commit that was deleted in the previous animation, which we could only refer to via the reflog.

This is just terminology, but it comes up quite frequently

## Managing files

### .gitignore files

These are really important for keeping clutter out of your git directory that doesn't need to be committed. These files allow you to declare that you never want to add certain files to your staging area (and therefore never be committed)

Important syntax includes:\
* `**`: match any number of prefixed directories in this project\
* `*`: wildcard character that matches 0 or more characters\
* `!`: negate any previous ignore statements that would have removed this pattern\
* `[0-9]`: a group of characters, any of which match

a `.gitignore` file might have entries that look like the following
```bash
node_modules/ # all files in the node_modules directory
*.o # all files that end with a .o extension. Usually compiled intermediary files
**/logs # any directory, anywhere in the repo, called "logs"
!important.log # I want to make sure to _not_ ignore this file
```
When making a new repo, GitHub will often ask if you would like to immediately add a `.gitignore` file to the repo, depending on the type of language you are working in.

If you are familiar with using npm (node package manager), you will have all your dependencies in a `node_modules/` file; this is unnecessary, as they can all be cloned later so long as you have the `package.json` file declaring all the dependencies

You can read more about them [here](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)

### stashing changes

The command `git stash` allows you create something _like_ a commit, but not really. It saves, and then undoes any uncommitted changes _stashing_ them for later use.

:::note
Your stashed changes are global to the git repo. A common use-case of stashing is people start to work on a branch, realize theyre on the wrong one, stash their changes, checkout the correct branch, and unstash their changes.
:::

## Useful tools

### worktrees

### bisect

### hooks

### difftool (VSCode, meld)

### --patch/-p commits

### git partial clone and git sparse checkout
--sparse
--cone

## Homework

This weeks homework is going to be a little bit more in depth. You will need to record a video of yourself:
1. Using `restore` to remove a file from your staging area without undoing the file contents
2. Making a commit
3. Pushing to your own remote repo made on GitHub
4. `git reset --hard @^` over the commit you just made and pushed
5. Showing the diff between your local branch, and the remote branch you just pushed to
5. Getting that commit back and updating your branch to point at it

And email it to me with the title like: "[98172] HW2". Ideally, the video with be 2 minutes or less
