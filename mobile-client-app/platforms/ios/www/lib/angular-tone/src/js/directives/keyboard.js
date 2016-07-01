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