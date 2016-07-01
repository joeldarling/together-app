/**
 * Created by felix on 07.04.16.
 */
(function() {
  'use strict';
  angular.module('ec.angular.tone').directive('matrix', function() {
    return {
      scope:    {
        width:     '=?',
        height:    '=?',
        onTrigger: '=?',
        ngModel:   '=?'
      },
      link:     function(scope) {
        scope.width = typeof scope.width === "number" ? scope.width : 4;
        scope.height = typeof scope.height === "number" ? scope.height : 4;
        scope.ngModel = scope.ngModel || [];

        scope.getNumber = function(num) {
          return new Array(num);
        };
        scope.cellClicked = function(active, position) {
          if (scope.onTrigger) {
            scope.onTrigger(active, position, scope.ngModel);
          }
        };
      },
      template: '<div class="matrix"><div class="row" ng-repeat="(m,i) in getNumber(width) track by $index"><pad ng-repeat="(n,j) in getNumber(height) track by $index" on-trigger="cellClicked" data="{x:n,y:m}" ng-model="ngModel[m][n]"></pad></div></div>'
    };
  });
}());