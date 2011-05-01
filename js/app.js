(function() {
  var ApplicationController, ApplicationView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  ApplicationView = (function() {
    function ApplicationView() {
      ApplicationView.__super__.constructor.apply(this, arguments);
    }
    __extends(ApplicationView, Backbone.View);
    initialize(function() {});
    return ApplicationView;
  })();
  ApplicationController = (function() {
    function ApplicationController() {
      ApplicationController.__super__.constructor.apply(this, arguments);
    }
    __extends(ApplicationController, Backbone.Controller);
    initialize(function() {
      return this.application_view = new ApplicationView();
    });
    ApplicationController.prototype.routes = {
      "*": "route"
    };
    route(function() {
      return alert("route change!");
    });
    return ApplicationController;
  })();
}).call(this);
