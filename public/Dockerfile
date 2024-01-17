# To build: `docker build --tag jasonledon/stuco .`
# To run: `docker run --name cmdline-tools --rm -it jasonledon/stuco`
# Both: `docker build --tag jasonledon/stuco . && docker run -v $PWD:/passthru --name cmdline-tools --rm -it jasonledon/stuco`

# To run a blank debian image with no configuration from the commandline
# `docker pull debian:latest && docker run --rm -it debian:latest /bin/bash`

# To run a this dockerfile from dockerhub without having to built it from source
# `docker pull jasonledon/stuco:latest && docker run --rm -it jasonledon/stuco:latest /bin/bash`

FROM debian:stable

# make sure the image is up to date and has proper mirrors
RUN apt update
RUN apt dist-upgrade -y

# install build tools
RUN apt install -y build-essential gcc g++ cmake make sudo unzip # generally good tools for installing/building other software

# install brew, for installing other software
RUN apt install -y curl git
RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:${PATH}"
# RUN echo 'PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:$PATH"' >> /root/.bashrc
# RUN . $HOME/.bashrc # this is just sourcing the file, but /bin/sh doesn't have that keyword
RUN brew update

# https://github.com/neovim/neovim/wiki/Building-Neovim#build-prerequisites
RUN apt install -y ninja-build gettext cmake unzip curl git # nvim build from source requirements
# the opt/ directory is typically used for installing optional or add-on software packages that are not part of the core operating system; synonomous with optional
RUN git clone https://github.com/neovim/neovim.git /opt/neovim
WORKDIR /opt/neovim
RUN git checkout stable
RUN make CMAKE_BUILD_TYPE=RelWithDebInfo && make install


# already included with debian:latest:
#       find, grep, cat, tail, head, watch,
#       xargs, bg, fg, ps, jobs, fuser, nohup,
#       awk, grep, sed,
#       pushd, popd, du, df,
#       scp, time, kill
RUN apt install -y git tmux vim # living inside the terminal
RUN apt install -y curl wget rsync netcat-openbsd # network interaction
RUN apt install -y less man tldr # documentation
RUN mkdir -p /root/.local/share # required for tldr to work; usually exists already in running systems
RUN apt install -y parallel htop tree
RUN apt install -y coreutils # provides chmod
RUN apt install -y gdb jq rename # generally good to have
RUN apt install -y ffmpeg pandoc # I really doubt we'll get to, but they're incredibly useful conversion tools
RUN brew install ripgrep fzf
RUN /home/linuxbrew/.linuxbrew/opt/fzf/install # setup the fzf keybindings

# enable git autocomplete; from here: https://apple.stackexchange.com/questions/55875/git-auto-complete-for-branches-at-the-command-line
RUN curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o $HOME/.git-completion.bash
RUN test -f $HOME/.git-completion.bash && . $_
RUN /bin/bash -c "source $HOME/.git-completion.bash; __git_complete g __git_main"

# Enable tab completion for `g` by marking it as an alias for `git`
RUN /bin/bash -c "echo -e '\
\n\
alias g=\"git\"\n\
if type _git &> /dev/null; then\n\
    complete -o default -o nospace -F _git g;\n\
fi;\
' >> $HOME/.bashrc"

# add a nice prompt
RUN /bin/bash -c "echo -e '\
\n\
BlueBgWhiteFg=\"\[\033[48;2;49;101;196m\033[38;5;0m\]\" \n\
GreenBgWhiteFg=\"\[\033[42m\033[38;5;0m\]\" \n\
WhiteBgBlackFg=\"\[\033[48;2;204;204;204m\033[38;5;0m\]\" \n\
NoBgGreyFg=\"\[\033[0m\033[38;5;240m\]\" \n\
Reset=\"\[\033[0m\]\" \n\
export PS1=\"\${GreenBgWhiteFg}\u@\h \${WhiteBgBlackFg} [\w] \${NoBgGreyFg} > \${Reset}\"\n\
' >> $HOME/.bashrc"


# not important for this class, but important for some crypto and security classes
RUN rm /dev/random && ln -s /dev/urandom /dev/random

# This line makes it impossible to manually install software inside the container
# RUN rm -rf /var/lib/apt/lists/*

# it will be created even if it doesn't exist
WORKDIR /passthru

# this gets overwritten if the use provides any runtime cmdline args
CMD "/bin/bash"
# whereas this gets appended to when using `docker run <image> [cmd]`
ENTRYPOINT "/bin/bash"
