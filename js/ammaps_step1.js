(function ($) {
    'use strict'

var countriesDB =  [{name: "Lebanon", id: "LB", flag: "img/lebanon.jpg"}, 
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
var genFlag = 0;
var score = 0;
var quizCountries = []

$(document).ready(function() {

// AMMAP CODE - START
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
            autoZoom: false,
            selectedColor: "#CC0000",
            color: "#3b3a36",
            balloonText: "",
            selectable: true
        };

        // write the map to container div
        map.write("mapdiv");

// AMMAP CODE - END

//YAZANE'S CODE

    $("#startGame").click(function(event) {
        event.preventDefault();
        init();
        playGame();

        $("#mapdiv").on("click", function(event){
          {
            event.preventDefault();
            if(counter > 5) {
              alert("Good Job! Your Score Is: " + score + "/5");
              init();
            }
          };
        });
    });

  function init() {
    quizCountries = countriesDB;
    counter = 1;
    score = 0;
    $("#score").empty();
    $("#score").append("<h2>SCORE: 0/5</h2>");
    $("#flag").empty();
    for(var i = 1; i < 6; i++) {
      $("#q" + i).addClass("unanswered");
      $("#q" + i).removeClass("correct");
      $("#q" + i).removeClass("incorrect");
    }
  }

  function flag() {
      genFlag = Math.floor(Math.random()*(quizCountries.length-1)) + 1;
      $("#flag").empty();
      $("#flag").append("<img src=" + quizCountries[genFlag].flag + ">");
  }

  function playGame() {
       flag();
       
        map.addListener("clickMapObject", function(event) {
          
          if(event.mapObject.id === quizCountries[genFlag].id) {
            $("#q" + counter).removeClass("unanswered");
            $("#q" + counter).addClass("correct");
            $("#score").empty();
            $("#score").append("<h2>SCORE: " + ++score + "/5</h2>");
            quizCountries.splice(genFlag, 1);
            counter++;
            flag();
          }

            else {
              $("#q" + counter).removeClass("unanswered");
              $("#q" + counter).addClass("incorrect");
              quizCountries.splice(genFlag, 1);
              counter++;
              flag();

          }


        });
  }

  });
});

}(jQuery))


