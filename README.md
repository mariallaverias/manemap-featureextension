
# About

This project is called ManeMap,and it was originally built by [Miselta Ihekoba](https://github.com/miselta). Manemap is a directory of beauty supply products & stores geared mainly towards the black community and individuals with curly & afro-hair types. The purpose of the app is to help locating specialized beauty supply stores & products.

# Key Features Implemented

This project was built on top of a legacy app. 

The main features implemented in the feature-extension phase where:

authentication, authorization and role-based data visualization. This would allow store users to update inventory and edit store-related information.

The search feature was also optimized to take in 1 or more parameters to search.

Some minor styling was applied to highlight local stores and black-owned stores.

#Main technonolgies used: 

JSON Web Token, Bcrypt, Node.js, Express.js, React, React Router.

# Database

The database consists of four tables - products, stores, and the junction table called products_stores and users.

Take a look at the `INIT_DB.SQL` file in the model folder for the current database information, and run `npm run migrate` to update the database with this information. 

To setup the database:

- In your MySQL CLI create a new database called hair, run the command: `create database hair;`
- In VSCode: create a `.env` file with the following information:
  DB_HOST=localhost
  DB_USER=(your user)
  DB_NAME=hair
  DB_PASS=(your password here)
  SECRET_KEY=(Your secret key string phrase here)
- Add the line `.env` to your `.gitignore` file.


# BE/FE Setup

- After you clone the git repository, run `npm install` in your terminal.
- Then, run `npm start` to start the server.
- Then, run `cd client` on the project folder to access the client folder, and run `npm start` again to run the client.

# Additional Feature Extension Ideas

- Having a store search, similar to the product search. Also being able to search stores by products they have.
- Being able to make product recommendations based on hair type.
- Product & store reviews.
- More cities and countries.
- Including ways to find hair salons and protective hairstylists as well, also by location.

This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona.

The store names aer fictional and the images used for the stores or the logo are not ours, and some were manually combined.  The store image's sources are:
- for Diva Hair Store  [this](https://images.bizbuysell.com/shared/listings/196/1966666/0526ea4f-423e-4f1f-b2b7-530e8f20ef6d-W496.jpg) 
- for Angel Beauty Supply [this](https://www.gannett-cdn.com/presto/2022/01/28/PPEN/5a3a282f-dd35-4bb2-bdff-ddcbaaca65dc-JoJos_Beauty_Supply-001.jpg?crop=2999,1687,x0,y381&width=660&height=372&format=pjpg&auto=webp)
- for Palacio del Afro [this](https://s3-media0.fl.yelpcdn.com/bphoto/ihHkLumMeswOR_XXfeICAw/l.jpg)
- for Hairopolis  [this](https://archives.rgnn.org/wp-content/uploads/2019/08/2-750x500.jpg)

