var gulp = require('gulp');
var uglify = require('gulp-uglify');   // js文件压缩
var minifyHtml = require('gulp-minify-html');    //压缩html文件
var minifyCss = require('gulp-minify-css');  //压缩css文件
var watch = require('gulp-watch');  // 文件监听 => 热加载
var rename = require('gulp-rename');   // 打包后的文件重命名
var connect = require('gulp-connect');   // 开启服务器 模块
var babel = require('gulp-babel');
var sass = require('gulp-sass');

// 监听配置目录下的文件  =>  热加载
gulp.task('watchs', function () {
    // 监听目录下的文件,若有改变,自动执行gulp.series()中的命令
    gulp.watch('./index.html', gulp.series('html-index'));   //监听首页html文件
    gulp.watch('./src/html/*.html', gulp.series('html'));
    gulp.watch('./src/css/*.css', gulp.series('css'));
    gulp.watch('./src/css/*scss', gulp.series('sass'));
    gulp.watch('./src/js/*.js', gulp.series('js'));
})

gulp.task('connect', function () {
    connect.server({
        root: './',
        // ip:'localhost:8080'  默认localhost:8080端口
        livereload: true,  //热加载
        port: 9900  //端口号
    });
})

// 监听首页html文件
gulp.task('html-index', function () {
    return gulp.src('./index.html')
        // .pipe(minifyHtml())
        .pipe(gulp.dest('./dest'))
        .pipe(connect.reload())
})

gulp.task('html', function () {
    return gulp.src('./src/html/*.html')
        // .pipe(minifyHtml())
        .pipe(gulp.dest('./dest/src/html'))
        .pipe(connect.reload())
})

gulp.task('css', function () {
    return gulp.src('./src/css/*.css')
        // .pipe(minifyCss())
        .pipe(gulp.dest('./dest/src/css'))
        .pipe(connect.reload())
})

gulp.task('sass', function () {
    return gulp.src('./src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dest/src/css'))
})

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(babel({   //编译es6文件
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(rename('index.min.js'))   //使用rename后注意改压缩后的引入文件名
        .pipe(gulp.dest('./dest/src/js'))
        .pipe(connect.reload())
});

gulp.task('default', gulp.series(gulp.parallel('connect', 'watchs', 'html-index', 'html', 'css', 'sass', 'js')))