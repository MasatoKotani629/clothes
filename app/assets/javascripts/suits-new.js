$(function() {

  function buildimage(image) {
    var html = 
    `<div class="image-form">
      <div class="image">
        <img src= ${image} >
      </div>
      <h1 class="reselect-image" onClick="$('#suit_img').click()">変更</h1>
    </div>`
    return html;
  };

  function readURL(input) {
    console.log(input);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.fa-tshirt').remove();
        $('.registar-content__inner__image__label__guide').remove();
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

});
