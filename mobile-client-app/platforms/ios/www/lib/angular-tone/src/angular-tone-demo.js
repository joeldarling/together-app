/**
 * Created by felix on 07.04.16.
 */
(function() {
  'use strict';
  angular.module('ec.angular.tone.demo', ['ec.angular.tone']).controller('SynthCtrl', function($scope, $log) {
    $log.info('welcome to the angular-tone demo!');
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
      if (active) {
        $scope.fatSynth.triggerAttackRelease("C#4", "8n");
      }
    };
  });
}());
