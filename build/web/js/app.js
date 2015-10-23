var app = angular.module('viewApp', ['ngRoute']);
// Route Provider Start
app.config(function ($routeProvider) {
    $routeProvider
            .when("/Person", {
                templateUrl: "views/Person.html",
                controller: "UserController as ctrl"
            })
            .when("/info/:first", {
                templateUrl: "views/PersonDetails.html",
                controller: "UserController as ctrl"
            })
            .when("/AddPerson", {
                templateUrl: "views/AddPerson.html",
                controller: "UserController"
            })
            .otherwise({
                redirectTo: "/Person"
            });
});
// Route Provider End

var users = [];
app.controller("UserController", function ($http, $routeParams) {
    var self = this;
    if (users.length === 0) {
        $http.get("data/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        })
    }
    else { //We used the cache property on the http request instead
        self.users = users;
    }
    if (users != null) {
        console.log("Adding user: " + $routeParams.id)
        self.user = users[$routeParams.id];
    }
});
