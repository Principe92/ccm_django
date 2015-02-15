angular
  .module('turnos', [
    'turnos.config',
    'turnos.group',
    'turnos.controllers',
    // ...
  ]);

angular
  .module('turnos.config', []);

angular
  .module('turnos.controllers', ['ng.django.urls',]);
