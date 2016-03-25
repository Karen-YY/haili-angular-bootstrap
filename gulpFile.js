var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),					// sourcemaps 调试
	less = require('gulp-less'),								// 编译 less
	concat = require('gulp-concat'),							// 合并 js, css
	uglify = require('gulp-uglify'),							// 压缩 js
	cssnano = require('gulp-cssnano'),							// 压缩 css
	plumber = require('gulp-plumber'),							// pipe出错后跳过任务
	del = require('del');										// 删除文件/文件夹

// ----------------------
// 路径变量
// ----------------------
// source path
var src = {
	js: 'src/js/*.js',											// js 文件
	tpl: 'src/tpl/**/*.html',									// 模版
	img: 'src/img/**',											// 图片文件
	less: 'src/less/*.less',									// less文件
	jsWatch: 'src/js/**/*.js',									// 监听 js文件
	lessWatch: 'src/less/**/*.less'								// 监听 less文件
};

// destination path
var dest = {
	js: 'app/js',
	tpl: 'app/tpl',
	img: 'app/img',
	css: 'app/css',
	all: 'app/**/*'
};

// ----------------------
// 任务入口
// ----------------------
// default / watch / build 任务
gulp.task('default', ['build']);

gulp.task('watch', function() {									// watch 是开发环境
	del([dest.all]).then(function() {							// 先清空
		gulp.run('dev-tasks');									// 先构建一次
		gulp.watch(src.jsWatch, ['js-dev']);
		gulp.watch(src.lessWatch, ['css-dev']);
		gulp.watch(src.img, ['img']);
		gulp.watch(src.tpl, ['tpl']);
	});
});

gulp.task('build', ['del']);									// 发布环境
gulp.task('build-tasks', ['js', 'css', 'img', 'tpl']);			// 发布任务
gulp.task('dev-tasks', ['js-dev', 'css-dev', 'img', 'tpl']);	// 调试任务

// 清空旧文件再发布
gulp.task('del', function() {
	del([dest.all]).then(function() {							// 删除后再执行回调函数, 避免错误
		gulp.run('build-tasks');								// 执行相应任务
	});
});

// ----------------------
// 分任务
// ----------------------
// js 发布环境
gulp.task('js', function() {
	return gulp.src(src.js)
		.pipe(sourcemaps.init())								// 插件需要在 init 和 write 之间
		.pipe(concat('app.min.js'))								// 合并js
		.pipe(uglify())											// 混淆js
		.pipe(sourcemaps.write('.'))							// 插件需要在 init 和 write 之间
		.pipe(gulp.dest(dest.js));
});

// js-dev 开发环境, 不用混淆, 利于调试
gulp.task('js-dev', function() {
	return gulp.src(src.js)
		.pipe(plumber())										// 出错也能继续
		.pipe(concat('app.min.js'))								// 合并js
		.pipe(gulp.dest(dest.js));
});

// 编译 less
gulp.task('css', function() {
	return gulp.src(src.less)
		.pipe(less())											// 编译less
		.pipe(sourcemaps.init())
		.pipe(cssnano())										// 压缩css
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest.css));
});

// 编译 less-dev 开发环境, 不用压缩, 利于调试
gulp.task('css-dev', function() {
	return gulp.src(src.less)
		.pipe(plumber())										// 出错也能继续
		.pipe(less())											// 编译less
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