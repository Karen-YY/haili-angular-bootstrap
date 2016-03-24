var gulp = require('gulp'),
	watch = require('gulp-watch'),				// watch change of files
	sourcemaps = require('gulp-sourcemaps'),	// sourcemaps 调试
	less = require('gulp-less'),				// 编译 less
	concat = require('gulp-concat'),			// 合并 js, css
	uglify = require('gulp-uglify'),			// 压缩 js
	cssnano = require('gulp-cssnano'),			// 压缩 css
	clean = require('gulp-clean');				// 清空旧文件

	
// source path
var src = {
	js: 'src/js/*.js',			// js 文件
	tpl: 'src/tpl/**/*.html',	// 模版
	img: 'src/img/**',			// 图片文件
	less: 'src/less/*.less'		// less文件
};

// destination path
var dest = {
	js: 'app/js',
	tpl: 'app/tpl',
	img: 'app/img',
	css: 'app/css'
};


// default / watch / build 任务
gulp.task('default', ['build']);

gulp.task('watch', function() {
	gulp.watch(src.js, ['js']);
	gulp.watch(src.less, ['css']);
	gulp.watch(src.img, ['img']);
	gulp.watch(src.tpl, ['tpl']);
});

gulp.task('build', ['clean']);

gulp.task('debug', ['js', 'css', 'img', 'tpl']);		// 调试的时候使用, 可以加快速度

// 清空旧文件
gulp.task('clean', function() {
	for (var key in dest) {
		gulp.src(dest[key] + '/**/*', {read: false})	// read: false 是否读取文件内容, 可以加快删除速度
			.pipe(clean({force: true}));				// force true 可以删除外部路径
		gulp.run(key);									// 执行相应任务
	}
});

// js
gulp.task('js', function() {
	return gulp.src(src.js)
		.pipe(sourcemaps.init())			// 插件需要在 init 和 write 之间
		.pipe(concat('app.min.js'))			// 合并js
		.pipe(uglify())						// 混淆js
		.pipe(sourcemaps.write('.'))		// 插件需要在 init 和 write 之间
		.pipe(gulp.dest(dest.js));
});

// 编译 less
gulp.task('css', function() {
	return gulp.src(src.less)
		.pipe(sourcemaps.init())
		.pipe(less())						// 编译less
		.pipe(cssnano())					// 压缩css
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest.css));
});

// img
gulp.task('img', function() {
	return gulp.src(src.img)
		.pipe(gulp.dest(dest.img));
});

// tpl
gulp.task('tpl', function() {
	return gulp.src(src.tpl)
		.pipe(gulp.dest(dest.tpl));
});