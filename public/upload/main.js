angular.module('fileUpload', ['ngFileUpload'])
.controller('MyCtrl',['Upload','$window','$http',function(Upload,$window,$http){
    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file,vm.filename); //call upload function
        }
    }
    
    vm.upload = function (file,filename) {
        Upload.upload({
            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: '+ ''+resp.data.filename);
                var data = {
                    titre: filename,
                    filename: resp.data.filename
                };
                $http.post("http://localhost:3000/media/upload", data)
                    .then(function (data, status) {
                        $window.alert('saved to db!');
                    });
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
}]);