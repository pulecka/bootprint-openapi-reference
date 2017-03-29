var _ = require('lodash')
var $RefParser = require('json-schema-ref-parser')

module.exports = function(json) {
  var openapi = this.parent
  var copy = _.cloneDeep(json)

  var parser = new $RefParser()

  return parser.resolve(json)
    .then(function($refs) {
      return _.mapKeys($refs.values(), function(value, key) {
        return _.split(key, '/api/')[1]
      })
    })
    .then(function($refs) {
      var commons = json.common.map(function(common) {
        return $refs[common.$ref]
      })
      var paths = json.paths.map(function(path) {
        return $refs[path.$ref]
      })

      return {
        info: json.info,
        commons: commons,
        paths: paths,
        _$refs: $refs
      }
    })
    .then(function(j) {
      console.log('j')
      console.log(j)
      return j
    })

  return openapi(json)
}
