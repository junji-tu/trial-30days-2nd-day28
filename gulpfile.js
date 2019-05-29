var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var plumber = require( 'gulp-plumber' );
var notify = require( 'gulp-notify' );
var stylelint = require( 'gulp-stylelint' );
var postcss = require( 'gulp-postcss' );
var autoprefixer = require( 'gulp-autoprefixer' );
var mmq = require( 'gulp-merge-media-queries' );
var cssdeclsort = require( 'css-declaration-sorter' );

gulp.task( 'default', function() {
	return gulp.watch( 'sass/*.scss', function() {
		return gulp
			.src( 'sass/*.scss' )
			.pipe( sass({ outputStyle: 'expanded' }) )
			.pipe(
				plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
			)
			.pipe(
				autoprefixer({
					browsers: [ 'last 2 versions', 'ie >= 11', 'Android >= 4' ],
					cascade: false
				})
			)
			.pipe( postcss([ cssdeclsort({ order: 'alphabetically' }) ]) )
			.pipe( mmq() )
			.pipe(
				stylelint({
					fix: true
				})
			)
			.pipe( gulp.dest( './css/' ) );
	});
});
