/*
 * Instalacja gulpa dla kompilacjli plikw sass krok po kroku
 * 1. Instalujemy node.js poprzez instalator (Windows, Mac) lub poprzez package manager(Ubuntu):
 * curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
 * sudo apt-get install -y nodejs
 * - noda instalujemy tyko raz dla systemu
 *
 * 2. Instalacja gulpa:
 * instalujemy gulpa globalnie dla całego systemu (Dzięki temu gulp będzie dostępny w terminalu/gitbash z każdego miejsca naszego systemu - globalnie instalujemy tylko raz)
 * npm install -g gulp
 * 3. Incjujemy npm komendą npm init - postępujemy zgodnie z instrukcją w terminalu
 *  - Instalujemy gulpa lokalnie w folderze z naszym aktualnym projektem: npm install gulp --save-dev
 *  - Pamiętajcie o --save-dev - tutaj jest wyjaśnienie dlaczego to jest ważne
 *  http://stackoverflow.com/questions/22891211/what-is-difference-between-save-and-save-dev
 *
 * Po zainicjowaniu npm komendą npm init - w naszym folderze stworzy się plik package.json - przy każdej instalacji kolejnych paczek np. gulp, gulp-sass w pliku package.json dopiszą się nam automatycznie zainstalowane paczki do listy dependencji (devDependencies). Jednocześnie w naszym folderze stworzy się katalog node_modules z naszymi paczkami
 *
 * 4. Dodajemy plik .gitignore (W pliku .gitignore należy dodac katalog node_modules). Ważne by katalog node_modules był ignorowany przez gita. Nie potrzebujemy go w repozytorium: jeśli chcesz odtworzy zainstalowane wcześniej paczki np. na innym komputerze zawsze można użyc komendy npm install - npm zainstaluje automatycznie wszystkie paczki zapisane w pliku package.json.
 * (Uwaga - możemy także przekopiowac folder node_modules zamiast używac komendy npm install - w wielu przypadkach jednak katalog ten będzie bardzo duży, w Windowsie moze się też zdarzyc, że nie wszystkie paczki sie przekopiuja - ze względu na dlugosc nazw plikow)
 */

/*
 * Kompilacja sassa
 * 1. Aby skompilowac sass-a do css musimy doinstalowac kolejna paczke - gulp-sass: npm install gulp-sass --save-dev
 */

//Pobieramy referencje do paczek w katalogu node_modules
var gulp = require("gulp");
var sass = require("gulp-sass");

//Uruchamiamy zadanie
//Pamiętajcie o strukturze - tworzymy sobie warsztat pracy - naszym warsztatem będzie katalog sass a w nim głownym plikiem będzie main.scss - pierwszym argumentem w metodzie w naszm taksu jest string "sass" - posłuzy on nam za kazdym razem do wywolania zadania w konsoli - w tym wypadku gulp sass
//Tworzymy więc katalog scss (Warsztat pracy) i katalog css (Witryna z gotowymi plikami (plikiem)m ktry załączymy do index.html)
//Pamiętaj o załączeniu pliku .css do pliku z twoim html-em (index.html)
gulp.task("sass", function() {
    //Pobieramy referencje/źrodlo naszego "warsztatu pracy"
    return gulp.src("scss/main.scss")
        //Uruchamiamy 'maszynę' w warsztacie - w tym miejscu kompiluje się sass
        .pipe(sass({
            errLogToConsole: true
        }))
        //Pobieramy referencję do katalogu docelowego, gdzie mają się znaleźc skomilowane pliki css (uwaga w tym pliku sami niczego nie piszemy)
        .pipe(gulp.dest('css')); //jezeli nasz plik sass to main.scss - tutaj stworzy nam się plik main.css
});

//Obserwator
// Żeby za każdym razem nie wykonywac komendy gulp sass mozemy ustawic "obserwatora", ktory bedzie sledzil wszystkie zmiany w kodzie
gulp.task("watch", function() {
    //Ustawiamy obserwatora
    // /**/*.scss - to jest zapis składni minimatch, ktorej uzywa npm - wiecej o niej mozna przerczytac tutaj: https://github.com/isaacs/minimatch (Wiem, ze dokumentacja jest slaba)
    // /**/*.scss - ten zapis oznacza: obeserwuj wszystkie pliki z rozszerzeniem scss w katalogu scss (rowniez we wszystkich podkatalogach)
    // //Drugi paramater w tym wypadku - ["sass"], oznacza ze za kazda "obserwacją" - czyli kazda 'zasejwowaną'' zmianą
    // ma się wykonanac task "sass" - zauważ, że to array, taskow moze byc wiec więcej i w takim wypadku bedą sie wykonywaly po kolei
    gulp.watch("scss/**/*.scss", ["sass"]);
});

//Wywolaj komendę gulp watch


/**
 * Wersja bardziej zaawansowana
 */



var gulp = require("gulp");
var sass = require("gulp-sass");
// Podlgląd w czasie rzeczywistym
var browserSync = require('browser-sync').create();
//Sourcemapa
var sourcemaps = require('gulp-sourcemaps');
//Autoprefixer -automatycznie dodaje prefixy (Bardzo ulatwia pracę - szczegolnie z flexboxem, ktory ma nieoczywiste prefixy)
var autoprefixer = require('gulp-autoprefixer');
//Te dwie paczki sprawią, że gulp watch i gulp-serve nie będzie się wywalał przy każdym błędzie
var plumber = require('gulp-plumber');
var util = require('gulp-util');



gulp.task("sass", function() {
    return gulp.src("scss/main.scss")
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['> 1%'], //największy zakres ['> 1%'] - więcej niż 99% procent przeglądarek
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});
//Jeśli potrzebujemy browser sync
// komenda gulp serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
//Jesli wystaczy nam watch
//Komenda gulp watch
gulp.task("watch", function() {
    gulp.watch("scss/**/*.scss", ["sass"]);
});
//Jeżeli jesteś na macu lub linuxie instalacja paczek może wymagac sudo
/**
 * FAQ
 * 1. gulp watch, gulp sass lub gulp sass nie działają - sprawdź czy widzisz w katalogu projektu folder node_modules, sprawdź czy w pliku package.json w devDependencies są wszystkie wtyczki - eventualnie doinstaluj wtyczki np. npm install gulp gulp-sass --save-dev, jeżli nie ma katalogu node_modules a jest plik package.json w terminalu wpisz npm install
 * 2. gulp watch, gulp serve lub gulp sass działają ale nie widzę zmian - sprawdź czy w pliku index.html załączyłeś plik main.css, sprawdź czy terminal jest otwarty we właściwym katalogu z twoim projektem
 */
