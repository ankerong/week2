var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
var css = require('gulp-clean-css'); // 压缩css的
var scss = require('gulp-sass'); // 编译scss的
var autoprefixer = require('gulp-autoprefixer'); // 前缀
// var mock = require('./mock/data');
// console.log(mock);
// 压缩css编译scss
gulp.task('mincss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(css())
        .pipe(gulp.dest('src/css'));
});
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 3030,
            host: 'localhost',
            open: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    // res.end(JSON.stringify(mock(pathname)));
                    res.end('111');
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})
gulp.task('watch', function() {
    gulp.watch(['src/css/*.css'], ['mincss'])
})