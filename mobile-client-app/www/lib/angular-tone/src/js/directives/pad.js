/**
 * Created by felix on 07.04.16.
 */
(function() {
  'use strict';
  angular.module('ec.angular.tone').directive('pad', function() {
    return {
      scope:      {
        size:      '@?',
        color:     '@?',
        onTrigger: '=?',
        ngModel:   '=?',
        data:      '=?'
      },
      transclude: true,
      link:       function(scope) {
        scope.ngModel = scope.ngModel || false;
        scope.data = scope.data || {};
        scope.size = scope.size || 100;
        scope.color = scope.color || '#F06';
        scope.style = {
          width:           scope.size + 'px',
          height:          scope.size + 'px',
          backgroundColor: scope.color,
          display:         'inline-block',
          margin:          '4px',
          border:          '1px solid #000'
        };

        scope.$watch('ngModel', function() {
          scope.style.backgroundColor = scope.ngModel ? scope.color : '#FFF';
        });

        scope.clickedPad = function() {
          scope.ngModel = !scope.ngModel;
          if (scope.onTrigger) {
            scope.onTrigger(scope.ngModel, scope.data);
          }
        };
      },
      template:   '<div ng-click="clickedPad()" ng-style="style" ng-class="{\'active\':ngModel}"><ng-transclude></ng-transclude></div>'
    };
  });
}());