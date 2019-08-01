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
        console.log(html)
        $('.registar-content__inner__image').append(html);
        console.log(e.target.result)
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#suit_img").change(function(){
    readURL(this);
  });

  var all_maxtemperature = $("#maxtemperature").html();
  // 最低温度変更した際に最高温度が一番低くした際の問題あり。
  $(".registar-content__inner__form__status__box__temperature__select__mini").on('click', function() {
    var maxtemperature = ($('#maxtemperature').val());
    console.log(maxtemperature);
  // 最低温度変更した際に最高温度から最低温度以下の温度を削除。
    $(".registar-content__inner__form__status__box__temperature__select__mini").change( function() {
      console.log("change")
      var minitemperature = ($(this).find("option:selected").val());
      console.log(minitemperature);
      var maxtemperature_selectbox = $('select[id=maxtemperature]');
      console.log(maxtemperature_selectbox);
      var minitemperature_selectbox = $('select[id=minitemperature]');
      minitemperature_selectbox.children('option[value=0]').remove();
      $("#maxtemperature").html(all_maxtemperature);
      for ( var i = 0; i<minitemperature; i++ ){
        maxtemperature_selectbox.children('option:first-child').remove();
      }
    });
    });
});


