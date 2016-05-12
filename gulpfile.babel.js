'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// Chargement des plugins de package.json
const $ = plugins({
    pattern: ['*']  // Tous les plugins, pas seulement ['gulp-*', 'gulp.*'] par défaut.
});

const source = './src';
const destination = './dist';

$.browserSync.create();

gulp.task('default', ['build']);
gulp.task('build', ['styles', 'scripts', 'images', 'copy']);

// Génération du fichier de style principal
gulp.task('styles', () => {
    return gulp.src(`${source}/assets/scss/main.scss`)

    // Initialisation des Source Maps
    .pipe($.sourcemaps.init())

    // Compilation des fichiers Sass
    .pipe($.sass({
        includePaths: [
            'bower_components/bootstrap-sass/assets/stylesheets'
        ]
    }).on('error', $.sass.logError))

    // Ajout des préfixes vendeurs
    .pipe($.autoprefixer('last 2 version'))

    // Minification des fichiers CSS
    .pipe($.cssnano())

    // Renommage des fichiers minifiés
    .pipe($.rename({ suffix: '.min' }))

    // Écriture des Source Maps
    .pipe($.sourcemaps.write('./'))

    // Écriture des fichiers CSS
    .pipe(gulp.dest(`${destination}/assets/css`))

    // Rechargement de la page
    .pipe($.browserSync.reload({
        stream: true
    }));
});

// Génération du fichier JavaScript principal
gulp.task('scripts', () => {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        `${source}/assets/js/**/*`
    ])

    // Initialisation des Source Maps
    .pipe($.sourcemaps.init())

    // Concaténation des fichiers JavaScript
    .pipe($.concat('main.js'))

    // Minification des fichiers JS
    .pipe($.uglify())

    // Renommage des fichiers minifiés
    .pipe($.rename({ suffix: '.min' }))

    // Écriture des Source Maps
    .pipe($.sourcemaps.write('./'))

    // Écriture des fichiers JS
    .pipe(gulp.dest(`${destination}/assets/js`))

    // Rechargement de la page
    .pipe($.browserSync.reload({
        stream: true
    }));
});

// Optimation des images
gulp.task('images', () => {
    return gulp.src(`${source}/assets/img/**/*`)
        .pipe($.cache(
            $.imagemin({ progressive: true })
        ))
        .pipe(gulp.dest(`${destination}/assets/img`));
});

// Copie des fichiers de données dans le répertoire de distribution
gulp.task('copy', () => {
    return gulp.src(`${source}/data/**/*.json`)

    // Écriture des fichiers de données
    .pipe(gulp.dest(`${destination}/data`))

    // Rechargement de la page
    .pipe($.browserSync.reload({
        stream: true
    }));
});

// Initialisation de Browsersync pour le rechargement automatiques des pages
gulp.task('browserSync', () => {
    $.browserSync.init({
        server: {
            baseDir: '.'
        }
    });
});

// Surveillance automatique des fichiers sources
gulp.task('watch', ['browserSync', 'build'], () => {
    gulp.watch('index.html', $.browserSync.reload);
    gulp.watch(`${source}/assets/scss/**/*.scss`, ['styles']);
    gulp.watch(`${source}/assets/js/**/*.js`, ['scripts']);
    gulp.watch(`${source}/data/**/*.json`, ['copy']);
});
