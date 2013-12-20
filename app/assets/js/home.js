define(["jquery"], function($) {
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
});