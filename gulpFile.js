var gulp 			= 			require('gulp'),
	sourcemaps 		= 			require('gulp-sourcemaps'),			// sourcemaps 调试
	less 			= 			require('gulp-less'),				// 编译 less
	concat 			= 			require('gulp-concat'),				// 合并 js, css
	uglify 			= 			require('gulp-uglify'),				// 压缩 js
	cssnano 		= 			require('gulp-cssnano'),			// 压缩 css
	plumber 		= 			require('gulp-plumber'),			// pipe出错后跳过任务
	connect 		= 			require('gulp-connect'),			// server
	del 			= 			require('del'),						// node 的删除文件库
	q 				= 			require('q'),						// node 的异步处理库
	jshint			= 			require('gulp-jshint'),				// jshint 代码检测
	htmlhint		= 			require('gulp-htmlhint')			// html 代码检测
	//karma			= 			require('karma')					// karma 测试驱动, 让测试在浏览器里运行
;

// ----------------------
// 路径变量
// ----------------------
// source path
var src = {
	js				: 			'src/js/**/*.js',					// js 文件
	tpl				: 			'src/tpl/**/*.html',				// 模版
	lib				: 			require('./lib/lib.json'),			// 所依赖的外部框架
	img				:			'src/img/**',						// 图片文件
	all				:			'src/**/*',							// 所有文件
	less			: 			'src/less/*.less',					// less文件
//	jsWatch: 'src/js/**/*.js',										// 监听 js文件
	lessWatch		: 			'src/less/**/*.less'				// 监听 less文件
};

// destination path
var dest = {
	js				:			'app/js',
	tpl				:			'app/tpl',
	img				: 			'app/img',
	css				: 			'app/css',
	all				: 			'app/**/*'
};

// 输出命名
var output = {
	jsApp			: 			'app.min.js',
	jsLib			: 			'lib.min.js'
};

// ----------------------
// 任务入口
// ----------------------
gulp.task('default', ['build']);
var build_tasks = ['js', 'css', 'img', 'tpl', 'lib'];				// 发布任务
var dev_tasks = ['js-dev', 'css-dev', 'img', 'tpl', 'lib'];			// 开发任务

gulp.task('watch', ['connect'], function() {						// watch 是开发环境
	console.log('deleting files...');

	del([dest.all]).then(function() {								// 先清空
		console.log('Done! Building tasks started...');

		gulp.start(dev_tasks);										// 先构建一次

		gulp.watch(src.js, ['js-dev', 'js-reload']);
		gulp.watch(src.lessWatch, ['css-dev', 'css-reload']);
		gulp.watch(src.img, ['img', 'img-reload']);
		gulp.watch(src.tpl, ['tpl', 'tpl-reload']);

		gulp.watch(src.all, function(event) {
			var path = event.path,
				file = path.substr(path.indexOf('src'));
			console.log('-----------------------------------------');
			console.log('File ' + file + ' was ' + event.type);
		});
	});
});

gulp.task('build', function() {
	console.log('deleting files...');

	del([dest.all]).then(function() {								// 删除后再执行回调函数, 避免错误
		console.log('Done! Building tasks started...');
		gulp.start(build_tasks);
	});
});


// ----------------------
// 子任务
// ----------------------
// js 发布环境
gulp.task('js', function() {
	return gulp.src(src.js)											// 返回 gulp 流对象
		.pipe(sourcemaps.init())									// 插件需要在 init 和 write 之间
		.pipe(concat(output.jsApp))									// 合并js
		.pipe(uglify())												// 混淆js
		.pipe(sourcemaps.write('.'))								// 插件需要在 init 和 write 之间
		.pipe(gulp.dest(dest.js))
        ;
});

// js-dev 开发环境, 不用混淆, 利于调试
gulp.task('js-dev', function() {

	return gulp.src(src.js)
		.pipe(plumber())											// 出错就跳过那个文件
		.pipe(concat(output.jsApp))									// 合并js
		.pipe(gulp.dest(dest.js))
        ;
});

// 编译 less
gulp.task('css', function() {
	return gulp.src(src.less)
		.pipe(less())												// 编译less
		.pipe(sourcemaps.init())
		.pipe(cssnano())											// 压缩css
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest.css))
        ;
});

// 编译 less-dev 开发环境, 不用压缩, 利于调试
gulp.task('css-dev', function() {
	return gulp.src(src.less)
		.pipe(plumber({
			errorHandler: function(e) {
				console.log('编译 .less 出错了!');
				plumber.stop();										// 跳过这个任务
			}
		}))
		.pipe(less())												// 编译less
		.pipe(gulp.dest(dest.css))
        ;
});

// img
gulp.task('img', function() {
	return gulp.src(src.img)
		.pipe(gulp.dest(dest.img))
        ;
});

// tpl
gulp.task('tpl', function() {
	return gulp.src(src.tpl)
		.pipe(gulp.dest(dest.tpl))
        ;
});

// lib
gulp.task('lib', function() {
	return gulp.src(src.lib)
		.pipe(sourcemaps.init())
		.pipe(concat(output.jsLib))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest.js))
        ;
});

// server
gulp.task('connect', function () {
	connect.server({
		port: 8008,
		livereload: true											// 自动刷新
	});
});

gulp.task('js-reload', ['js-dev'], reload);							// 为了确保顺序执行
gulp.task('css-reload', ['css-dev'], reload);
gulp.task('img-reload', ['img-dev'], reload);
gulp.task('tpl-reload', ['tpl'], reload);

function reload() {
	return gulp.src('./index.html')									// 注意是当前路径
		.pipe(connect.reload())
        ;
}

// check
gulp.task('check', ['js-check', 'html-check']);

gulp.task('js-check', function() {
	return gulp.src(src.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
        ;
});

gulp.task('html-check', ['js-check'], function() {
    return gulp.src(src.tpl)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        ;
});
