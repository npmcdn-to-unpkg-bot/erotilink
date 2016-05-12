'use strict';
/* global angular */

angular.module('landingApp', [])
    .controller('LandingController', function ($scope, $http) {
        var landing = this;

        // Récupération de la liste des utilisatrices
        $http.get('dist/data/users.json')
            .then(function (res) {
                landing.users = res.data;
            });

        // Affichage de la première étape
        $scope.showStep1 = true;

        // Affichage d'une étape
        landing.showStep = function (step) {
            landing.hideSteps();

            $scope['showStep' + step] = true;
        };

        // Cacher les étapes
        landing.hideSteps = function () {
            for (var s = 1; s <= 3; s++) {
                $scope['showStep' + s] = false;
            }
        };
    }
);
