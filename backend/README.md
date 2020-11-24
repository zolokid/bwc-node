# bwc-campaign-backend

# Production Build
`docker-compose up -d`

 Make it rebuild!!
`docker-compose up --build`

## Normal Run just 
`yarn start`  

## Forever running  
_Refer to https://www.npmjs.com/package/forever_ 

`npm install forever -g`  
`forever start ./index.js -o ./output.log -e ./error.log -l ./forever.log`