# Build: docker build -t cscanigo/tomcat7-java7 .
# Run: 	 docker run -v /home/canigo/Documents/workspace-sts-3.7.1.RELEASE/equipaments/target/demo-equipaments/AppJava:/var/lib/tomcat7/webapps/demo-equipaments/AppJava -p 8080:8080 8000:8000 cscanigo/tomcat7-java7
# SSH:   docker exec -it tomcat7-java7 bash

FROM ubuntu:14.04
MAINTAINER oficina-tecnica.canigo.ctti@gencat.cat
RUN apt-get update && apt-get -y upgrade

RUN apt-get -y install software-properties-common
RUN add-apt-repository ppa:webupd8team/java
RUN apt-get -y update

# Accept the license
RUN echo "oracle-java7-installer shared/accepted-oracle-license-v1-1 boolean true" | debconf-set-selections

RUN apt-get -y install oracle-java7-installer

# Here comes the tomcat installation
RUN apt-get -y install tomcat7
RUN echo "JAVA_HOME=/usr/lib/jvm/java-7-oracle" | tee --append /etc/default/tomcat7
RUN echo "JAVA_OPTS=\"-Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n\"" | tee --append /etc/default/tomcat7

# Expose the default tomcat ports
EXPOSE 8080
EXPOSE 8000

ADD run.sh /root/run.sh
RUN chmod +x /root/run.sh

CMD ["/root/run.sh"]