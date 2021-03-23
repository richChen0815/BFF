var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
gulp.task('default',function(){
    console.log("1231");
    return gulp.src("./server/app.js")
    .pipe(uglify())
    .pipe(rename({
        basename: "app",
        // prefix: "min",
        suffix: ".min", 
        extname: ".js"
    }))
    .pipe(gulp.dest("./server/"))
})