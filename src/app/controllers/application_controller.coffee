class ApplicationController extends Backbone.Controller
  initialize: ->
    @urls = new Urls()
    @applicationView = new ApplicationView({el: $("#content"), model: @urls})
  routes:
    "*urls": "handleRoute"
  handleRoute: (hash) ->
    urls = hash.split(",").map (url) -> { url: url }
    console.log("route", urls)
    @urls.refresh(urls)
