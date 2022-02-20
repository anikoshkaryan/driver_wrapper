var gulp 		  = require('gulp'),
	browserSync   = require('browser-sync').create(),
	sass 		  = require('gulp-sass'),
	plumber		  = require('gulp-plumber'),
	notify 		  = require('gulp-notify'),
	autoprefixer  = require('gulp-autoprefixer'),
    del           = require('del'),
    runSequence   = require('run-sequence'),
    cssmin 		  = require('gulp-cssmin'),
    cssnano		  = require('gulp-cssnano');
gulp.task('clean:build', function() {
    return del('./build');
});

gulp.task('server', function() {
	browserSync.init({
		server: ["./build"],
    index: "html/index.html"
	});

	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/html/**/*.html', ['copy:html']);
	gulp.watch('src/js/**/*.js', ['copy:js']);
	gulp.watch('src/scss/**/*.*', ['copy:scss']);
	gulp.watch('src/images/**/*', ['copy:images']);
	gulp.watch('src/fonts/**/*.*', ['copy:fonts']);

	
});

gulp.task('copy:js', function() {
	return gulp.src('src/js/**/*.js')
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream());
});
gulp.task('copy:html', function() {
	return gulp.src('src/html/**/*.html')
	.pipe(gulp.dest('./build/html'))
	.pipe(browserSync.stream());
});

gulp.task('copy:scss', function() {
	return gulp.src('src/scss/**/*.*')
	.pipe(gulp.dest('./build/scss'))
	.pipe(browserSync.stream());
});

gulp.task('copy:images', function() {
	return gulp.src('src/images/**/*')
	.pipe(browserSync.stream())
	.pipe(gulp.dest('./build/images'));
});

gulp.task('copy:fonts', function() {
	return gulp.src('src/fonts/**/*.*')
	.pipe(gulp.dest('./build/fonts'))
	.pipe(browserSync.stream());
});


gulp.task('sass', function(succes, error) {
	return gulp.src('./src/scss/**/*.scss')
	.pipe(sass().on( 'error', notify.onError({
		message: "<%= error.message %>",
		title  : "sass Error!"
		})))
	.pipe(autoprefixer({
		overrideBrowserslist: ['> 1%', 'last 9999 versions', 'Firefox >= 20', 'iOS >=7', 'ie 8', 'ie 7', 'Safari >=7'],
		cascade: false,
		grid: true
	}))
	.pipe(cssmin())
	.pipe(cssnano())
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
});

gulp.task('default', function(callback){
	runSequence(
	'clean:build',
	['sass', 'copy:js',  'copy:images', 'copy:fonts', 'copy:html' ],
	'server',
	callback
	)
});


