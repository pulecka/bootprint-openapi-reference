var _ = require('lodash')
var path = require('path')
var $RefParser = require('json-schema-ref-parser')

module.exports = function(json) {
  var openapi = this.parent
  var copy = _.cloneDeep(json)

  var parser = new $RefParser()

  return parser.resolve(json)
    .then(function($refs) {
      return $refs.values()
    })
    .then(function($refs) {
      var topics = json.topics.map(function(topic) {
        return $refs[path.resolve(topic.$ref)]
      })
      var areas = json.areas.map(function(area) {
        return $refs[path.resolve(area.$ref)]
      })

      return {
        info: json.info,
        topics: topics,
        areas: areas,
        _$refs: $refs
      }
    })

  return openapi(json)
}
