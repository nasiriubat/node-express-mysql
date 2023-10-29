A simple node js api project using node,express and mysql

Installation: 
-------------

1. clone this repository
2. connect your database from .env
2. run npm install & npm start 

API endpoints:
--------------

//tutorial module

Get all tutorial                       | GET               | http://localhost:3000/api/tutorials

Search by title                       | GET               | http://localhost:3000/api/tutorials?title=searchkeyword

Get all published tutorials                      | GET               | http://localhost:3000/api/tutorials/published

Create new tutorial                     | POST              | http://localhost:3000/api/tutorials

Get single posts                    | GET               | http://localhost:3000/api/tutorials/1

Update post                         | PUT             | http://localhost:3000/api/tutorials/1

Delete single post                         | DELETE            | http://localhost:3000/api/tutorials/1

Delete all post                         | DELETE            | http://localhost:3000/api/tutorials


