const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const glob = require('glob');

function compileCss() {
  return gulp.src(['src/Styles/**/*.css']) // Seleciona todos os arquivos CSS em src/Styles e seus subdiretórios
    .pipe(concat('style.min.css')) // Concatena todos os arquivos em um único arquivo 'style.min.css'
    .pipe(cleanCSS()) // Minifica o arquivo CSS
    .pipe(gulp.dest('public/css')); // Salva o arquivo minificado em public/css
}

function compileJs() {
  return gulp.src('src/Js/*.js')
    .pipe(gulp.dest('public/js')); // Copia todos os arquivos JS de src/Js para public/js
}

function watch() {
  gulp.watch('src/Styles/**/*.css', compileCss); // Observa mudanças nos arquivos CSS
  gulp.watch('src/Js/*.js', compileJs); // Observa mudanças nos arquivos JS
}

exports.default = watch;