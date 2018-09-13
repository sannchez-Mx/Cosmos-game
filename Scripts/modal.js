$(document).ready(function() {
  // Obtiene el modal
  var modal = $("#gameBoard");

  // Obtiene el botón que abre el modal
  var btn = $("#start-button");

  // Obtiene el elemento <span> que cierra el modal
  var span = $(".close")[0];

  // Cuando el usuario haga clic en el botón, abra el modal
  $(btn).click(function() {
    $(modal)
      .fadeIn(1000)
      .css("display", "block");
      $("body").css("overflow", "hidden");
  });

  // Cuando el usuario haga clic en <span> (x), cierra el modal
  $(span).click(function() {
    $(modal).css("display", "none");
    $("body").css("overflow", "auto");
  });
});
