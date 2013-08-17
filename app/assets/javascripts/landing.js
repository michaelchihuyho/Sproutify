////////////////////
// LANDING MANAGER
function LandingManager() {

  $('#submit').on('click', function(event) {
    event.preventDefault();
    var geocoder = new Geocoder();
    geocoder.fetch(getLocation(), function(location) {
      getLocalInfo(location);
    });
  });

}

function getLocation(){
  return $("#location").val();
}

function setLocationFromPlugin(){
  $('#location').val(geoplugin_city());
}

function getLocalInfo(location) {
  $.ajax({
    url: "/fetch",
    type: "get",
    data: { lat: location.lat, lng: location.lng}
  }).done(function(result) {
    $('.container').append("<p>There are "+ result.count +" gardeners in your area!</p>")
  });
}

function bindEvents(){
  $(".signup-link").on("ajax:beforeSend", function(){
    $("#signup-modal").modal();
    return false;
  });

  $("#new_user").on("ajax:success", function(event, response, xhr, element){
    if (response.hasOwnProperty("errors")){
      for (error_field in response.errors){
        $("#new_user").find("#user_"+error_field).val("");
        if(error_field === "password"){
          $("#new_user").find("#user_password_confirmation").val("");
        }
      }

      $("#new_user").find('.alert').remove();
      $("#new_user").find(".modal-body").prepend(response.errorElem);
    }
    if (response.hasOwnProperty("pageElem")){
      $("#signup-modal").modal('hide');
      $("#signup-modal").on('hidden.bs.modal', function(){
        $("#main-body").empty().append(response.pageElem);
      }); 
    }
  });

  $("#signup-modal").on('hidden.bs.modal', function(){
    $(this).find('.alert').remove();
  });

  $(".login-link").on("ajax:beforeSend", function(){
    $("#login-modal").modal();
    return false;
  });
  $("#new_session").on("ajax:success", function(event, response, xhr, element){
    if (response.hasOwnProperty("errors")){
      for (error_field in response.errors){
        $("#new_session").find("#session_"+error_field).val("");
      }

      $("#new_session").find('.alert').remove();
      $("#new_session").find(".modal-body").prepend(response.errorElem);
    }
    if (response.hasOwnProperty("pageElem")){
      $("#login-modal").modal('hide');
      $("#login-modal").on('hidden.bs.modal', function(){
        $("#main-body").empty().append(response.pageElem);
        $(".navbar-right").empty().append(content, content, function)
      });
      
    }
    
  });

  $("#login-modal").on('hidden.bs.modal', function(){
    $(this).find('.alert').remove();
  });

};