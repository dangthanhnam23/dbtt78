
const input = document.querySelector(".bar-weather-content-input-search");
const none = '--'
const APP_ID = '0e4674234129b91b4de3142d1983a3c5';
const weather  =document.querySelector(".weather");
const ctiyName = document.querySelector(".ctiyname");
const Sunrise = document.querySelector(".Sunrise");
const sundown = document.querySelector(".sundown");
const sound = document.querySelector(".sound");
const wind = document.querySelector(".wind");
const temperature = document.querySelector(".temperature")
const time = document.querySelector(".bar-weather-content-info-time")
const day = document.querySelector(".bar-weather-content-info-day")
const d = new Date();
let Hours = d.getHours();
let Minutes = d.getMinutes();
let Seconds = d.getSeconds();
let getCtiys = "";
console.log(screen.height);
if(Hours < 10 ) {
    console.log("0" + Hours);
    Hours = "0" + Hours;
}
if(Minutes < 10 ) {
    Minutes = "0" + Minutes;
}   
if(Seconds < 10 ) {
    Seconds = "0" + Seconds;
}
document.querySelector(".bar-weather-content-input-icon").onclick =function(e) {
     var input = document.querySelector(".bar-weather-content-input-search").value;
     getweather(input)
}
function getweather(text) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${APP_ID}&units=metric&lang=vi`)
    .then(async res=>{
     const data = await res.json();
     getCtiys = data.name;
     console.log(data);
     if(data.message == "city not found") {
        getjson(text);
     }else {
        ctiyName.innerHTML = data.name || none;
        weather.innerHTML = "Thời tiết hiện tại:  " + data.weather[0].description || none;
        temperature.innerHTML = 'Nhiệt độ hiện tại: ' + Math.round(data.main.temp) + " độ" || none; 
        sound.innerHTML = "độ ậm: "  +  data.main.humidity || none;
        wind.innerHTML = "Tốc độ gió: "  + (data.wind.speed * 3.6).toFixed(2) + "/Km" || none;
        Sunrise.innerHTML = "mặt trời mọc: "   + moment.unix(data.sys.sunrise).format('H:mm') || none;
        sundown.innerHTML = "mặt trời lặng : "  + moment.unix(data.sys.sunset).format('H:mm') || none;
        time.innerHTML = "Thời gian: " + Hours + ":" + Minutes + ":" + Seconds;
        if(data.name) {
           localStoragereview(data.name);
           cancelhistory();
        }
        responsiveVoice.setDefaultRate(1.0);
        responsiveVoice.speak( "Chào Buổi Chiều " +  "                      ." +
        "Bây Giờ: " + Hours + "Giờ" + ":" + Minutes + "Phút" + ":" + Seconds + "Giây" + "              ." +
            "Thời tiết" + data.name + "hiện tại: " + data.weather[0].description  +  "             ." +
        'Nhiệt độ hiện tại: ' + Math.round(data.main.temp) + "Độ" +  " .           " +
        "độ ậm: "  +  data.main.humidity  +   " .               " + 
        "mặt trời mọc: "   + moment.unix(data.sys.sunrise).format('H:mm')  +  " .            " +
        "mặt trời lặng : "  + moment.unix(data.sys.sunset).format('H:mm') +  " .           "   + 
        "Chúc Bạn có một ngày vui vẻ ..."
        , "Vietnamese Male");
        document.getElementById('sound').play();
        tuonglai(data.name);
     }
    });
}  
function getCtiy(){
    var datas; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getCtiys}&appid=${APP_ID}&units=metric&lang=vi`)
    .then(async res=>{
        const data = await res.json();
        var datas = data.name;
    })
    return datas
}
function actionhistory() {
    var itemhistorys = document.querySelectorAll(".bar-weather-content-input-history-item-click");
    for(i  = 0 ; i < itemhistorys.length ; i++ ) {
        console.log(itemhistorys[i]);
        itemhistorys[i].onclick = function() {
            console.log("đã chạy đây");
          var x = this.innerText; 
          changevalue(x)
        }
    }
} 
function changevalue(x) {
    localStoragereview(x)
  document.querySelector(".bar-weather-content-input-search").setAttribute("value", x);
  document.querySelector(".bar-weather-content-input-icon").click();
  cancelhistory()
}
function localStoragereview(x) {
    let i = 0;
    if(localStorage.getItem("history")) {
        let getstorage =JSON.parse(localStorage.getItem("history"));
        getstorage.map(function(item){
            console.log( "day la x ", x);
            if(item.name == x) {
               item.value++
            }else {
                i++;
            }
        })
        if(i == getstorage.length) {
            let objcet  = {
                name: x , 
                value : 1,
            }
            getstorage.push(objcet);
        }
        sapxep(getstorage);
    }else {
        let objcet  = {
            name: x , 
            value : 1,
        }
        let array = []; 
        array.push(objcet);
        localStorage.setItem("history" , JSON.stringify(array))
    }
}
actionhistory()
document.querySelector(".bar-weather-content-input-search").onclick = function() {
    microphone.click();
    outputdata();
    showhistory();
    actionhistory() 
}
function cancelhistory()  {
    document.querySelector(".bar-weather-content-input-history").style.display = "none";
  document.querySelector(".bar-weather-content-input-icon i ").setAttribute("class" , "fas fa-search")
}
function showhistory()  {
   document.querySelector(".bar-weather-content-input-history").style.display = "block";
 document.querySelector(".bar-weather-content-input-icon__delete").style.display = "flex";
   document.querySelector(".bar-weather-content-input-search").style.width = "70%";
   document.querySelector(".bar-weather-content-input-icon__delete").onclick = function() {
    cancelhistory();
        document.querySelector(".bar-weather-content-input-search").style.width = "81%";
      document.querySelector(".bar-weather-content-input-icon__delete").style.display = "none";
}
}
function outputdata() {
    let getstorage =JSON.parse(localStorage.getItem("history"));
    console.log(getstorage);
    var html = ''; 
    for(i = 0 ; i < getstorage.length; i++) {
        html += "<li class='bar-weather-content-input-history-item'>" +
        "<p class='bar-weather-content-input-history-item-click'>" +
        getstorage[i].name + 
       " </p>" + 
       "</li>"
    }
    document.querySelector(".bar-weather-content-input-history-list").innerHTML = html;
}
function sapxep (getstorage) {
    console.log(getstorage);
    getstorage.sort(function(a , b ) {
        return  b.value - a.value;
     });
     localStorage.setItem("history" , JSON.stringify(getstorage));
     outputdata()
}
actionhistory()
document.querySelector(".bar-weather-future-list-item__btn-future").onclick = function() {
    var text = document.querySelector(".ctiyname").innerText; 
    setdata(text);
    window.location.href = '/thoitiet.html';
}
function setdata(x) {
    localStorage.setItem("Getbody" , JSON.stringify(x) )
};
function setimg() {
    console.log(d.getHours());
    if(d.getHours() >= 3 &&  d.getHours() < 6 ) {
        console.log(document.querySelector(".cssa"));
        document.querySelector(".css").innerHTML = "<link rel='stylesheet' href='dark.css'>";
       document.querySelector(".bar-weather-img__img").setAttribute("src" , "img/banchieu.png")
    }
    if(d.getHours() >= 6 &&  d.getHours() < 18 ) {
        document.querySelector(".bar-weather-img__img").setAttribute("src" , "img/bandem.png");
        document.querySelector(".css").innerHTML = "<link rel='stylesheet' href='dark.css'>"
     }
     if(d.getHours() >= 18 &&  d.getHours() < 24 ) {
     
     }
}
setimg();
function getjson(text) {
var json  = "/json/ctiy.json"
fetch(json)
  .then(response => response.json())
  .then(function(data) {
      console.log(text);
    data.ctiy.map(function(item){
     if(item.name == text) {
         console.log(item.ctiy);
         var m  = getCtiy();
     x(item.ctiy);
     }
    })
  });
}
function x(text) {
    getweather(text);
    document.querySelector(".bar-weather-content-input-search").setAttribute("value", text);
}
//tro ly ảo
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; 
const recognition = new SpeechRecognition(); 
const handleVoice = (text) => {
    const handleText = text.toLowerCase();
    var handleTexts =  handleText.split("tiết");
    console.log(handleTexts[0]);
   if(handleText.includes( "thời tiết tại ")) {
       const location = handleText.split("tại")[1].trim();
    console.log( "location",location);
    getweather(location);
    document.querySelector(".bar-weather-content-input-search").setAttribute("value", location);
   }
   if(handleTexts[0] == "kiểm tra thời ") {
     var heading =  handleTexts[1].split("giờ"); 
      console.log("ha");
      var number =  heading[0] * 1 ;
     if(heading[1] == " chiều") {
         number += 12;
     };
     console.log(number , getCtiys);
     var city = getCtiy();
     tuonglai(getCtiys , number);
   }
}
recognition.lang = 'vi-VI';
recognition.continuous = false; 
const microphone = document.querySelector(".bar-weather-content-heading__icon"); 
microphone.onclick = function(e) {
        e.preventDefault();
        recognition.start();
        console.log("chạy vào đây");
        console.log(document.querySelector(".bar-weather-content-heading__icon-recoding-icon--text"));
        document.querySelector(".bar-weather-content-heading__icon-recoding-icon--text").innerText  = "bạn hãy nói gì đó";
}
recognition.onspeechend = () => {
    recognition.stop();
    document.querySelector(".bar-weather-content-heading__icon-recoding-icon--text").innerHTML  = " bấm vào đấy để nói (Bản thử nghiệm) <br>" +
    "<p>Hương dẫn : Thời tiết Tại Thành phố bạn muốn tìm </p>"
}
recognition.onerror = (err) => {
    console.log(err);
}
recognition.onresult = (e) => {
    console.log("onresult" , e);
    const text = e.results[0][0].transcript;
    console.log("text" , text);
    handleVoice(text);
} 
var tuonglai = (ctiy , Hours) => {
    var apikey  = '83906ccb430653f8e348926a415ef865';
    console.log(ctiy , Hours);
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${ctiy}&appid=${apikey}&lang=vi&units=metric`)
    .then(async res=>{
     const data = await res.json();
     console.log(data.list);
     data.list.map((i , index) => {
         var day  = d.getDate(); 
         var year = d.getFullYear(); 
         var month   = d.getMonth() + 1;
         if ( month < 10){
             month = "0"  + month
         }
         var text  = year + "-" + month  + "-"+ day + " " +  Hours + ":" + "00"  + ":" + "00";
         if(text == i.dt_txt) {
             console.log(data.list[index] , Hours )
             getvoice(data.list[index] , Hours);
         
     }
    })
});
};
document.querySelector(".btn-giongnoi").onclick = () => {
    var x = document.querySelector(".testgiongnoi").value; 
    
    handleVoice(x);
}
function getvoice(data , Hours) {
    responsiveVoice.setDefaultRate(1.0);
    responsiveVoice.speak( "Chào Buổi Chiều " +  "                      ." +
    "Bây Giờ: " + Hours + "Giờ" + ":" + Minutes + "Phút" + ":" + Seconds + "Giây" + "              ." +
        "Thời tiết" + getCtiys + "hiện tại: " + data.weather[0].description  +  "             ." +
    'Nhiệt độ '  + Hours +': ' + Math.round(data.main.temp) + "Độ" +  " .           " +
    "độ ậm: "  +  data.main.humidity  +   " .               " + 
    "mặt trời mọc: "   + moment.unix(data.sys.sunrise).format('H:mm')  +  " .            " +
    "mặt trời lặng : "  + moment.unix(data.sys.sunset).format('H:mm') +  " .           "   + 
    "Chúc Bạn có một ngày vui vẻ ..."
    , "Vietnamese Male");
    document.getElementById('sound').play();
    tuonglai(data.name);
}
