/**
 * Controls the payment
 */
var app = angular.module('payment', []);
    app.controller("paymentCtrl",function($scope,$http){

        $scope.submit = function () {
            var data = {};
            data.token = $scope.token;
            data.ccNo= $scope.ccNo;
            data.expMonth= $scope.expMonth;
            data.expYear= $scope.expYear;
            data.cvv= $scope.cvv;
            $http.post('http://localhost:3000/payment/pay',data)
                .then(function(response){
                    console.log(response);
                    $scope.message="success";
                    $scope.pay=response.data;

                });
        }


    });

