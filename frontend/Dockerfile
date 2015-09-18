FROM node:0.12.7

RUN mkdir /app
RUN mkdir /app/node_modules
ADD * /app/
ADD node_modules /app/node_modules/

EXPOSE 80

WORKDIR /app
CMD ["node", "index.js"]