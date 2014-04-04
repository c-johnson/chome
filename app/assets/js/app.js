define(['jquery', 'angular'], function($, ng) {

  /* Implement basic keyboard switching functionality */
  $(document).on('keydown', function (evt) {
    var root = "http://localhost:9000";
    if (evt.which == 37) {
      window.location.assign(root + "/links");
    } else if (evt.which == 39) {
      window.location.assign(root + "/home");
    }
  });

  /* ??? */
  $sidebar = 0;
  $('#toggleSidebar').click(function() {
    if ($sidebar === 1) {
      $('#sidebar').hide();
      $('#toggleSidebar i').addClass('icon-chevron-left');
      $('#toggleSidebar i').removeClass('icon-chevron-right');
      $sidebar = 0;
    }
    else {
      $('#sidebar').show();
      $('#toggleSidebar i').addClass('icon-chevron-right');
      $('#toggleSidebar i').removeClass('icon-chevron-left');
      $sidebar = 1;
    }

    return false;
  });
  console.log('loaded home module');

  /* localstorge */
  if (Modernizr.localstorage) {
    
  }

});