//Import dependencies
var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');

//Import the package
var pkg = require('./package.json');

//Generate the header
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  '', ''].join('\n');

//Output dir
var output = 'build/';

//Files list
var files = ['src/karyo.js', 'src/build.js', 'src/callback.js', 'src/cursor.js', 'src/foot.js', 'src/get.js',
'src/import.js', 'src/navbar.js', 'src/resize.js', 'src/select.js', 'src/size.js', 'src/use.js', 'src/options.js',
'src/utils.js', 'src/loading.js', 'src/alert.js', 'src/preview.js', 'src/draw/*.js', 'src/events/*.js',
'src/plugins/*.js'];

//Concat all files in build folder
gulp.task('concat', function(){

  //Set the source files
  gulp.src(files)

  //Concat all files in siimple.css
  .pipe(concat('karyo.js'))

  //Add the header
  .pipe(header(banner, { pkg : pkg } ))

  //Save in css/ folder
  .pipe(gulp.dest(output + 'js/'));

});

//Minimify the output file in siimple.min.css
gulp.task('minify', ['concat'], function(){

  //Set the source file
  gulp.src(output + 'js/karyo.js')

  //MinifCss
  .pipe(uglify())

  //Save the minifed file as siimple.min.css
  .pipe(rename('karyo.min.js'))

  //Add the header
  .pipe(header(banner, { pkg : pkg } ))

  //Save in css/ folder
  .pipe(gulp.dest(output + 'js/'));

});

//Copy vendor files
gulp.task('copy-vendor', ['minify'], function(){

  //Select the files and folders to copy
  gulp.src(['vendor/**/*'], {base: './'})

  //Copy to the build folder
  .pipe(gulp.dest(output));

});

//Copy assets files
gulp.task('copy-assets', ['copy-vendor'], function(){

  //Select the files and folders to copy
  gulp.src(['assets/**/*'], {base: './assets'})

  //Copy to the build folder
  .pipe(gulp.dest(output));

});

//Execute the tasks
gulp.task('default', ['copy-assets']);
