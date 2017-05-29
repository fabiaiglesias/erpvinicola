const gulp = require('gulp')
const gutil = require('gulp-util')
const nodemon = require('gulp-nodemon')
const notify = require('gulp-notify')
const livereload = require('gulp-livereload')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const changed = require('gulp-changed')

//define as bibliotecas das views
const path = {
    htmlSrc: 'src/views/',
    sassSrc: 'public/scss/',
    jsSrc: 'public/js/',
    imgSrc: 'public/images/',

    buildDir: 'build/'
}

//funcao para definição de erro quando algo estiver errado com o servidor
let onError = (error) => {
    gutil.beep()
    gutil.log(gutil.colors.red(error))
}
//funcao para startar o server
let initServer = () => {
  livereload.listen()

    nodemon({
      script: 'app.js',
      ext: 'js'
    })
    .on('restart', () => {
      gulp.src('app.js')
        .pipe(livereload())
        .pipe(notify('Reloading...'))

    })
}

//tasks utilizadas com gulp para as bibliotecas html, css, js e buildDir
//fazer o build dos arquivos

gulp.task('build-html', () => {
  return gulp
          .src(path.htmlSrc.concat('**/*.ejs'))
          .pipe(gulp.dest(path.buildDir.concat('/views')))
          .pipe(livereload())
})

gulp.task('build-css', () => {
  return gulp
          .src(path.sassSrc.concat('**/*.scss'))
          .pipe(sass({
            includePaths: require('node-neat').includePaths,
            style: 'nested',
            onError: () => {
              console.log('Sass error')
            }

          }))
          .pipe(plumber({ errorHandler: onError }))
          .pipe(gulp.dest(path.buildDir.concat('/css')))
          .pipe(livereload())
})

gulp.task('build-js', () => {
    return gulp
            .src(path.jsSrc.concat('*.js'))
            .pipe(plumber({ errorHandler: onError }))
            .pipe(changed(path.buildDir.concat('/js')))
            .pipe(gulp.dest(path.buildDir.concat('/js')))
            .pipe(livereload())
})


gulp.task('build-images', () => {
    return gulp
            .src(path.imgSrc.concat('**/*.+(png|jpg|jpeg|gif|svg)'))
            .pipe(changed(path.buildDir.concat('/images')))
            .pipe(gulp.dest(path.buildDir.concat('/images')))
            .pipe(livereload())
})

gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-images'], () => {
  return initServer()

})

gulp.task('watch', () => {
  gulp.watch('src/views/**/*.ejs', ['build-html'])
  gulp.watch('public/scss/**', ['build-css'])
  gulp.watch('public/js/**/*.js', ['js'])
})

const env = process.env.NODE_ENV || 'development'

if(env === 'development') {
  return gulp.task('default', ['build', 'watch'])
}
