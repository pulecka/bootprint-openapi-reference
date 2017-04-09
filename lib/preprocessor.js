var _ = require('lodash')
var path = require('path')
var $RefParser = require('json-schema-ref-parser')

module.exports = function(json) {
  var openapi = this.parent
  var copy = _.cloneDeep(json)

  var parser = new $RefParser()

  return parser.resolve('./api/', json, {})
    .then(function($refs) {
      return _.mapKeys($refs.values(), function(value, key) {
        return _.split(key, '/api/')[1]
      })
    })
    .then(function($refs) {
      var topics = json.topics.map(function(topic) {
        return $refs[topic.$ref]
      })
      var areas = json.areas.map(function(area) {
        return $refs[area.$ref]
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
