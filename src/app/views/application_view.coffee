class ApplicationView extends Backbone.View
  initialize: ->
    @left = new Frame({el: @$(".left")})
    @right = new Frame({el: @$(".right")})

    _.bindAll this, 'urlsRefresh'

    @model.bind 'refresh', @urlsRefresh
    @isLeft = true

  urlsRefresh: ->
    console.log("urlsRefresh", @model.size())

    if @model.size() > 2
      # cycle - starting on the 2nd url
      @currentUrlIndex = 2
      @cycleInterval = setInterval (=> @showNext()), 16000

    # init with the first 2 urls
    if @model.size() > 1
      @right.setModel @model.at(1) # right
    if @model.size() > 0
      @left.setModel @model.at(0) # left

  showNext: ->

    frame = if @isLeft then @left else @right
    console.log("show next", @currentUrlIndex, frame)

    frame.setModel @model.at @currentUrlIndex

    # toggle frames
    @isLeft = !@isLeft 
    # increment current index
    if @currentUrlIndex < this.model.size() - 1
      @currentUrlIndex+= 1 
    else
      @currentUrlIndex = 0

