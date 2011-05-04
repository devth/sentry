fs     = require 'fs'
util   = require 'util'
{exec} = require 'child_process'

prodSrcCoffeeDir = "src/"

appFiles  = [
  # omit src/ and .coffee to make the below lines a little shorter
  'app/models/urls'
  'app/views/frame'
  'app/views/application_view'
  'app/controllers/application_controller'
  'app/app'
]

task 'build', 'Build single application file from source files', ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile 'js/app.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec 'coffee --compile js/app.coffee', (err, stdout, stderr) ->
        throw err if err
        console.log stdout + stderr
        fs.unlink 'js/app.coffee', (err) ->
          throw err if err
          console.log 'Done.'

task 'watch', 'Watch prod source files and build changes', ->
  util.log "Watching for changes in #{prodSrcCoffeeDir}"

  for file in appFiles then do (file) ->
    fs.watchFile "#{prodSrcCoffeeDir}/#{file}.coffee", (curr, prev) ->
      if +curr.mtime isnt +prev.mtime
        util.log "Saw change in #{prodSrcCoffeeDir}/#{file}.coffee"
        invoke 'build'
