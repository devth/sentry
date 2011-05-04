class ApplicationView extends Backbone.View
  initialize: ->
    @left = new Frame({el: @$(".left")})
    @right = new Frame({el: @$(".right")})

    _.bindAll this, 'urlsRefresh'

    @model.bind 'refresh', @urlsRefresh

  urlsRefresh: ->
    console.log("refresh")
    if @model.size() > 1
      @left.setModel @model.at(0)
      @right.setModel @model.at(1)
