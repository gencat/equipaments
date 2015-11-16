# Build: docker build -t cscanigo/httpd:2.4 .
# Run: 	 docker run -v /home/canigo/Documents/workspace-sts-3.7.1.RELEASE/equipaments/client:/usr/local/apache2/htdocs/demo-equipaments -p 80:80 cscanigo/httpd:2.4
# SSH:   docker exec -it cscanigo/httpd:2.4 bash

FROM httpd:2.4
COPY ./canigo-httpd.conf /usr/local/apache2/conf/httpd.conf