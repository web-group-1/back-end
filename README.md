
## How to clone and run this app on a computer
1. clone both the back-end and client repositories
2. install all the dependancies with `yarn install`
3. migrate the prisma schema to the database with `npx prisma migrate dev` and generate prisma client classes with `npx prisma generate`
4. run the server with `yarn start`
5. from the client repository, open the index page.

## What the app is all about
It-study (this app) allows users to explore the course catalog and register for courses. Users can also create their own courses and have other users register for them. They can unregister, edit the courses they created and delete those courses. Users can see and modify their profile information, including deleting their account.

## The features included
We have included the functionality to do CRUD operations on two resources: users and courses. The front-end provides ways to create, read, update and delete these resources.

## Discussion of implementation decisions we took
we are using a relational database namely, sqlite, because of a couple of reasons:
1. our data contains mildly complicated realtionship between entities. Courses and Users have both one to many and many to many relationship based on two fields: registration and authorship.
2. sqlite makes it easy to clone the code and run the app on a computer because there will be no need to install a DBMS and run it in the background. the sqlite database (*.db file) gets created upon migrating the prisma schema.
