var _ = require('lodash')
var path = require('path')
var $RefParser = require('json-schema-ref-parser')

module.exports = function(json) {
  var openapi = this.parent
  var copy = _.cloneDeep(json)

  var parser = new $RefParser()

  return parser.resolve(json)
    .then(function($refs) {
      function mapRef(object) {
        return $refs.get(object.$ref)
      }

      var topics = json.topics ? json.topics.map(mapRef) : null
      var areas = json.areas.map(mapRef)

      return {
        info: json.info,
        topics: topics,
        areas: areas,
        _$refs: $refs
      }
    })

  return openapi(json)
}
