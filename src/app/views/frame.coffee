class Frame extends Backbone.View
  initialize: ->
    @template = $("#frame").html()
  render: ->
    $html = $(_.template(@template, @model.attributes)).hide()
    $existingFrames = @$(".iframe_container")
    @el.append($html)
    setTimeout (=> $html.fadeIn('slow', => $existingFrames.remove(); console.log($existingFrames) )), 1000
  setModel: (model) ->
    @model = model
    @render()
