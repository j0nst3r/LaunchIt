angular.module('DataService', []).factory('dataService', ['$http', '$q', function ($http, $q) {
    var urlBase = '';
    $http.get('application.properties').then(function(response){
        console.log(response);
        urlBase = response.data.apiUrl + "api";
    });
    $http.defaults.headers.post["Content-Type"] = 'application/JSON';
    var dataService = {};

    dataService.getImageUrl = getImageUrl;

	/*
	 LOGIN SERVICE CALLS
	 */
    dataService.validateEmail = validateEmail;
    dataService.updateEmail = updateEmail;
    dataService.validatePassword = validatePassword;
    dataService.getAccount = getAccount;
    dataService.createAccount = createAccount;
    dataService.resetPassword = resetPassword;
    dataService.performLoginOperation = performLoginOperation;
	/*
	 LAUNCH SERVICE CALLS
	 */
    dataService.getLaunchById = getLaunchById;
    dataService.getAllLaunches = getAllLaunches;
    dataService.getLaunches = getLaunches;
    dataService.createLaunch = createLaunch;
    dataService.updateLaunch = updateLaunch;
    dataService.deleteLaunch = deleteLaunch;
    dataService.castVote = castVote;
    dataService.uncastVote = uncastVote;
    dataService.uploadImage = uploadImage;
    dataService.addToFavorites = addToFavorites;
    dataService.getFavoriteLaunches = getFavoriteLaunches;
    dataService.removeFromFavorites = removeFromFavorites;


    dataService.getProfile = getProfile;
    dataService.updateProfile = updateProfile;
    dataService.getFollowerInfo = getFollowerInfo;
    dataService.getFollowingStatus = getFollowingStatus;
    dataService.updateFollowing = updateFollowing;

    return dataService;

    function updateFollowing(type, loggedUser, otherUser){

        var apiUrl = {};
        var data = {};
        data.userId = loggedUser;
        data.followId = otherUser;

        if(type == 'start'){
            apiUrl = urlBase + '/addToFollowing'
        }else{
            apiUrl = urlBase + '/removeFromFollowing'
        }

        return $http({
            method: 'POST',
            url: apiUrl,
            data: data
        }).then(
            function(res){
                console.log(res);
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            }
        )
    }

    function getFollowingStatus(data){
        return $http({
            method: 'POST',
            url: urlBase + '/getFollowingStatus',
            data: data
        }).then(
            function(res){
                console.log(res);
                return res.data
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            }
        )
    }

    function getImageUrl(profileId){
        return urlBase.concat('/userImage/').concat(profileId);
    }

    function uploadProfileImage(params){
        return $http({
            method: 'POST',
            url: urlBase + '/uploadProfileImage'
        }).then(
            function(res) {
                console.log(JSON.stringify(res.data));
                return res.data;
            },
            function(res) {
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            }
        )
    }

    function getLaunchById(){
        return $http({
            method: 'GET',
            url: urlBase + '/getLaunchById/:launchId',
        }).then(
            function(res) {
                console.log(JSON.stringify(res.data));
                return res.data;
            },
            function(res) {
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            }
        )
    }


    // get all of the launches in the database and return them
    function getAllLaunches(){
        return $http({
            method: 'GET',
            url: urlBase + '/getAllLaunches',
        }).then(
            function(res) {
                console.log(JSON.stringify(res.data));
                return res.data;
            },
            function(res) {
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            }
        )
    }

    function castVote(vote, caster, launch){
        console.log("voting")
        return $http({
            method:'POST',
            url: urlBase + '/castVote',
            data:	{
                type: vote,
                userId: caster,
                launchId: launch
            }
        }).then(
            function(res){
                console.log(res.data);
                return res.data
            },
            function(res){
                console.log(res.data);
                return $q.reject(res.data)
            }
        );
    }

    function uncastVote(vote, caster, launch){
        console.log("unvoting")
        return $http({
            method:'POST',
            url: urlBase + '/uncastVote',
            data:	{
                type: vote,
                userId: caster,
                launchId: launch
            }
        }).then(
            function(res){
                console.log(res.data);
                return res.data
            },
            function(res){
                console.log(res.data);
                return $q.reject(res.data)
            }
        );
    }

    function addToFavorites(user, launch) {
        $http({
            method:'POST',
            url: urlBase + '/addToFavorites',
            data: {
                userId: user,
                launchId: launch
            }
        }).then(
            function(body){
                console.log(body);
            },
            function(res){
                console.log(res.data);
            }
        );
    }

    function removeFromFavorites(user, launch) {
        $http({
            method:'POST',
            url: urlBase + '/removeFromFavorites',
            data: {
                userId: user,
                launchId: launch
            }
        }).then(
            function(body){
                console.log(body);
            },
            function(res){
                console.log(res.data);
            }
        );
    }

    function validateEmail(newEmail){
        return $http({
            method: 'POST',
            url: urlBase + '/validateEmail',
            data: newEmail
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }

    function validatePassword(data){
        return $http({
            method: 'POST',
            url: urlBase + '/validatePassword',
            data: data
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }

    function getLaunches(owner) {
        return $http({method: 'POST', url: urlBase + '/getLaunches', data: { owner: owner }})
            .then(function (res) {
                    console.log(res.data);
                    return res.data;
                },
                function (res) {
                    console.log(JSON.stringify(res.data));
                    return $q.reject(res.data);
                });
    }

    function getFavoriteLaunches(user) {
        return $http({method: 'POST', url: urlBase + '/getFavoriteLaunches', data: { userId: user }})
            .then(function (res) {
                    console.log(res.data);
                    return res.data;
                },
                function (res) {
                    console.log(JSON.stringify(res.data));
                    return $q.reject(res.data);
                });
    }

    // function createLaunch(newLaunch){
    //     return $http({method: 'POST', url : urlBase + '/createLaunch', data: newLaunch})
    //         .then(function(body){
    //                 console.log(body);
    //                 return body;
    //             },
    //             function(res){
    //                 console.log(JSON.stringify(res.data));
    //                 return $q.reject(res.data);
    //             });
    // }

    function createLaunch(launch) {

        return $.ajax({
            method: 'POST',
            url: urlBase + '/createLaunch',
            dataType: 'json',
            data: launch,
            contentType: false,
            cache: false,
            processData: false,
            success: response => console.log(response),
            error: (xhr, status, err) => console.log("ERROR: " + err)
        })
    }

    function uploadImage(newLaunch){
        console.log(newLaunch)
        return $http({method: 'POST', url : urlBase + '/uploadImage/' + newLaunch.owner})
    }

    function updateLaunch(launch) {
        const formData = new FormData()
        formData.append('body', JSON.stringify(launch))

        return $.ajax({
            method: 'POST',
            url: urlBase + '/updateLaunchInfo',
            dataType: 'json',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,

            beforeSend: () => console.log(JSON.stringify(formData)),
            success: response => console.log(response),
            error: (xhr, status, err) => console.log("ERROR: " + err)
        }).then(body => {
            console.log(body)
            return body
        }, res => {
            console.log(res.data)
            return $q.reject(res)
        })
    }
    function deleteLaunch(launch) {
        return $http({
            method: 'POST',
            url: urlBase + '/deleteLaunch', 
            data: launch
        }).then(body => {
            console.log(body)
            return body
        }, res => {
            console.log(JSON.stringify(res.data))
            return $q.reject(res)
        })
    }

    function getAccount(accountInfo) {
        return $http({
            method: 'POST',
            url: urlBase + '/getAccount',
            data: accountInfo
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }

    function updateEmail(accountInfo){
        return $http({
            method: 'POST',
            url: urlBase + '/updateEmail',
            data: accountInfo
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }

    function resetPassword(accountInfo){
        return $http({
            method: 'POST',
            url: urlBase + '/resetPassword',
            data: accountInfo
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }

    function createAccount(newUser){
        return $http({
            method: 'POST',
            url: urlBase + '/createAccount',
            data: newUser
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }


    function performLoginOperation(userIn, passIn){
        return $http({
            method: 'POST',
            url: urlBase + '/login',
            data: {email : userIn,
                password : passIn}
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }

    function getProfile(profileID){
        console.log(profileID);
        return $http({
            method: 'POST',
            url: urlBase + '/getProfileById',
            data: profileID
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body.data;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }

    function updateProfile(data){
        console.log(data);
        return $http({
            method: 'POST',
            url: urlBase + '/updateProfileInfo',
            data: data
        }).then(
            function(body) { //what to on on success call
                console.log(body);
                return body.data;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);
            });
    }

    function getFollowerInfo(followingList){
        return $http({
            method: 'POST',
            url : urlBase + '/getFollowerInfo',
            data: followingList
        }).then(
            function(body){
                console.log(body);
                return body.data;
            },
            function(res){
                console.log(JSON.stringify(res.data));
                return $q.reject(res.data);    
        })
    }
}]);