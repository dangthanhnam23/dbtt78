var city = JSON.parse(localStorage.getItem("Getbody"));
var apikey  = '83906ccb430653f8e348926a415ef865';
console.log(city);
fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&lang=vi&units=metric`)
    .then(async res=>{
     const data = await res.json();
     console.log(data.list);
     var x = '';
     for(i = 0 ; i < data.list.length ; i++ ) {
         x +=  `<div class="content__future">
         <h3 class="content__name">
             ${city}
           <Span class="content__nationality ">--VN</Span>
         </h3>
       <div class="content__time">
       <p>Thời Gian  :  ${data.list[i].dt_txt}</p>
       </div>
       <div class="content__climate">
           <p class="content__climate-temperature"> Thời tiết hiện tại :${Math.round(data.list[i].main.temp)} độ </p>
           <p class="content__climate-weather">Thời tiết hiện tại : ${data.list[i].weather[0].description}</p>
       </div>
       <div class="content__Sun">
           <p class="content__Sun-Sunrise">mặt trời mọc: ${moment.unix(data.list[i].sys.sunrise).format('H:mm')}</p>
           <p class="content__Sun-sundown">mặt trời lặng : ${ moment.unix(data.list[i].sys.sunset).format('H:mm')}</p>
       </div>
       <div class="content__sky">
          <p class="content__sky-wind">Tốc độ gió : ${(data.list[i].wind.speed * 3.6).toFixed(2) + "/Km" }</p>
          <p class="content__sky-sound">độ ậm: ${data.list[i].main.humidity}</p>
       </div>
           </div>`
     }
     console.log(x);
     document.querySelector(".content").innerHTML = x;
});