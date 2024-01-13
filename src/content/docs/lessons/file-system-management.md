---
title: Managing permissions and file system space
description: How to manage file/directory permissions, the different types,
sidebar:
    order: 12
    hidden: true
    # badge: New
---

tree

du

df

chmod

fs listacl

fs setacl

htop

ps - (can) show all jobs on the system

jobs - only shows the processes being managed by this specific shell instance from being sent to the background

kill

fuser

### Additional fun section I'm considering  <!-- TODO: should this be its own day? idt so, not enough content -->
BAD practices that people should use
* using sudo for everything when you run into permissions issues
* `/dev/random` is not actually random. `/dev/urandom` is tho?
