# Supnex Project
this project implemented by nodejs platform and nestjs framework, we use mongodb as database, becuase of high speed in embeding document and we dont have low speed of joining tables.
# Documentation
we use swagger for source code and api documentation. in nestjs done with @nestjs/swagger
for reading documentation you must see http://localhost:3000/document
# Containerzation
we use docker for make container and we use docker-compose for automate some tasks like making container for database and app and connect these two container through network
# Event
for interacting between two modules without making modules dependent on each other we use event emiter
# Why We Use Embeding Instead of Joining Tables With Each Other
in this use case that we implemented, i think save duplicated data dont have any costs for storage , because today the storage have huge amount of place to save data , another problem solved by events, the problem is how we update duplicated data, for this we use event emitter to aware of updating
# Why Husky ????
with husky we can do some tasks before some event on git, forexample in this use case we want to run our tests , and if test done successfully , pushing source code to remote code repository, or we want to set branch name based on some rules and patterns and if dont follow that pattern , dont allow to push , for that we use husky
# How Run The application locally ?
- sudo chmod +x ./starter.sh
- sudo ./starter.sh
- on the background this bash file will run the docker container