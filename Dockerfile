FROM node:18 
#Add a work directory
WORKDIR /app
#Copy dependencies
COPY ./package.json ./package-lock.json[t] ./yarn.lock[t] ./
COPY . .
#Install dependencies
RUN yarn install -f && yarn add -D @swc/cli @swc/core && yarn add next@12.2.2 && yarn add --dev @types/react
RUN yarn add next@latest
RUN yarn upgrade react@latest react-dom@latest
#Build command
RUN yarn build 
#Expose port
EXPOSE 3000
#Start the app
CMD yarn start
