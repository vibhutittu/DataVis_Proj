# DataVis_Proj
This is the project for data visualization of time series using D3 and javascript.

The steps for developing this project are given below

# Data Collection

I have used R for data collection from Bureau of labor statistics site using blsAPI. The r script is Extraction.R and final data collected is in final_data.csv file. I have columns as year, month,states and unemployment rate of each state in dataset.

# Web Application
 
I have developed an interactive web based application using d3 and html,css.
There is a separate folder for css, html, javascript and data

My application includes a responsive map of all US states which provides the information of each state on the map. On clicking each state on the map , it generates a multiseries line graph having date on x-axis and unemployement rate on y-axis. 

The unemployment rates of each state can be compared on the multiseries . The multiseries line graph provides a comparison of unemployment rates in each state form year 1976-2016.

Basic Functionalities are shown below along with Screenshots.

### State names on placing mouse on map


### Unemployment Rate for single state(Selected on Map) on Time series and coloring of Map after selection

### Selecting Multiple sates on Map and generating Multiseries graph

### Slider for selecting a subset of years 

### Interactivity of Graph on Hover 

### Generating Multiseries on clicking all states button 


### Clear everything on clicking clear all button




# Video showing functionalities is as follows
https://github.com/vibhutittu/DataVis_Proj/blob/master/project1_video_vibhuti.webm

#Link for my web application is 
https://vibhutittu.github.io/DataVis_Proj/Final_test.html

#My github link
https://github.com/vibhutittu/DataVis_Proj




