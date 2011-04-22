class ApplicationController extends Backbone.Controller
  routes:
    "*": "route"
  route: 
    alert "route change"
