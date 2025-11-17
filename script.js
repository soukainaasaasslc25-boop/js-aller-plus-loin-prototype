const MeteoApi=[
  {
      key:"4eb3703790b356562054106543b748b2",
      baseUrl:"https://api.openweathermap.org/data/2.5/weather"

  }
];


const inputVille=document.getElementById("ID-inputVille");
const btnRechercher=document.getElementById("Id-button");
const donneesMeteo=document.getElementById("Id-donnee-Meteo");



btnRechercher.addEventListener("click",function (event) {
  event.preventDefault();
  donneesMeteo.innerHTML="";
  let nomVille=inputVille.value;
if (nomVille.trim()!=="") {
   let url=MeteoApi[0].baseUrl+"?q="+nomVille+"&appid="+MeteoApi[0].key+"&units=metric&lang=fr";
  fetch(url)
  .then(reponse=>reponse.json())
  .then(data=>{
    console.log("city",data);

    //si la ville non Trouvee
    if (data.cod == "404") {
      donneesMeteo.textContent = " city not found!";
      return;
    }

    //creation d affichage de Meteo
    const nom=document.createElement("h2");
    nom.classList.add("nom");

    const temperature=document.createElement("p");
    temperature.classList.add("temperature");
     
    const humidity=document.createElement("p");
    humidity.classList.add("humidity");

    const speed = document.createElement("p");
    speed.classList.add("speed");

    const desciption=document.createElement("p");

    const img=document.createElement("img");
    img.src="https://openweathermap.org/img/wn/"+data.weather[0].icon+"@4x.png";
    img.classList.add("img");


    // l affichage recupiration
    speed.textContent= "🌪️ "+data.wind.speed+" km/h";
    temperature.textContent=+data.main.temp+"°";  
    nom.textContent=nomVille;
    humidity.textContent=" 💧" +data.main.humidity+" %";
    desciption.textContent=data.weather[0].description;

// sunset
let cocherSolie = data.sys.sunset;
let actsecondes = cocherSolie%86400;// 
let heuresUTC= Math.floor(actsecondes/3600);
let actMinutes= Math.floor((actsecondes%3600)/60);
let pmEtAm= document.createElement("p");
if(heuresUTC>=12){
  pmEtAm.textContent="🌅"+heuresUTC+": "+actMinutes+" PM";
}
else{
  pmEtAm.textContent=" 🌅"+heuresUTC+": "+actMinutes+" AM";
}
if(actMinutes<10){
      pmEtAm.textContent="🌅"+heuresUTC+": "+"0"+actMinutes+" AM";

}

//sunrise
let leverduSolier= data.sys.sunrise;
let actullsecondes = leverduSolier%86400;
let lesHeuresUTC= Math.floor(actullsecondes/3600);
let actullMinutes= Math.floor((actullsecondes%3600)/60);
let amEtPm= document.createElement("p");
if(lesHeuresUTC>=12){
  amEtPm.textContent="🌄"+lesHeuresUTC+"  : "+actullMinutes+" PM";
}
else{
  amEtPm.textContent="🌄"+lesHeuresUTC+"  : "+actullMinutes+" AM";
}
if(actullMinutes<10){
  amEtPm.textContent="🌄"+lesHeuresUTC+"  : "+"0"+actullMinutes+" AM";

}

//juste pour css//
const div = document.createElement("div");
div.classList.add("div");
//___________________________//


  donneesMeteo.appendChild(nom);
  donneesMeteo.appendChild(img); 
  donneesMeteo.appendChild(temperature);
  donneesMeteo.appendChild(desciption);
  div.appendChild(humidity);
  div.appendChild(speed);
  div.appendChild(pmEtAm);
  div.appendChild(amEtPm);
  donneesMeteo.appendChild(div);

  
  if(data.weather[0].description=="couvert" || data.weather[0].description=="nuageux"){
    document.body.style.backgroundImage="url('image/rain.jpg')";
  }
  else if(data.weather[0].description=="ciel dégagé" || data.weather[0].description=="peu nuageux"){
    document.body.style.backgroundImage="url('image/weather.jpg')";
  }
  else if(data.weather[0].description== "légère pluie"){
    document.body.style.backgroundImage="url('image/winter.jpg')";
  }
  })
  .catch(error=>{

      console.log("erroooooooooooooor",error);
  })
}
else{
  const error=document.createElement("p");
  error.textContent="enter le nome d abord";
  donneesMeteo.innerHTML="";
  donneesMeteo.appendChild(error);
}
});