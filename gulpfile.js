var gulp    = require('gulp'),
    copy  = require('gulp-copy'),
    clean  = require('gulp-clean'),
    uglify  = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat  = require('gulp-concat');

var bower_path = 'assets/bower';

gulp.task('js:app', function(){
    return gulp.src('assets/js-src/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('js:plugins', function(){
    return gulp.src([
            bower_path + '/jquery/dist/jquery.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',  // popover.js requires tooltip.js
            bower_path + '/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
            bower_path + '/holderjs/holder.js',
            bower_path + '/underscore/underscore.js',
            bower_path + '/d3/d3.js',
            bower_path + '/c3/c3.js',
            bower_path + '/bootstrap-carousel-swipe/carousel-swipe.js',
            bower_path + '/smooth-scroll/smooth-scroll.js',
            bower_path + '/parallax.js/parallax.js',
            bower_path + '/masonry/dist/masonry.pkgd.js',
            bower_path + '/imagesloaded/imagesloaded.pkgd.js',
            bower_path + '/social-likes/src/social-likes.js'
        ]).pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('css:plugins', function(){
    return gulp.src([
            bower_path + '/font-awesome/css/font-awesome.css',
            bower_path + '/c3/c3.css',
            bower_path + '/animate.css/animate.css',
            bower_path + '/socicon/css/socicon.css'
        ]).pipe(concat('plugins.css'))
          .pipe(minifyCss({keepSpecialComments: 0}))
          .pipe(gulp.dest('assets/css/'));
});

gulp.task('bootstrap:sass', function(){
    return gulp.src([
        bower_path + '/bootstrap-sass-official/vendor/assets/stylesheets/**/*.{css,scss}',
        ]).pipe(gulp.dest('_sass/'));
});

gulp.task('fonts:plugins', function(){
    return gulp.src([
        bower_path + '/bootstrap-sass-official/vendor/assets/fonts/bootstrap/**/*.{ttf,woff,eof,svg}',
        bower_path + '/font-awesome/fonts/**/*.{otf,ttf,woff,woff2,eof,svg}',
        ]).pipe(gulp.dest('assets/fonts/'));
});

gulp.task('clean:site', function(){
    return gulp.src('_site', {read: false})
               .pipe(clean());
});

gulp.task('clean:bower', function(){
    return gulp.src(bower_path, {read: false})
               .pipe(clean());
});

gulp.task('clean:npm', function(){
    return gulp.src('node_modules', {read: false})
               .pipe(clean());
});

gulp.task('clean:sass', function(){
    return gulp.src('.sass-cache', {read: false})
               .pipe(clean());
});

gulp.task('clean:bootstrap', function(){
    return gulp.src([
            '_sass/bootstrap/',
            '_sass/bootstrap.scss',
            '_sass/_bootstrap-mincer.scss',
            ], {read: false}).pipe(clean());
});

gulp.task('clean:js', function(){
    return gulp.src('assets/js/', {read: false})
               .pipe(clean());
});

gulp.task('clean:fonts', function(){
    return gulp.src('assets/fonts/', {read: false})
               .pipe(clean());
});

gulp.task('clean:css', function(){
    return gulp.src('assets/css/plugins.css', {read: false})
               .pipe(clean());
});

gulp.task('default', ['js:app', 'js:plugins', 'css:plugins', 'fonts:plugins',
                      'bootstrap:sass']);

gulp.task('clean', ['clean:site', 'clean:js', 'clean:css', 'clean:fonts',
                    'clean:sass', 'clean:bootstrap']);
