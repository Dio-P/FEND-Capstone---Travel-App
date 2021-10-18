# Travelling Weather App

## Description

By entering the date and the destination of your travel, the app returns the weather prediction for the day of travelling, a picture of the city and some general information about the country you are visiting.

### In greater detail:

1. This app is getting a country/city input from the U.I, passing it to a first API that returns the latitude and longitude values. 
2. Then those values are sent to a second API that either (option 1) predicts the weather if the date given is within a 16 day period, or (option 2) return the historic weather of the previous year, to return this as a "usual for the period temperature". 
3. Then, a third API call is getting a picture from the visited city to update the U.I with.
4. There is also a fourth call to rest Countries API that gets some additional information about the country, with which a third U.I. section/card is updated.

- The above, is one I have chosen from the additional requirements list.
- Of the same list I have chosen a second one: the addition of a starting and ending date and the addition of the showing of the total days the trip will start.

### This project among others is using:

- Webpack5
- Express
- Jest
- Service Workers
- SASS (Scss)
- Babel

#### It was made by Dio Papadopoulos as part of the Udacity's front end developer course.

