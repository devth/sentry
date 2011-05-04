(function() {
  var ApplicationController, ApplicationView, Frame, Urls;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Urls = (function() {
    function Urls() {
      Urls.__super__.constructor.apply(this, arguments);
    }
    __extends(Urls, Backbone.Collection);
    return Urls;
  })();
  Frame = (function() {
    function Frame() {
      Frame.__super__.constructor.apply(this, arguments);
    }
    __extends(Frame, Backbone.View);
    Frame.prototype.initialize = function() {
      return this.template = $("#frame").html();
    };
    Frame.prototype.render = function() {
      return this.el.html(_.template(this.template, this.model.attributes));
    };
    Frame.prototype.setModel = function(model) {
      this.model = model;
      return this.render();
    };
    return Frame;
  })();
  ApplicationView = (function() {
    function ApplicationView() {
      ApplicationView.__super__.constructor.apply(this, arguments);
    }
    __extends(ApplicationView, Backbone.View);
    ApplicationView.prototype.initialize = function() {
      this.left = new Frame({
        el: this.$(".left")
      });
      this.right = new Frame({
        el: this.$(".right")
      });
      _.bindAll(this, 'urlsRefresh');
      return this.model.bind('refresh', this.urlsRefresh);
    };
    ApplicationView.prototype.urlsRefresh = function() {
      console.log("refresh");
      if (this.model.size() > 1) {
        this.left.setModel(this.model.at(0));
        return this.right.setModel(this.model.at(1));
      }
    };
    return ApplicationView;
  })();
  ApplicationController = (function() {
    function ApplicationController() {
      ApplicationController.__super__.constructor.apply(this, arguments);
    }
    __extends(ApplicationController, Backbone.Controller);
    ApplicationController.prototype.initialize = function() {
      this.urls = new Urls();
      return this.applicationView = new ApplicationView({
        el: $("#content"),
        model: this.urls
      });
    };
    ApplicationController.prototype.routes = {
      "*urls": "handleRoute"
    };
    ApplicationController.prototype.handleRoute = function(hash) {
      var urls;
      urls = hash.split(",").map(function(url) {
        return {
          url: url
        };
      });
      console.log("route", urls);
      return this.urls.refresh(urls);
    };
    return ApplicationController;
  })();
  $(function() {
    new ApplicationController;
    return Backbone.history.start();
  });
}).call(this);
