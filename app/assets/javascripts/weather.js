$(function() {
  var city = 'osaka';
  const API_KEY = '2ebc867acead2ecabe1d658febc9838a';
  var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',jp&units=metric&APPID=' + API_KEY;
  $.ajax({
    url: url,
    dataType: "json",
    type: 'GET',
  })
  .done(function(data) {
    var insertHTML = "";
    var weather_tomorrow = new Array();
    console.log(weather_tomorrow)
    var cityName = '<h2>' + data.city.name + '</h2>';
    $('#city-name').html(cityName);
    for (var i = 0; i <= 11; i = i + 2) {
      insertHTML += buildHTML(data, i);
      weather_tomorrow.push(weather_tomorrows(data, i));
    }
    console.log(weather_tomorrow)
    $('#weather').html(insertHTML);
  })
  .fail(function(data) {
    console.log("失敗しました");
  });

  function buildHTML(data, i) {
    var Week = new Array("（日）","（月）","（火）","（水）","（木）","（金）","（土）");
    var date = new Date (data.list[i].dt_txt);
    date.setHours(date.getHours());
    var month = date.getMonth()+1;
    var day = month + "月" + date.getDate() + "日" + Week[date.getDay()] + date.getHours() + "：00";
    var icon = data.list[i].weather[0].icon;
    var html =
    '<div class="weather-report">' +
      '<img src="http://openweathermap.org/img/w/' + icon + '.png">' +
      '<div class="weather-date">' + day + '</div>' +
      '<div class="weather-main">'+ data.list[i].weather[0].main + '</div>' +
      '<div class="weather-temp">' + Math.round(data.list[i].main.temp) + '℃</div>' +
    '</div>';
    // console.log(data.list[i].weather[0].main)
    return html
    }

  function weather_tomorrows(data, i) {
    // 表示されているデータ
    var date = new Date (data.list[i].dt_txt);
    var day = date.getDate();
    // console.log(date);
    console.log(day);
    // 明日のデータ
    var tomorrow = new Date();
    tomorrow.setDate( tomorrow.getDate() +  1 );
    var tomorrow_day = tomorrow.getDate();
    console.log(tomorrow);
    console.log(tomorrow_day);
    if(day === tomorrow_day){
      console.log(tomorrow_day)
      return tomorrow_day
    } else {
      return day
    }
  };



});



