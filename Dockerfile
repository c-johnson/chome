FROM ubuntu

# Install dependencies
RUN apt-get update
RUN apt-get install -y git ack-grep vim curl wget tmux build-essential python-software-properties nginx

# Add configuration files
# TODO: ADD nginx conf
#   DEST=/etc/nginx/sites-available/server

# Install the Go runtime (through godeb)
# http://blog.labix.org/2013/06/15/in-flight-deb-packages-of-go
RUN mkdir /go
RUN cd /go
RUN curl -L https://godeb.s3.amazonaws.com/godeb-amd64.tar.gz | tar zx
RUN ./godeb install

# install source code
RUN mkdir /go/server
RUN cd /go/server
# TODO: add this source code

RUN cd /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/servr
RUN nginx -s reload


EXPOSE 9000

