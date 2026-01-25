FROM dockershelf/node:20
LABEL maintainer="Luis Alejandro Martínez Faneyth <luis@luisalejandro.org>"

ARG UID=1000
ARG GID=1000

RUN apt-get update && \
    apt-get install gnupg dirmngr sudo

RUN npm install -g yarn

RUN EXISTUSER=$(getent passwd | awk -F':' '$3 == '$UID' {print $1}') && \
    [ -n "${EXISTUSER}" ] && deluser ${EXISTUSER} || true

RUN EXISTGROUP=$(getent group | awk -F':' '$3 == '$GID' {print $1}') && \
    [ -n "${EXISTGROUP}" ] && delgroup ${EXISTGROUP} || true

RUN groupadd -g "${GID}" luisalejandro || true
RUN useradd -u "${UID}" -g "${GID}" -ms /bin/bash luisalejandro

RUN echo "luisalejandro ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/luisalejandro

USER luisalejandro

RUN mkdir -p \
    /home/luisalejandro/app \
    /home/luisalejandro/.cache/yarn

WORKDIR /home/luisalejandro/app

CMD ["tail", "-f", "/dev/null"]
