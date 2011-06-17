(function() {
  var ApplicationController, ApplicationView, Frame, Urls;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Urls = (function() {
    __extends(Urls, Backbone.Collection);
    function Urls() {
      Urls.__super__.constructor.apply(this, arguments);
    }
    return Urls;
  })();
  Frame = (function() {
    __extends(Frame, Backbone.View);
    function Frame() {
      Frame.__super__.constructor.apply(this, arguments);
    }
    Frame.prototype.initialize = function() {
      return this.template = $("#frame").html();
    };
    Frame.prototype.render = function() {
      var $existingFrames, $html;
      $html = $(_.template(this.template, this.model.attributes)).hide();
      $existingFrames = this.$(".iframe_container");
      this.el.append($html);
      return setTimeout((__bind(function() {
        return $html.fadeIn('slow', __bind(function() {
          $existingFrames.remove();
          return console.log($existingFrames);
        }, this));
      }, this)), 1000);
    };
    Frame.prototype.setModel = function(model) {
      this.model = model;
      return this.render();
    };
    return Frame;
  })();
  ApplicationView = (function() {
    __extends(ApplicationView, Backbone.View);
    function ApplicationView() {
      ApplicationView.__super__.constructor.apply(this, arguments);
    }
    ApplicationView.prototype.initialize = function() {
      this.left = new Frame({
        el: this.$(".left")
      });
      this.right = new Frame({
        el: this.$(".right")
      });
      _.bindAll(this, 'urlsRefresh');
      this.model.bind('refresh', this.urlsRefresh);
      return this.isLeft = true;
    };
    ApplicationView.prototype.urlsRefresh = function() {
      console.log("urlsRefresh", this.model.size());
      if (this.model.size() > 2) {
        this.currentUrlIndex = 2;
        this.cycleInterval = setInterval((__bind(function() {
          return this.showNext();
        }, this)), 16000);
      }
      if (this.model.size() > 1) {
        this.right.setModel(this.model.at(1));
      }
      if (this.model.size() > 0) {
        return this.left.setModel(this.model.at(0));
      }
    };
    ApplicationView.prototype.showNext = function() {
      var frame;
      frame = this.isLeft ? this.left : this.right;
      console.log("show next", this.currentUrlIndex, frame);
      frame.setModel(this.model.at(this.currentUrlIndex));
      this.isLeft = !this.isLeft;
      if (this.currentUrlIndex < this.model.size() - 1) {
        return this.currentUrlIndex += 1;
      } else {
        return this.currentUrlIndex = 0;
      }
    };
    return ApplicationView;
  })();
  ApplicationController = (function() {
    __extends(ApplicationController, Backbone.Controller);
    function ApplicationController() {
      ApplicationController.__super__.constructor.apply(this, arguments);
    }
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
      return this.urls.refresh(urls);
    };
    return ApplicationController;
  })();
  $(function() {
    new ApplicationController;
    return Backbone.history.start();
  });
}).call(this);
