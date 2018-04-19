$(document).ready(function(){
var apiKeyWeather = "8576ce11abd01f85c5483b036ca8720a";

//week days for unix timestamp conversion
var weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  //skycons
  var skycons = new Skycons({
    "monochrome": false,
    "colors" : {
        "cloud" : "#fff",
        "main" : "#fff",
        "moon" : "#fff",
        "fog" : "#fff",
        "fogbank" : "#fff",
        "snow" : "#fff",
        "leaf" : "rgb(229, 105, 60)",
        "rain" : "rgb(188, 24, 136)",
        "sun" : "rgb(240, 149, 51)"
    }
  });


  //show spinner when making api request
$(document).ajaxStart(function(){
    $(".main-container").hide();
    $(".loading-container").show();
})

$(document).ajaxStop(function(){
   $(".loading-container").hide();
   $(".main-container").show();
})

    $.ajax({
        method:"GET",
        url:"https://ipapi.co/json/",
        dataType: "json",
        }).done(handleLocation).fail(handleError);

    function handleLocation(locationObj){
        $(".city").html("<span>"+ locationObj.city +"</span>")
        console.log(locationObj);
        $.ajax({
            method:"GET",
            url:"https://api.darksky.net/forecast/"+ apiKeyWeather +"/"+locationObj.latitude+","+locationObj.longitude+"?units=si",
            dataType: "jsonp"
            }).done(handleWeather).fail(handleError);
    }

    function handleWeather(weatherObj){
        console.log((weatherObj.currently.icon).toUpperCase());

        //current weather
        $("#current-temp").html(Math.round(weatherObj.currently.temperature) + "&deg;C");
        $("#current-cloud-cover").text(Number(weatherObj.currently.cloudCover)*100 + " %");
        $("#current-wind-speed").text(weatherObj.currently.windSpeed +" m/s");
        $("#current-precip-prob").text(weatherObj.currently.precipProbability);
        skycons.add("icon1", Skycons[(weatherObj.currently.icon).toUpperCase().replace(/-/g, "_")]);
        //forecast
        var date1 = new Date(weatherObj.daily.data[1].time*1000);
        $(".first-container .day").text(weekday[date1.getDay()]);
        skycons.add("icon2", Skycons[(weatherObj.daily.data[2].icon).toUpperCase().replace(/-/g, "_")]);
        $(".first-container .temp-high").html(Math.round(weatherObj.daily.data[2].temperatureHigh)+ "&deg;C");
        $(".first-container .temp-low").html(Math.round(weatherObj.daily.data[2].temperatureLow)+ "&deg;C");

        var date2 = new Date(weatherObj.daily.data[2].time*1000);
        $(".second-container .day").text(weekday[date2.getDay()]);
        skycons.add("icon3", Skycons[(weatherObj.daily.data[3].icon).toUpperCase().replace(/-/g, "_")]);
        $(".second-container .temp-high").html(Math.round(weatherObj.daily.data[3].temperatureHigh)+ "&deg;C");
        $(".second-container .temp-low").html(Math.round(weatherObj.daily.data[3].temperatureLow)+ "&deg;C");

        var date3 = new Date(weatherObj.daily.data[3].time*1000);
        $(".third-container .day").text(weekday[date3.getDay()]);
        skycons.add("icon4", Skycons[(weatherObj.daily.data[4].icon).toUpperCase().replace(/-/g, "_")]);
        $(".third-container .temp-high").html(Math.round(weatherObj.daily.data[4].temperatureHigh)+ "&deg;C");
        $(".third-container .temp-low").html(Math.round(weatherObj.daily.data[4].temperatureLow)+ "&deg;C");

        var date4 = new Date(weatherObj.daily.data[4].time*1000);
        $(".fourth-container .day").text(weekday[date4.getDay()]);
        skycons.add("icon5", Skycons[(weatherObj.daily.data[5].icon).toUpperCase().replace(/-/g, "_")]);
        $(".fourth-container .temp-high").html(Math.round(weatherObj.daily.data[5].temperatureHigh)+ "&deg;C");
        $(".fourth-container .temp-low").html(Math.round(weatherObj.daily.data[5].temperatureLow)+ "&deg;C");

        var date5 = new Date(weatherObj.daily.data[5].time*1000);
        $(".fifth-container .day").text(weekday[date5.getDay()]);
        skycons.add("icon6", Skycons[(weatherObj.daily.data[6].icon).toUpperCase().replace(/-/g, "_")]);
        $(".fifth-container .temp-high").html(Math.round(weatherObj.daily.data[6].temperatureHigh)+ "&deg;C");
        $(".fifth-container .temp-low").html(Math.round(weatherObj.daily.data[6].temperatureLow)+ "&deg;C");


 
        skycons.play();
        //
    }

    function handleError(error){
        alert("can't access api");
    }

  
    
        
});
