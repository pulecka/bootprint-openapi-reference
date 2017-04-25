var path = require('path')
var _ = require('lodash')

module.exports = {
  'json-schema--resolve-ref': function (reference, options) {
    reference = reference.trim()
    var components = reference.split('#')
    var url = components[0]
    var hash = components[1]
    var hashParts = hash.split('/')
    var current
    if (url.length > 0) {
      current = options.data.root._$refs.get(url)
    } else if (options.data.context) {
      current = options.data.context
    } else {
      current = options.data.root
    }
    hashParts.forEach(function (hashPart) {
      // Traverse schema from root along the path
      if (hashPart.trim().length > 0) {
        if (typeof current === 'undefined') {
          throw new Error("Reference '" + reference + "' cannot be resolved. '" + hashPart + "' is undefined.")
        }
        current = current[hashPart]
      }
    })
    return current
  },
  'reference--set-context': function (context, options) {
    options.data.context = context
  },
  'reference--clear-context': function (options) {
    options.data.context = null
  }
}
