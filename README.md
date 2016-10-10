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
![map_hover](https://cloud.githubusercontent.com/assets/19288804/19245186/609dfce4-8ee5-11e6-9434-1f9658dc0205.jpg)

### Unemployment Rate for single state(Selected on Map) on Time series and coloring of Map after selection
![unemp_rate_one_state](https://cloud.githubusercontent.com/assets/19288804/19245197/6ef99fa0-8ee5-11e6-8124-06f075643402.JPG)


### Selecting Multiple sates on Map and generating Multiseries graph
![multiple_states_comparison_allyrs](https://cloud.githubusercontent.com/assets/19288804/19245255/b730073c-8ee5-11e6-8066-54d5a5626f2f.jpg)

### Slider for selecting a subset of years 
![slider](https://cloud.githubusercontent.com/assets/19288804/19245300/e613082e-8ee5-11e6-84a0-58334290de67.jpg)

### Interactivity of Graph on Hover 
![hover_on_chart](https://cloud.githubusercontent.com/assets/19288804/19245308/f03c4036-8ee5-11e6-83d4-f9fd6b3d5905.jpg)

### Generating Multiseries on clicking all states button 
![all_states](https://cloud.githubusercontent.com/assets/19288804/19245314/fae6402c-8ee5-11e6-946e-470c5b14c266.jpg)

### Clear everything on clicking clear all button
![clear_all](https://cloud.githubusercontent.com/assets/19288804/19245320/05bd4a86-8ee6-11e6-86b3-63cac03cfa15.jpg)


## Video showing functionalities is as follows

![video](https://cloud.githubusercontent.com/assets/19288804/19246691/37394c84-8eed-11e6-8ad6-2ff0f208e299.jpg)](https://github.com/vibhutittu/DataVis_Proj/blob/master/project1_video_vibhuti.mp4)



https://github.com/vibhutittu/DataVis_Proj/blob/master/project1_video_vibhuti.webm

## Link for my web application is 
https://vibhutittu.github.io/DataVis_Proj/Final_test.html

## My github link
https://github.com/vibhutittu/DataVis_Proj




