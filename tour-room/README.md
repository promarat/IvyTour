# Getting Setup
This repo contains a react app and server

# React APP
please create a .env file in the root directory <br />
inside the env set PORT=3006 <br />
and continue to follow env.example 

# Running React APP
First off npm i <br />
and then npm start <br />
and go to http://localhost:3006<br /> <br />

There should only be two pages guide which is root "/"
and student<br /> <br />

On student page in order to join call a link will have to be used that 
is generated on the guide page.

the student link will look like http://localhost:3006/?at=<token> <br /> <br />

In order to get into guide view a request will have to be made to server
at localhost:5000 in order to get authentication token.

# Server app
please create a .env file in server folder <br />
make sure to set CLIENT_URL to the address of the React APP above <br />
-- follow the env.example

# Running Server
npm i <br />
npm start 
