define(["jquery"], function() {

  var Subnav = function (id, switcher) {
    this.init = function () {
      this.id = id;
      this.switcher = switcher;
      this.sections = [];

      this.register();
    };

    this.init();
  };

  Subnav.prototype.register = function () {
    $(this.switcher).on('click', 'a', function (evt) {
      var $target = $(evt.target);
      if ($target.data('external') === undefined) {
        var sectionID = $target.attr('href');
        this.displaySection(sectionID);
        evt.preventDefault();
      }
    }.bind(this));
  };

  Subnav.prototype.displaySection = function (sectionID) {

    // Visually activate the correct link in the switcher
    $(this.switcher).find('a').each(function (i, link) {
      $(link).removeClass('active');
      
      if ($(link).attr('href') === sectionID) {
        $(link).addClass('active');
      }
    });

    // Show / hide the appropriate sections
    this.sections.forEach(function (section) {
      $(section).hide();
      if ("#" + $(section).attr('id') === sectionID) {
        $(section).show();
      }
    });
  };

  var subnavController = {
    subnavs: null,

    init: function () {
      this.registerSubnavs();

      var hasHash = (window.location !== undefined && window.location.hash !== undefined && window.location.hash !== "");
      var id = hasHash ? window.location.hash : "#" + this.subnavs[0].sections[0].id;
      this.subnavs[0].displaySection(id);
    },

    /* 
      This function loops through every subnav group and registers them into an array of "subnav groups"
    */
    registerSubnavs: function () {
      this.subnavs = [];
      var ctrl = this;

      // Find all "subnav switcher" components in the application.  If there is no switcher, the subnavigation piece is not registered.
      $('[data-subnav-switcher]').each(function (i, elem) {
        var id = $(elem).data('subnav-switcher');
        var switcher = elem;
        var subnav = new Subnav(id, switcher);

        // For each subnav group, find all of the "subnav sections" within that group
        var subnavSections = $('[data-subnav-section="'+subnav.id+'"]');

        subnavSections.each(function (j, jElem) {
          subnav.sections.push(jElem);
        });

        ctrl.subnavs.push(subnav);
      }.bind(this));
    },
  };

  subnavController.init();
  return subnavController;
});