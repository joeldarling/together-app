/**
 * Created by felix on 07.04.16.
 */
(function() {
  'use strict';
  angular.module('ec.angular.tone').controller('SynthCtrl', function($scope, $log) {
    $log.info('welcome to the tone playground!');
    $scope.fatSynth = new Tone.MonoSynth({
      "portamento":     0.01,
      "oscillator":     {
        "type": "sine"
      },
      "envelope":       {
        "attack":  0.005,
        "decay":   0.2,
        "sustain": 0.4,
        "release": 1.4
      },
      "filterEnvelope": {
        "attack":        0.005,
        "decay":         0.1,
        "sustain":       0.05,
        "release":       0.8,
        "baseFrequency": 300,
        "octaves":       4
      }
    }).toMaster();

    $scope.polySynth = new Tone.PolySynth(3, Tone.MonoSynth).toMaster();

    $scope.attackSynth = function(note, frequency) {
      $scope.fatSynth.triggerAttack(frequency);
    };
    $scope.releaseSynth = function() {
      $scope.fatSynth.triggerRelease();
    };

    $scope.playSynth = function(active, pad, matrix) {
      console.debug(pad, matrix);
      if (active) {
        $scope.fatSynth.triggerAttackRelease("C#4", "8n");
      }
    };
  });
}());

/**
 * Created by felix on 07.04.16.
 */
(function() {
  'use strict';
  angular.module('ec.angular.tone', []);
}());


/**
 * Created by felix on 07.04.16.
 */
(function() {
  'use strict';
  angular.module('ec.angular.tone').directive('keyboard', function() {
    return {
      scope:    {
        id:               '@',
        config:           '=?',
        width:            '=?',
        height:           '=?',
        octaves:          '=?',
        startNote:        '@?',
        whiteNotesColour: '@?',
        blackNotesColour: '@?',
        hoverColour:      '@?',
        keyUp:            '=?',
        keyDown:          '=?',
        synth:            '=?'
      },
      link:     function(scope) {
        scope.config = scope.config || scope;
        var keyboard = new QwertyHancock({
          id:               scope.config.id,
          width:            scope.config.width || 600,
          height:           scope.config.height || 150,
          octaves:          scope.config.octaves || 2,
          startNote:        scope.config.startNote || 'A3',
          whiteNotesColour: scope.config.whiteNotesColour || 'white',
          blackNotesColour: scope.config.blackNotesColour || 'black',
          hoverColour:      scope.config.hoverColour || '#f3e939'
        });
        keyboard.keyDown = function(note, frequency) {
          if (scope.keyDown) {
            scope.keyDown(note, frequency);
          }
          if (scope.synth) {
            scope.synth.triggerAttack(frequency);
          }
        };
        keyboard.keyUp = function(note, frequency) {
          if (scope.keyUp) {
            scope.keyUp(note, frequency);
          }
          if (scope.synth) {
            scope.synth.triggerRelease();
          }
        };
      },
      template: '<div ng-id="key"></div>'
    };
  });
}());
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

        scope.$watch('ngModel', function() {
          console.debug('ngModel: ', scope.ngModel);
        });

        scope.getNumber = function(num) {
          return new Array(num);
        };
        scope.cellClicked = function(active, data) {
          if (scope.onTrigger) {
            scope.onTrigger(active, data, scope.ngModel);
          }
        };
      },
      template: '<div class="matrix"><div class="row" ng-repeat="(m,i) in getNumber(width) track by $index"><pad ng-repeat="(n,j) in getNumber(height) track by $index" on-trigger="cellClicked" data="{x:n,y:m}" ng-model="ngModel[m][n]"></pad></div></div>'
    };
  });
}());
/**
 * Created by felix on 07.04.16.
 */
(function() {
  'use strict';
  angular.module('ec.angular.tone').directive('mixer', function() {
    return {
      scope:    {
        ngModel: '=?'
      },
      link:     function(scope) {
        scope.isNumber = function(value) {
          return typeof value === 'number';
        };

        if (typeof scope.ngModel !== 'object') {
          console.error('ngModel must be an object!');
        }
      },
      template: '<div class="tone-mixer"><poti ng-if="isNumber(param)" label="{{key}}" ng-repeat="(key, param) in ngModel" ng-model="param"></poti></div>'
    };
  });
}());
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
/**
 * Created by felix on 07.04.16.
 */
(function() {
  'use strict';
  angular.module('ec.angular.tone').directive('poti', function() {
    return {
      scope:    {
        size:      '@?',
        min:       '=?',
        max:       '=?',
        color:     '@?',
        onTrigger: '=?',
        ngModel:   '=?',
        data:      '=?',
        places:    '=?',
        label:     '@?'

      },
      link:     function(scope) {
        scope.size = scope.size || 100;
        scope.places = scope.places || 0;
        scope.color = scope.color || '#fff';
        scope.min = scope.min || 0;
        scope.max = scope.max || 100;
        scope.range = scope.max - scope.min;

        scope.ngModel = scope.ngModel || scope.min;
        scope.style = {
          width:           scope.size + 'px',
          height:          scope.size + 'px',
          borderRadius:    scope.size / 2 + 'px',
          backgroundColor: scope.color
        };

        scope.rotatorStyle = {
          borderWidth: scope.size / 40 + 'px'
        };
        scope.$watch('ngModel', function() {
          if (typeof scope.ngModel === 'number') {
            var deg = (scope.ngModel / scope.max * 270) - 135;
            scope.rotatorStyle.transform = 'rotate(' + deg + 'deg)';
          }
        });

        scope.dragging = false;
        scope.startValue = scope.ngModel;
        scope.dragStart = function(data) {
          scope.dragging = true;
          scope.startOffset = data.offsetY;
          scope.startValue = scope.ngModel;
        };
        scope.dragEnd = function(data) {
          scope.dragging = false;
        };
        scope.dragMove = function(data) {
          if (scope.dragging) {
            var delta = scope.startOffset - data.offsetY;
            var placeFactor = Math.pow(10, scope.places);
            var raw = scope.startValue + (delta * scope.range * 1.5 / scope.size);
            raw = Math.round(raw * placeFactor) / placeFactor;
            raw = raw < scope.min ? scope.min : raw;
            scope.ngModel = raw > scope.max ? scope.max : raw;
          }
        };
      },
      template: '<div class="tone-poti noselect"><div ng-style="style" ng-mousedown="dragStart($event)" ng-mouseup="dragEnd()" ng-mousemove="dragMove($event)" ng-mouseleave="dragEnd()" ng-class="{\'active\':ngModel}" class="poti-container"><div class="poti-rotator" ng-style="rotatorStyle"></div></div><div class="poti-value">{{ngModel}}</div><div class="poti-label">{{label}}</div></div>' //
    };
  });
}());