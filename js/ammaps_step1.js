(function ($) {
    'use strict'

var quizCountries =  [{name: "Lebanon", id: "LB", flag: "img/lebanon.jpg"}, 
                      {name: "Russia", id: "RU", flag: "img/russia.jpg"},  
                      {name: "South Africa", id: "ZA", flag: "img/southAfrica.jpg"},  
                      {name: "United States", id: "US", flag: "img/unitedStates.jpg"}, 
                      {name: "China", id: "CN", flag: "img/china.jpg"}, 
                      {name: "Australia", id: "AU", flag: "img/australia.jpg"}, 
                      {name: "Chile", id: "CL", flag: "img/chile.jpg"}, 
                      {name: "India", id: "IN", flag: "img/india.jpg"}, 
                      {name: "Italy", id: "IT", flag: "img/italy.jpg"}, 
                      {name: "Norway", id: "NO", flag: "img/norway.jpg"},
                        ];

var counter = 0;

$(document).ready(function() {

// add all your code to this method, as this will ensure that page is loaded
    AmCharts.ready(function() {

        // create AmMap object
        var map = new AmCharts.AmMap();
        // set path to images
        map.pathToImages = "ammap/images/";

        /* create data provider object
         map property is usually the same as the name of the map file.

         getAreasFromMap indicates that amMap should read all the areas available
         in the map data and treat them as they are included in your data provider.
         in case you don't set it to true, all the areas except listed in data
         provider will be treated as unlisted.
        */
        var dataProvider = {
            map: "worldLow",
            getAreasFromMap:true
        }; 

        // pass data provider to the map object
        map.dataProvider = dataProvider;

        /* create areas settings
         * autoZoom set to true means that the map will zoom-in when clicked on the area
         * selectedColor indicates color of the clicked area.
         */
        map.areasSettings = {
            autoZoom: true,
            selectedColor: "#CC0000",
            color: "#798186",
            balloonText: ""
        };

        // let's say we want a small map to be displayed, so let's create it
        map.smallMap = new AmCharts.SmallMap();

        // write the map to container div
        map.write("mapdiv");


        //Yazane's Code

        $("#startGame").on("click", function(){

                $("#score").on("click", function(event){
                    event.preventDefault()

                        var genFlag = Math.floor(Math.random()*9) + 1;

                        $("#flag").empty();
                        $("#flag").append("<img src=" + quizCountries[genFlag].flag + ">");
                        
                        map.addListener("clickMapObject", function(event) {
                            
                            if(event.mapObject.id === quizCountries[genFlag].id) {
                                counter++;
                                console.log(counter);
                                $("#q" + counter).removeClass("unanswered");
                                $("#q" + counter).addClass("correct");
                            }

                            else {
                                counter++;
                                console.log(counter);
                                $("#q" + counter).removeClass("unanswered");
                                $("#q" + counter).addClass("incorrect");    
                            }
                        });
                });

        });


    });
});

}(jQuery))
