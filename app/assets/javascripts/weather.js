$(function() {

  var status_num = "status_num"
  var average_temp_num = "avereage_num"
  var cloth_list = $(".content");
  var mini_temp = 0;
  var max_temp = 0;
  
  function appendSuit(suit) {
    var html =
    `<div class="test">${ suit.id }</div>
    <img src = ${ suit.image.url }>`

    cloth_list.append(html);
  }

  var city = 'osaka';
  const API_KEY = '2ebc867acead2ecabe1d658febc9838a';
  var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',jp&units=metric&APPID=' + API_KEY;
  $.ajax({
    url: url,
    dataType: "json",
    type: 'GET',
  })
  .done(function(data) {
    var weather_today_time = new Array();
    var weather_tomorrow_time = new Array();
    var today_list_num = new Array();
    var tomorrow_list_num = new Array();
    var day = new Date();
    var today = day.getDate();
    day.setDate( day.getDate() +  1 );
    var tomorrow_day = day.getDate();
    var insertHTML = "";
    var cityName = '<h2>' + data.city.name + '</h2>';
    $('#city-name').html(cityName);
    for (var i = 0; i <= 16; i = i + 2) {
      var date = new Date (data.list[i].dt_txt);
      var day = date.getDate();

      if(day===today){
        weather_today_time.push(data);
        today_list_num.push(i);
      } 
      
      if(day===tomorrow_day){
        weather_tomorrow_time.push(data);
        tomorrow_list_num.push(i);
      } 

      insertHTML += buildHTML(data, i);
    }
    $('#weather').html(insertHTML);
    status_num = choose_weather(weather_tomorrow_time, tomorrow_list_num);
    average_temp_num = choose_temp(weather_today_time, today_list_num);
    mini_temp = convert_temp(average_temp_num)
    console.log(mini_temp);
    max_temp = mini_temp + 1


  }).then(function(){
    $.ajax({
      type: 'GET',
      url: '/suits',
      data: { status: status_num, mini_temp: mini_temp,max_temp: max_temp },
      dataType: 'json'
    })
    .done(function(suits) {
      if (suits.length !== 0){
        suits.forEach(function(suit){
          appendSuit(suit);
        });
      }
    })
    .fail(function(suits) {
      console.log("失敗しました");
    });
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
    return html
  }

      function choose_weather(weather_tomorrow_time, tomorrow_list_num){
        var weather_check = new Array
        var figure = weather_tomorrow_time.length
        for(var i = 0; i < figure; i++ ){
          var num = tomorrow_list_num[i]  
          var weather_data_day = weather_tomorrow_time[i]
          var weather_data_day_hours = new Date (weather_data_day.list[num].dt_txt);
          // 0,3,21時のデーターがある。
          var weather_status = weather_data_day.list[num].weather[0].main
          // 0,3,21時のデーターを取り除く。
          var tomorrow_time_weather =  select_tomorrow_weather(weather_status, weather_data_day_hours)
          if(tomorrow_time_weather != "rain" ){
            weather_check.push("no_rain")
          }
        }
        // 雨ではない場合はi回weather_checkにno_rainが入る
        if(i === weather_check.length){
          return 1
        } 
        else {
          return 2
        }
      }

      function select_tomorrow_weather(weather_status, weather_data_day_hours){
      if(weather_status === "Rain" &&(
        weather_data_day_hours.getHours() != 0 || 
        weather_data_day_hours.getHours() != 3 || 
        weather_data_day_hours.getHours() != 21 )
        ){
          return "rain"
        } else  {
          // "no_rain"の場合は特定のrain以外の時間が全て含まれる
          // console.log(weather_data_day_hours.getHours())
          return "no_rain"
        }
      }

      function choose_temp(weather_today_time, today_list_num){
        var temp_list = new Array
        var figure = weather_today_time.length
        for(var i = 0; i < figure; i++ ){
          var num = today_list_num[i]  
          var temp_data_day = weather_today_time[i]
          var temp_data_day_hours = new Date (temp_data_day.list[num].dt_txt);
          // 0,3,21時のデーターがある。
          var temp_status = Math.round(temp_data_day.list[num].main.temp)
          // 0,3,21時のデーターを取り除く。
          select_time_temp(temp_status, temp_data_day_hours,temp_list)          
        }
        var temp_average = temp_average_calculation(temp_list)
        return temp_average
      }

      function select_time_temp(temp_status, temp_data_day_hours,temp_list){
        if (temp_data_day_hours.getHours() != 0 && temp_data_day_hours.getHours() != 3 ) { 
          temp_list.push(temp_status)
        }
      }

      function temp_average_calculation(temp_list){
        var sum = 0
        var arr = temp_list
        arr.forEach(function(elm) {
              sum += elm;
        });
        return  sum/arr.length;
      }

      function convert_temp(average_temp_num){
        console.log(average_temp_num)
        for(var temp = 0; temp<=40; temp+=5){
          if(average_temp_num>=temp && average_temp_num<=temp+5){
            mini_temp = temp;
            max_temp = i+5;
          }
        }  
        var nums = 0;
        for(var i =0; i<8; i++){
          switch(mini_temp){
            case nums:
            return mini_temp = i;
          }
          nums+=5
        }
      }
})

parent_array = ['レディース','メンズ']
child_array=['トップス','ジャケット/アウターパンツ','パンツ']

