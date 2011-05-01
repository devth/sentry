class ApplicationController extends Backbone.Controller
  initialize ->
    @application_view = new ApplicationView()
  routes:
    "*": "route"
  route ->
    alert "route change!"
