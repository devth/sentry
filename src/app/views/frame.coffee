class Frame extends Backbone.View
  initialize: ->
    @template = $("#frame").html()
  render: ->
    $html = $(_.template(@template, @model.attributes)).css("visibility", "none")
    @el.html($html)
    setTimeout (-> $html.fadeIn()), 200
  setModel: (model) ->
    @model = model
    @render()
