angular.module('LaunchesCtrl', []).controller('LaunchesController', function($scope, $rootScope, $location) {
	$scope.launches = [
			{website : "http://i.imgur.com/XZAMD9P.png",
			description : "Cinderella wearing European fashion of the mid-1860’s"},
			{website : "//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/rapunzel.jpg",
			description : "Rapunzel, clothed in 1820’s period fashion"},
			{website : "//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/belle.jpg",
			description : "Belle, based on 1770’s French court fashion"},
			{website : "//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/mulan_2.jpg",
			description : "Mulan, based on the Ming Dynasty period"},
			{website : "//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/sleeping-beauty.jpg",
			description : "Sleeping Beauty, based on European fashions in 1485"},
			{website : "//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/pocahontas_2.jpg",
			description : "Pocahontas based on 17th century Powhatan costume"},
			{website : "//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/snow-white.jpg",
			description : "Snow White, based on 16th century German fashion"},
			{website : "//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ariel.jpg",
			description : "Ariel wearing an evening gown of the 1890’s"},
			{website : "//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/tiana.jpg",
			description : "Tiana wearing the <i>robe de style</i> of the 1920’s"}
    ]
});