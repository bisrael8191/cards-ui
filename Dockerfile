###
# Cards NodeJS UI container
#
# build: docker build -t bisrael8191/cards-ui:<VERSION> .
# test: docker run --rm bisrael8191/cards-ui:<VERSION> npm test
# run: docker run --rm -d --name=cards-ui -p 80:80 bisrael8191/cards-ui:<VERSION>
###

FROM nginx:1.7.11
MAINTAINER Brad Israel "bisrael8191@gmail.com"

# Copy the nginx server config
COPY nginx-config /etc/nginx/nginx.conf

# Copy the nginx site config
COPY nginx-site-config /etc/nginx/conf.d/default.conf

# Copy the source except anything in .dockerignore
RUN mkdir -p /var/www/cards
COPY dist/ /var/www/cards/

# Reset permissions to the www user
RUN chown -R www-data:www-data /var/www/cards
