var result = document.getElementById("json-result");
const Http = new XMLHttpRequest();
function getLocation() {
    console.log("getLocation Called");
    var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client"

    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            bdcApi = bdcApi
                + "?latitude=" + position.coords.latitude
                + "&longitude=" + position.coords.longitude
                + "&localityLanguage=en";
            getApi(bdcApi);

        },
        (err) => { getApi(bdcApi); },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
}
function getApi(bdcApi) {
 $.get(bdcApi , function(data) {
     console.log(data.city);
     console.log(data.principalSubdivision);
     if(data.city == '') {
      data.city = data.principalSubdivision;
        if(data.city == "Phú Yên" || data.principalSubdivision == "Phú Yên"){
          data.city = "Thành phố tuy hòa"}
      document.querySelector(".bar-weather-content-input-search").setAttribute("value" ,data.city)
     document.querySelector(".bar-weather-content-input-icon").click();
     }else{
       if(data.city == "Phú Yên" || data.principalSubdivision == "Phú Yên"){
         data.city = "Thành phố tuy hòa";
        document.querySelector(".bar-weather-content-input-search").setAttribute("value" ,data.city)
        document.querySelector(".bar-weather-content-input-icon").click();
       }else{
           document.querySelector(".bar-weather-content-input-search").setAttribute("value" ,data.city)
        document.querySelector(".bar-weather-content-input-icon").click();
       }
 }
})
}
function heightLength() {
    var height  = window.innerHeight; 
    var x = height; 
    document.querySelector(".app").style.height = height + "px";
}
heightLength()
getLocation() 
