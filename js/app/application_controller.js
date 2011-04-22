(function() {
  var ApplicationController;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  ApplicationController = (function() {
    function ApplicationController() {
      ApplicationController.__super__.constructor.apply(this, arguments);
    }
    __extends(ApplicationController, Backbone.Controller);
    ApplicationController.prototype.routes = {
      "*": "route"
    };
    ApplicationController.prototype.route = alert("route change");
    return ApplicationController;
  })();
}).call(this);
