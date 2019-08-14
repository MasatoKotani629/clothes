$(function() {
  // 画像表示
  function buildimage(image) {
    var html = 
      `<div class="registar-content__inner__image__picture">
        <img src= ${image}>
      </div>
      <h1 class="registar-content__inner__image__change">写真を変更する</h1>`
    return html;
  };
  // 画像読み込み
  function readURL(input) {
    console.log(input);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.fa-tshirt').remove();
        $('.registar-content__inner__image__label__guide').remove();
        $('.registar-content__inner__image__picture').remove();
        $('.registar-content__inner__image__change').remove();
        var html = buildimage(e.target.result,)
        $('.registar-content__inner__image').append(html);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

    // 最低温度を選択した際に最高温度を変化
    function changeMaxtemperature(){
      var maxtemperature = ($('#maxtemperature').val());
      console.log(maxtemperature);
    // 最低温度変更した際に最高温度から最低温度以下の温度を削除。
      $(".registar-content__inner__form__status__box__temperature__select__mini").change( function() {
        var minitemperature = ($(this).find("option:selected").val());
        var maxtemperature_selectbox = $('select[id=maxtemperature]');
        var minitemperature_selectbox = $('select[id=minitemperature]');
        minitemperature_selectbox.children('option[value=0]').remove();
        $("#maxtemperature").html(all_maxtemperature);
        for ( var i = 0; i<minitemperature; i++ ){
          maxtemperature_selectbox.children('option:first-child').remove();
        }
      });
    }

  $("#suit_img").change(function(){
    readURL(this);
  });

  

  var all_maxtemperature = $("#maxtemperature").html();
  $(".registar-content__inner__form__status__box__temperature__select__mini").on('click', function() {
    changeMaxtemperature();
  });

  function secoundselectbox() {
    var html = `<div class ="registar-content__inner__form__category__second">
                  <select id="secound_category_id"><option value>---</option></select>
                </div>`
    return html
  }

  function thirdselectbox() {
    var html = `<div class ="registar-content__inner__form__category__third">
                  <select id="third_category_id"><option value>---</option></select>
                </div>`
    return html
  }

  function appendcategory(category) {
    var html = `<option value="${category.id}">${category.name}</option>`
    return html
  }

    $(".registar-content__inner__form__category__first").change(function(){
      var parent_category = ($(this).find("option:selected").val());
      select(parent_category);
      $(".registar-content__inner__form__category__second").remove();
      $(".registar-content__inner__form__category__third").remove();
    });

    function select(parent_category){
      $.ajax({
        url: '/suits/new',
        dataType: "json",
        data: {parent_id: parent_category},
        type: 'GET',
      })
      .done(function(categories){
        var html = secoundselectbox();
        $(".registar-content__inner__form__category").append(html)
          categories.forEach(function(category){
            if(parent_category == category.parent_id){
              var html = appendcategory(category);
              $('#secound_category_id').append(html)
            } 
        });
        $(".registar-content__inner__form__category__second").change(function(){
          var parent_category = ($(this).find("option:selected").val());
          var html = thirdselectbox();
          $(".registar-content__inner__form__category__third").remove();
          $(".registar-content__inner__form__category").append(html)
          categories.forEach(function(category){
            if(parent_category == category.parent_id){
              var html = appendcategory(category);
              $('#third_category_id').append(html)
            } else {
              console.log("ok")
            }
          });
        });
      });
    }

});


