//cb = callback
/*function tarea(cb){
    console.log("Mi primer tarea");
    cb();//termina la tarea
}

exports.tarea = tarea;
//Ejecutar en la termina npx gulp tarea (enter)*/

//const extrae funcioines de gulp
//src: identifica los archivos de la fuente
//dest: función que permite almacenar el archivo
const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript
const terser = require('gulp-terser-js');

function css( done ) {
    src('src/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        //Compilar hoja de estilos 3 pasos:
        //1- Identificar el archivo SASS
        .pipe(sourcemaps.init())
        .pipe( plumber())
        //2- Compilarlo
        .pipe( sass() ) 
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        //3- Almacenar en el disco duro
        .pipe( dest('build/css') ) 
    done();//callback que avisa a gulp cuando llegamos al final de una ejecución
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

function tarea (done) {
    console.log('Desde la primera tarea');
    done();
}
 
exports.tarea = tarea;

exports.css = css;//para llamarlo en la terminal npx gulp css
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev) ;


