'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('raceConditions').
  component('formList', {
    templateUrl:'register/register.view.html',
    controller: function PhoneListController() {
      this.phones = [
        {
            "title": "Un form",
            "fields": [
                {
                "name": "botó",
                "binding": "entrada de text",
                "type": "text",
                "validationRules": [
                    "size > 4",
                    "AAAAA",
                    "size < 10",
                ]
                }
            ],
            "action":"UNA CONSULTA SQL",
        }
      ];
    }
  });
