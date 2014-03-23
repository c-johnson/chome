define(["jquery"], function() {

  var subnavController = {
    subnavs: null,

    init: function () {
      this.registerSubnavs();
      this.registerEvents();

      this.subnavs.forEach(function (subnav) {
        $(subnav.controller).find('a')[0].click();
      });
    },

    registerSubnavs: function () {
      this.subnavs = [];

      $('[data-subnav-controller').each(function (i, elem) {
        var subnavID = $(elem).data('subnav');
        var subnavSections = $('[data-subnav="'+subnavID+'"]');
        var subnav = {};
        
        subnav = {};
        subnav.id = subnavID;
        subnav.sections = [];

        subnavSections.each(function (j, jElem) {

          if ($(jElem).data('subnav-controller') !== undefined) {
            subnav.controller = jElem;
          } else {
            subnav.sections.push(jElem);
          }
        });

        this.subnavs.push(subnav);
      }.bind(this));
    },

    registerEvents: function () {
      this.subnavs.forEach(function (subnav) {
        var controller = this;

        $(subnav.controller).on('click', 'a', function (evt) {
          $(this).addClass('active');
          var sectionID = $(this).attr('href');
          sectionID = sectionID.substr(1, sectionID.length);
          controller.displaySection(sectionID);
        });
      }.bind(this));
    },

    displaySection: function (sectionID) {
      this.subnavs.forEach(function (subnav) {
        $(subnav.controller).find('a').each(function (i, link) {
          if ($(link).attr('href') === "#" + sectionID) {
            $(link).addClass('active');
          } else {
            $(link).removeClass('active');
          }
        });

        subnav.sections.forEach(function (section) {
          if ($(section).attr('id') === sectionID) {
            $(section).show();
          } else {
            $(section).hide();
          }
        });
      });
    }
  };

  subnavController.init();
  return subnavController;
});