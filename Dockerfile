FROM nginx:1.11.5
ADD nginx.conf /etc/nginx/nginx.conf
ADD dist /usr/share/nginx/html
EXPOSE 80
