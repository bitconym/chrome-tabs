// Declare the chromeTabsApp module and its dependency 'ui.bootstrap'
var app = angular.module('chromeTabsApp', ['ui.bootstrap']);
// Declare the AppCtrl controller
app
  .controller('AppCtrl', ['$scope', function ($scope) {
    // Tab counter
    var counter = 1;
    // Array to store the tabs
    $scope.tabs = [];

    // Add tab to the end of the array
    var addTab = function () {
      $scope.tabs.push({ title: 'Tab ' + counter, content: 'Tab ' + counter });
      counter++;
      $scope.tabs[$scope.tabs.length - 1].active = true;
    };

    // Remove tab by index
    var removeTab = function (event, index) {
      event.preventDefault();
      event.stopPropagation();
      $scope.tabs.splice(index, 1);
    };

    // Initialize the scope functions
    $scope.addTab    = addTab;
    $scope.removeTab = removeTab;

    // For demonstration add 10 tabs
    for (var i = 0; i < 10; i++) {
      addTab();
    }
  }])
  .directive('tabHighlight', [function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        // Here is the major jQuery usage where we add the event
        // listeners mousemove and mouseout on the tabs to initalize
        // the moving highlight for the inactive tabs
        var x, y, initial_background = '#c3d5e6';

        element
          .removeAttr('style')
          .mousemove(function (e) {
            // Add highlight effect on inactive tabs
            if(!element.hasClass('active'))
            {
              x = e.pageX - this.offsetLeft;
              y = e.pageY - this.offsetTop;

              // Set the background when mouse moves over inactive tabs
              element
                .css({ background: '-moz-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background })
                .css({ background: '-webkit-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background })
                .css({ background: 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background });
            }
          })
          .mouseout(function () {
            // Return the inital background color of the tab
            element.removeAttr('style');
          });
      }
    };
  }]);
