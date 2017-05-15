# Music-Recommender-System
A WebApp having Music Player and Music Recommender System

### Information
* The Music Recommender System suggests the songs related to those searched and played by a user as well as those which are played by selecting from the user's hard disk.
* It is made using Node.js as the backend language with Python used for recommendation system
* The songs are recommended using the Python Machine Learning code. **Python version 2.7 is used with [Panda](http://pandas.pydata.org) library used for dataframes**
* **IT MAKES USE OF THE API OF [last.fm](https://www.last.fm/api) TO SHOW THE RESULTS OF A SEARCHED QUERY**
* It contains an Offline Music Player which can be used to play songs by selecting them from the client's system

### Requirements
* [Python version 2.7](https://www.python.org/downloads/) for Machine Learning code
* [Node.js](https://www.nodejs.org) installed with some core modules : **body-parser, ejs, express, express-session, fs, mongoose, python-shell**
* [MongoDb](https://www.mongodb.com) for data storage of the users. In this probject [MongoLab](https://www.mlab.com/) is used.

## Directions
* **Change the PythonPath variable in the process/index.js (Line 133 and Line 170) file to the python executable to run the Python Machine Learning code**
* **Change the Mongo connection URL in the config/connectMongo.js (Line 9) file to the url of the MongoDb connection**
* **Change the Mongo username and password in the config/database.js file for the mongo connection**

## Limitations
* The Music Recommender System needs the data for the song for which suggestions are to given. The data is stored in the files process/online.csv and process/offline.csv
* The names of a same song stored on different users' disks may have different names. So the recommendations may not be efficient.
