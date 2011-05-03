class Frame extends Backbone.View
  initialize: ->
    @template = $("#frame").html()
  render: ->
    @el.html(_.template(@template, @model.attributes))
  setModel: (model) ->
    @model = model
    @render()
