'use strict';

angular.module('social-Share', [])
  .directive('shareLinks', ['$location', function ($location) {
    return {
      link: function (scope, elem, attrs) {
        var i,
            sites = ['twitter', 'facebook', 'linkedin', 'google-plus'],
            theLink,
            links = attrs.shareLinks.toLowerCase().split(','),
            pageLink = "http://ec2-54-215-234-96.us-west-1.compute.amazonaws.com/view/" + attrs.launchId,
            pageTitle = attrs.shareTitle,
            pageTitleUri = encodeURIComponent(pageTitle),
            shareLinks = [],
            square = '';

        elem.addClass('td-easy-social-share');

        // check if square icon specified
        square = (attrs.shareSquare && attrs.shareSquare.toString() === 'true') ? '-square' : '';

        // assign share link for each network
        angular.forEach(links, function (key) {
          key = key.trim();

          switch (key) {
            case 'twitter':
              theLink = 'https://twitter.com/intent/tweet?text=' + pageTitleUri + '%20' + pageLink;
              break;
            case 'facebook':
              theLink = 'https://facebook.com/sharer.php?u=' + pageLink;
              break;
            case 'linkedin':
              theLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + pageLink + '&title=' + pageTitleUri;
              break;
            case 'google-plus':
              theLink = 'https://plus.google.com/share?url=' + pageLink;
              break;
          }

          if (sites.indexOf(key) > -1) {
            shareLinks.push({network: key, url: theLink});
          }
        });

        var baseHTML = '';
        for (i = 0; i < shareLinks.length; i++) {
          var anchor = '';
            if (i == 1)
                baseHTML = 'target= "_blank" id="so-tw" class="btn btn-primary social-login-btn social-twitter" ng-click="$event.stopPropagation()"><i class="fa fa-twitter"></i></a>';
            if (i == 0)
                baseHTML = 'target= "_blank" id="so-fa" class="btn btn-primary social-login-btn social-facebook" ng-click="$event.stopPropagation()"><i class="fa fa-facebook"></i></a>';
            if (i == 2)       
                baseHTML = 'target= "_blank" id="so-li" class="btn btn-primary social-login-btn social-linkedin" ng-click="$event.stopPropagation()"><i class="fa fa-linkedin"></i></a>';
            if (i == 3)
                baseHTML = 'target= "_blank" id="so-go" class="btn btn-primary social-login-btn social-google" ng-click="$event.stopPropagation()"><i class="fa fa-google-plus"></i></a>';
          anchor += '<a href="'+ shareLinks[i].url + '"';
          anchor += baseHTML;
          elem.append(anchor);
        }
      }
    };
  }]);
