FROM dockershelf/node:20
LABEL maintainer="Luis Alejandro Martínez Faneyth <luis@luisalejandro.org>"

ARG UID=1000
ARG GID=1000

RUN apt-get update && \
    apt-get install -y gnupg dirmngr sudo && \
    rm -rf /var/lib/apt/lists/*

RUN EXISTUSER=$(getent passwd | awk -F':' '$3 == '$UID' {print $1}') && \
    [ -n "${EXISTUSER}" ] && deluser ${EXISTUSER} || true

RUN EXISTGROUP=$(getent group | awk -F':' '$3 == '$GID' {print $1}') && \
    [ -n "${EXISTGROUP}" ] && delgroup ${EXISTGROUP} || true

RUN groupadd -g "${GID}" luisalejandro-org || true
RUN useradd -u "${UID}" -g "${GID}" -ms /bin/bash luisalejandro-org
RUN echo "luisalejandro-org ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/luisalejandro-org

USER luisalejandro-org

RUN mkdir -p \
    /home/luisalejandro-org/app \
    /home/luisalejandro-org/.npm

WORKDIR /home/luisalejandro-org/app

CMD ["tail", "-f", "/dev/null"]
