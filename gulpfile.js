var gulp        = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve',['bootstrap', 'css','js','compile'], function() {

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("src/css/*.css",['css']);
    gulp.watch("src/js/*.js",['js']);
    
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
    gulp.watch(["src/*.html", "src/templates/*.html"],['compile']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
            .pipe(gulp.dest('./dist/js'));
});

gulp.task('compile', function() {
    return gulp.src('src/*.html')
    .pipe(nunjucksRender({
      path: ['src/'] // String or Array 
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    return gulp.src([
            'src/css/style.css',
            'src/css/footer.css',
            'src/css/slider.css',
            'src/css/index.css',
        ])
        .pipe(autoprefixer({
            browsers: ['last 20 versions','Firefox > 20', 'Firefox < 20'],
            cascade: false
        }))
        .pipe(concatCss('main.css'))
        .pipe( browserSync.stream() )
        .pipe( gulp.dest('./dist/css') );
});

gulp.task('bootstrap', function() {
    
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/ie10-viewport-bug-workaround/dist/*.min.css',
        'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
        'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
        'node_modules/animate.css/*.min.css',
        'node_modules/font-awesome/css/*.min.css',
    ])
    .pipe( gulp.dest('./dist/css') );

    gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/tether/dist/js/tether.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/ie10-viewport-bug-workaround/dist/*.min.js',
        'node_modules/owl.carousel/dist/*.min.js',
    ])
    .pipe( gulp.dest('./dist/js') );

    gulp.src([
        'node_modules/font-awesome/fonts/*.*',
    ])
    .pipe( gulp.dest('./dist/fonts') );

});

gulp.task('default', ['serve']);