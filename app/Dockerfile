# Dockerfile for dev
FROM node:10.14.1
EXPOSE 8080
WORKDIR /bindmount
# Hopefully you'd never actually do this, just copy everything, including locally installed node_modules
COPY ./ ./
RUN npm install 
CMD npm run dev
# webpack-dev-server --host 0.0.0.0 --hot --inline
