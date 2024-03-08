---
title: RegEx and Fuzzy Finding
sidebar:
    order: 3
    hidden: false
    # badge: New
---

## RegEx (Regular Expressions)

The general summary of regular expressions, is that they can get impossible to read, but are equally powerful for text processing and searching.

A fun example that people like to give is a regular expression for matching phone numbers. I have no idea if this works or not, but it looks insane.
```bash
r"^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$"
```

### RegEx engines
There are different engines for regex, each with their own syntax and abilities.
[Here](https://gist.github.com/CMCDragonkai/6c933f4a7d713ef712145c5eb94a1816) is a (mostly?) full comparison of the various RegEx engines that are available.

The runtime cost can also change drastically. Some regex engines are exponential, whereas others scale linearly with the search input because they are using Finite Automata.

In this class, I will accept solutions using any regex engine: all you need to do it verify that it runs in the class docker container, and include in the submission how I am intended to run it.

One really common example which showcases the differences in the engines being used, is that in most cases, if you want to match a digit, you can use the `\d` string. In both `sed` and `awk` (which we will talk about next class), `\d` doesn't exist; instead you need to use `[[:digit:]]`.

## Syntax

### Most common uses

Below are some of the most important regular expression:
* **ascii**: Just match any normal ascii character
    * `hi` will literally match the word "hi". This is just like `<C-f>`
* **`.`**: the `.` operator will match any character
    * `.at` will match "cat", "hat", "bat", but also "qat"
* **`+`**: the `+` operator will match 1 or more of the preceding character
    * `do+g` will match "dog", but it will also match "doog" or "doooooooooog"
* **`*`**: the `*` operator will match 0 or more of the preceding character
    * `do*g` will match all the ones from the `+` example, in addition to matching "dg"
    * this often shows up combined with `.`. `.*` is a common pattern that just says match anything, any number of times.
* **`?`**: This operator will make the preceding character optional
    * `dogs?` will match either "dog" or "dogs", as the "s" on the end is optional
* **`\`**: This is the regex escape character.
    * It allows you to match the literal "*" (`\*`) or "?" (`\?`) characters that otherwise have special meanings in regex
* **`[]`**: match any of the characters within this group
    * `[bh]at`: will match "bat" and "hat" but not "cat"
    * `[a-q0-9]`: you can use ranges within these brackets
* **`[^]`**: this syntax will match anything but the characters in this group
    * `[^c]at` will match any `.at` word, _except_ for the word "cat"
* **`|`**: this operator is just an `or`. It allows you to match two different expressions
    * `foo|bar` will match either the word "foo", or the word "bar"
* **`()`**: This is capture group. This is super useful for storing specific portions of your match
    * `\b(.*)@gmail.com`: this regex will match any continuous string that ends with "@gmail.com"
    * These captures can be referred back to when doing substitution using `$1` or `\2`
* **`{}`**: This is the quantifier operator. It allows you to specify exactly how many matches you want, or a range
    * `a{3}`: match 3 a's
    * `a{3,7}`: match anywhere from 3 to 7 a's
    * `a{,7}`: match 0, up to 7, a's
    * `a{4,}`: match 4 or more a's
* **`^$`**: These operators match the beginning and end of a string respectively
    * generally a regex will match anywhere within the string; "^cat" will match "cat", only if it starts the string
* **`\d\D`**: this special code will match any digit, or anything except a digit, respectively
    * `[[:digit:]]`: this is an alternate way to match a digit
* **`\w\W`**: match any word character, or anything but a word character, respectively
* **`\b\B`**: match any word boundary character, or anything but a word boundary character, respectively
* **`\s\S`**: match any whitespace character, or anything but a whitespace character, respectively
* **`\t`**: match a tab character
* **`\n`**: match a newline character

### Powerful operators

#### Positive/Negative Lookahead/Lookbehind

Sometimes you want to match something, depending on the context of the surrounding characters. This is what lookahead/behind offers you. It allows you to look in front of or behind the current character, to check what is there, without actually matching it.

```bash
(.*)(?=\.txt)\b # match anything that with .txt, but dont match the extension itself
(.*)(?!\.md)\b # match anything except for strings that end in .md

(?<=foo)bar # match the word bar, but only if it is immediately preceded by the word foo
(?<!bar)baz # match baz so long as it is not preceded by the word bar
```

#### Non-capture groups

Sometimes it can be helpful to group sections together, even if you have no need to refer to them later. When this is the case, you can use a non-capture group. This is nice when you have 7 other capture groups, and you dont want to add any more useless ones
```bash
(?:[a-z]+) # this syntax creates a capture group that cant be references later
```

#### Others
There are things like recursive searching and named capture groups that are available in many regex implementations. I personally don't use them, but I figured it was worth mentioning that they were available.

### Flags

The way regex's match can be modified depending on what flags you pass into it. Two common examples include:
* Treating multi-line strings as singular strings which are separated by `\n` newline characters
* Case insensitivity when you are matching

```bash
/regex/flags # generally regular expressions are wrapped in forward slashes
             # following the second forward slash is _generally_ where the flags go. This depends on the regex implementation
/earth/i     # case-insensitive searching without needing to add it to the regular expression itself
/new\nline/m # multi-line matching. Allows newlines to be in the middle of strings
/global/g    # don't return and quit after the first match. Continue matching
```

### Great RegEx references to learn or test

* **Testers**
    * [regex101](https://regex101.com/)
    * [regexr](https://regexr.com/)
    * [RegExTester](https://www.regextester.com/)
* **Visualizers**
    * [regexper](https://regexper.com/)
    * [Regulex](https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24)
    * [iHateRegex](https://ihateregex.io/playground/)
* **Games**
    * [RegexOne](https://regexone.com/)
    * [RegexGolf](https://alf.nu/RegexGolf?world=regex&level=r00)
    * [RegexCrossword](https://regexcrossword.com/)

## Fuzzy-Finding

There are various tools that provide a fuzzy finder for text in your command-line. The most popular one is `fzf`, which is short for [F]u[Z]zy-[F]inder.

### `fzf`

#### Default mappings
`fzf` comes with some built-in keybindings that are super useful.
    * `<C-r>`: pastes the previous command from your command history into the terminal
    * `<C-t>`: pastes the files selected from the UI into the command-line

#### Extensibility

`fzf` is also incredibly extensible. A ton of tools require `fzf` to be installed to run, and you can build tools on top of `fzf` yourself.

I personally built an `fzf` selector that travels up to the root of any `golang` project, and from there, recursively travels into all sub-directories, making all go tests available to you to run.

```bash
function __gg() {
    local dir=$PWD
    while
        # this loop automatically ends early after it finds any one of them
        # Only need -quit in case two are in the same directory; -print -quit MUST be at the end
        local RESULT=$(find "$dir"/ -maxdepth 1 \( -name "go.mod" -o -name "go.work" -o -name ".git" \) -print -quit) # target files come from neovims nvim-lspconfig autocommand which looks for the root dir to attach the language server: https://github.com/neovim/nvim-lspconfig/blob/master/lua/lspconfig/server_configurations/gopls.lua
        [[ -z $RESULT ]] && [[ "$dir" != "/" ]]
    do dir=$(dirname "$dir"); done

    # no go.mod or go.work directory was found and we worked back up to root
    if [[ -z $RESULT ]]; then
        echo "Couldn't find any go.mod, go.work or .git in parent directories"
        return
    fi

    local fzf_opts='--reverse --height ~40% --min-height 10 --margin=1,15% --border=rounded --border-label=" go test -race -run " --info=hidden'
    local output=$(
            rg --no-line-number --no-filename --type go --no-messages "^func\s+(Test\w+)\(.*$" -r '$1' $(dirname "$RESULT") |
            # rg --no-line-number --no-filename --glob '*.go' --no-messages '^func\s+(Test\w+)\(.*$' -r '$1' |
            FZF_DEFAULT_OPTS="$fzf_opts" $(__fzfcmd) --query "$READLINE_LINE"
    ) || return

    # no selection was made due to exiting early w ESC, CTRL-C, etc
    if [[ -z $output ]]; then
        return
    fi
    # update the contents of READLINE, a bash global which contains the text on the current line
    READLINE_LINE="go test -race -run ${output#*$'\t'}"

    # update cursor position based on the starting posiiton when we called the keybinding
    if [[ -z "$READLINE_POINT" ]]; then
        echo "$READLINE_LINE"
    else
        READLINE_POINT=0x7fffffff
    fi
}
bind -m emacs-standard -x '"\C-g": __gg'
bind -m vi-command -x '"\C-g": __gg'
bind -m vi-insert -x '"\C-g": __gg'
```

### Changing directories

There are some tools that exist that allow you to jump between directories, without having to `cd` to their exact path.
```bash
$ z StuCo website # might take you to /home/jledon/stuco/StuCoWebsite
```

Some of the most common ones are:
* `z`
* `fasd`
* `zoxide` (`z`, but rewritten in Rust)
* `j`
* `autojump`

I personally use `z`, but plan to switch over to `zoxide` soon.

#### `$CDPATH`

You can also add really common paths to your `$CDPATH` environment variable. This allows you to `cd` into any directories in this directory, without actually being in them.


:::note[Homework]
There will be a file on the website under `regex/your_alias.txt` where you will find a text file specifically for you.

You need to copy the text from that file and search for a portion of a string that:
* has up to 3 hex characters preceding it (both "A" and "a" are valid hex)
* is wrapped in square or curly brackets
* is a file name that ends in an 3 character file extension

The regular expression should only match the portion inside the brackets, excluding the period and extension: only the file name.

Some examples might be:
```python
C[fa28234sa-q.txt] # matches "fa28234sa-q"
8a4[qwebyacyz.jpg] # matches "qwebyacyz"
14F{qYxsua.zip}    # matches "qYxsua"
```

Whereas a counter example might be:
```txt
1aG[notes.txt]   # doesn't match: G isn't hex
\n{bin.tar}      # doesn't match: isn't preceded by hex
7B2[README.md]   # doesn't match: not a 3 character file extension
F<y7zqqpzab.stl> # doesn't match: surrounded by <> and not [] or {}
```

There should only be one line in the file that matches.

Submissions will be made on canvas, with instructions on how to run the regular expression, and the expression itself. Preferably, it will be using PCRE2 or ECMAScript on [regex101.com](https://regex101.com/).
:::

<style>
    ul {
        /* background: red; */
        line-height: 1.35em;
        /* margin: 0px; */
        /* transform: translateY(-24px); */
    }
</style>
