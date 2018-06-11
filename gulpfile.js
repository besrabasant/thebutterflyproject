var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var data = require('gulp-data');
var nunjucksRender = require('gulp-nunjucks-render');
var concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
var fm = require('front-matter');
var browserSync = require('browser-sync').create();

var pages = {};

function getPagesData(file) {
    var pagesFiles = fs.readdirSync('./data/pages/');
    var pageName = path.basename(file.path,'.html');
    pages[pageName] = { name: pageName };
    return pages;
}

function getPostsData() {
    var postsFiles = fs.readdirSync('./data/posts');
    var posts = [];
    _.each(postsFiles, function(file) {
        var filedata = fs.readFileSync('./data/posts/'+file);
        posts = _.concat(posts, fm(String(filedata)) );
    });
    return posts;
}

// Static server
gulp.task('serve',['bootstrap', 'css','js','compile'], function() {

    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });

    gulp.watch("src/css/*.css",['css']);
    gulp.watch("src/js/*.js",['js']);
    gulp.watch(["data/*.json","data/posts/*.*"],['compile']);
    
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
    gulp.watch(["src/*.html", "src/templates/*.html"],['compile']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
            .pipe(gulp.dest('./dist/js'));
});

function loadSiteData(file){
    return {
        site: JSON.parse(fs.readFileSync('./data/siteData.json')),
        pages: getPagesData(file),
        posts: getPostsData()
    }
}

gulp.task('compile', function() {
    return gulp.src('src/*.html')
        .pipe(data(loadSiteData))
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
            'src/css/works.css',
            'src/css/contact-us.css',
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
        'node_modules/jquery.browser/dist/*.min.js',
    ])
    .pipe( gulp.dest('./dist/js') );

    gulp.src([
        'node_modules/font-awesome/fonts/*.*',
    ])
    .pipe( gulp.dest('./dist/fonts') );

});

gulp.task('default', ['serve']);