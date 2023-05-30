FROM nginx:1.19.1-alpine

WORKDIR /data

RUN ["sed","-i", "s/ css;/ css rawcss;/g", "/etc/nginx/mime.types"]

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docs/.vitepress/dist /data

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]