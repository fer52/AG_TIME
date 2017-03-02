document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    setTimeout(function() {
        navigator.splashscreen.hide();  
    }, 2000)
    //navigator.splashscreen.hide();
    
    var app = new App();
    app.run();
}

function App() {
}

var geoItem = {
    latitude:0,
    longitude:0   
};

var localStorageAppLogin;

App.prototype = {
    latitude:0,
    longitude:0,
    listScann:[],
    resultsField: null,
    lastScann:'',    
    _pictureSource: null,    
    _destinationType: null,    
    run: function() {
        var that = this,
            routeButton = document.getElementById("routeButton"),
            routeActiveButton = document.getElementById("routeActiveButton"),
            historyButton = document.getElementById("historyButton");
        
        logIn = document.getElementById("logIn");        
        logIn.addEventListener("click",
                               function() { 
                                   //navigator.notification.alert('demo')
                                   $.mobile.loading("show", {
                                                        text: 'Verificando...',
                                                        textVisible: true,
                                                        theme: 'a',
                                                        textonly: false
                                                    });
                                   user = document.getElementById("userName").value.toString().toUpperCase();
                                   var parametro = {"user":user,"pw":document.getElementById("pwd").value.toString()};
                                   
                                   $.ajax({
                                              type: "POST",
                                              dataType: "json",
                                              url: "http://agensedashboard.websolutions.com.gt/login.php",
                                              crossDomain: true,
                                              data: JSON.stringify(parametro),
                                              cache: false,
                                              success: function (info) {
                                                  $.mobile.loading("hide")
                                                  if (info.success) {
                                                      //localStorageApp.insertVariable('sessionDate', getCurrentDateA());
                                                      watchPosition();
                                                      localStorageAppLogin = getCurrentDateA();
                                                      
                                                      //localStorage.setItem('dataDelivery', JSON.stringify(dataDelivery));
                                                      //localStorage.getItem('dataDelivery');
                                                      
                                                      $.mobile.changePage("#pageactive", { transition: "flip" });
                                                  }else {
                                                      showAlert('Usuario o contraseña incorrecta');
                                                  }                                                  
                                              },
                                              error: function (msg) {
                                                  $.mobile.loading("hide")
                                                  alert(msg);
                                              }
                                          });
                                   /*if (document.getElementById("userName").value.toString().toLowerCase() == 'administrador' && document.getElementById("pwd").value.toString().toLowerCase() == '1234') {
                                   $.mobile.changePage("#home", { transition: "flip" });
                                   }else {
                                   alert('Usuario o contraseña incorrecta')
                                   }*/
                               });
        
        //nueva ruta
        routeButton.addEventListener("click",
                                    function() { 
                                        //that._scan.call(that); 
                                    });
        
        //estado entrega
        routeActiveButton.addEventListener("click",
                                      function() { 
                                          //that._selectedResult(1); 
                                      });
        historyButton.addEventListener("click",
                                    function() { 
                                        //that._selectedResult(0); 
                                    });
        
        //camera        
        //alert(navigator.camera);
        that._destinationType = navigator.camera.DestinationType;
        
        //var sessionDate = localStorageApp.getVariable('sessionDate');
        //var sessionDate = localStorageAppLogin;
        //if (sessionDate !== '' && sessionDate !== undefined && sessionDate == getCurrentDateA()) {            
         //   $.mobile.changePage("#home", { transition: "flip" });
        //}
    }
};

function getCurrentDateA() {
    var d = new Date(); 
    
    return (d.getFullYear() * 10000) + ((d.getMonth() + 1) * 100) + d.getDate();
}


// Watch your changing position  
function watchPosition() {
    // Success callback for watching your changing position 
    var onWeatherWatchSuccess = function (position) {
        var updatedLatitude = position.coords.latitude;
        var updatedLongitude = position.coords.longitude;
 
        //if (updatedLatitude != geoItem.latitude && updatedLongitude != geoItem.longitude) {
        geoItem.latitude = updatedLatitude;
        geoItem.longitude = updatedLongitude;
        // Calls function we defined earlier. 
        //getWeather(updatedLatitude, updatedLongitude);
        //}
    }
    
    var onWeatherError = function(msg) {
        //alert(msg);
    }
            
    return navigator.geolocation.watchPosition(onWeatherWatchSuccess, onWeatherError, { enableHighAccuracy: true });
}