var path = require('path')

/**
 * Create a bootprint template-module that can be loaded via `Bootprint#load`:
 *
 * @name index
 * @param {BootprintBuilder} builder the current bootprint builder
 * @return {BootprintBuilder} a bootprint-builder containing the template and Less settings for `bootprint-swagger`
 * @api public
 */
module.exports = function bootprintOpenapiReference(builder) {
  return builder
  .load(require('bootprint-openapi'))
    .merge({
      'handlebars': {
        'partials': path.join(__dirname, 'templates/partials'),
        'helpers': require.resolve('./templates/helpers.js'),
        'preprocessor': require('./lib/preprocessor.js')
      },
      'less': {
        'main': [
          require.resolve('highlight.js/styles/tomorrow-night-eighties.css'),
          require.resolve('./styles/theme.less')
        ]
      }
    })
}

// Add "package" to be used by bootprint-doc-generator
module.exports.package = require('./package')
