$(function() {

  var status_num = ""
  var average_temp_num = ""
  var mini_temp = 0;
  var max_temp = 0;
  var tops = {num:1, name:"tops"}
  var thick_tops = {num:2, name:"thick_tops"}
  var outer = {num:3, name:"outer"}
  var pants = {num:4, name:"pants"}
  var outer_box = new Array()
  var thick_tops_box = new Array()
  var tops_box = new Array()
  var pants_box = new Array()
  var parent_category_boxes = [outer_box, thick_tops_box, tops_box, pants_box ]
  var parent_category_list = [outer, thick_tops, tops, pants]
  
  function appendSuitImage(suit, parent_category) {
    var cloth_list = ""
    switch(parent_category.name){
      case outer.name:
      cloth_list = $(".content__inner__outer");
      break

      case thick_tops.name:
      cloth_list = $(".content__inner__thick_tops");
      break

      case tops.name:
      cloth_list = $(".content__inner__tops");
      break

      case pants.name:
      cloth_list = $(".content__inner__pants");
      break
    }

    var html =
                `<div class = "${parent_category.name}">
                  <img src = "${ suit.image.url }">
                </div>`
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
    $('.weather-list').html(insertHTML);
    status_num = choose_weather(weather_tomorrow_time, tomorrow_list_num);
    average_temp_num = choose_temp(weather_today_time, today_list_num);
    mini_temp = convert_temp(average_temp_num)
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
          // console.log(suit)
          var suit_category = select_category(suit)

          // 衣服をカテゴリごとに分別カウントが少ない順に表示

          parent_category_boxes.forEach(function(parent_category_box, index){
            parent_category_info = parent_category_list[index]
            switch(suit_category.id){
              case parent_category_info.num:
              parent_category_box.push(suit)
              parent_category_box.sort(function(a,b){
                if(a.count < b.count) return -1;
                if(a.count > b.count) return 1;
                return 0;
              })
              break
            }
          })
        });

        // console.log(parent_category_boxes);

        Object.keys(parent_category_boxes).forEach(function(key){
          
          var parent_category_box = parent_category_boxes[key]
          var parent_category  = parent_category_list[key]

            if(parent_category_box.length >= 3){
              for(var i = 0; i<=2; i++){
                suit_info = parent_category_box[i]
                appendSuitImage(parent_category_box[i], parent_category);
              }
            } else  if(parent_category_box.length >= 2){
              for(var i = 0; i<=1; i++){
                suit_info = parent_category_box[i]
                appendSuitImage(parent_category_box[i], parent_category);
              }
            }  else if(parent_category_box.length == 1){
                suit_info = parent_category_box[0]
                appendSuitImage(parent_category_box[0], parent_category);
              }

          // }

        })

        parent_category_boxes.forEach(function(parent_category_box, index){
          // console.log(parent_category_box);
          // console.log(index);
          // var parent_category  = parent_category_list[index]
          // console.log(parent_category)
          // if(parent_category_box.length !== 0){
          //   for(var i = 0; i<=4; i++){
          //     suit_info = parent_category_box[i]
          //     appendSuitImage(suit_info, parent_category);
          //   }
          // } 
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
    var day = month + "月" + date.getDate() + "日" + Week[date.getDay()];
    var time = date.getHours() + "：00"
    var icon = data.list[i].weather[0].icon;
    var html =
    '<div class="weather-list__report">' +
      '<img src="http://openweathermap.org/img/w/' + icon + '.png">' +
      '<div class="weather-list__report__date">' + day + '</div>' +
      '<div class="weather-list__report__time">' + time + '</div>' +
      '<div class="weather-list__report__main">'+ data.list[i].weather[0].main + '</div>' +
      '<div class="weather-list__report__temp">' + Math.round(data.list[i].main.temp) + '℃</div>' +
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

      function select_category(suit){
        var categoryHash = $('#all_category').data('categories');
        var suit_category = ""
        categoryHash.forEach(function(category){
          if(suit.category_id === category.id){
            var children_category_id = category.parent_id
            categoryHash.forEach(function(category){
              if(category.id === children_category_id){
                // var parent_category_id = category.parent_id
                suit_category = category
              }          
            })
          }
        })
        return suit_category
      }
})


