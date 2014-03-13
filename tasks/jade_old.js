/*
 * grunt-jade-old
 * https://github.com/cristi/grunt-jade-old
 *
 * Copyright (c) 2014 Cristian Necula
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask("jade", "Compiling jade template.", function() {
    var jade, options;
    jade = require('jade');
    options = this.options({
      compileDebug: false,
      client: true
    });

    this.files.forEach(function(f) {
      var src;

      src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn("Source file \"" + filepath + "\" not found.");

          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        src = grunt.file.read(filepath);
        return "module.exports=" + jade.compile(src, options);
      }).join('\n');

      grunt.file.write(f.dest, src);
      grunt.log.writeln("File \"" + f.dest + "\" created.");
    });
  });

};
