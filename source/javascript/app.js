// Declare the chromeTabsApp module and its dependency 'ui.bootstrap'
var app = angular.module('chromeTabsApp', ['ui.bootstrap']);
// Declare the AppCtrl controller
app.controller('AppCtrl', ['$scope', function ($scope) {
  // Tab counter
  var counter = 1;
  // Array to store the tabs
  $scope.tabs = [];

  // This function will initalize the moving highlight for the inactive tabs
  // Here is the major jQuery usage via angular.element() where we add the even listeners mousemove and mouseout on the tabs
  var setHighlight = function () {
    var x, y,
        bgMoz, bgWebKit, bgAll,
        originalBG = '#c3d5e6';

    // First remove all previous listeners of the tabs
    angular.element('.nav-tabs li').unbind();

    angular.element('.nav-tabs li')
      .removeAttr('style')
      .mousemove(function (e) {

        // Add highlight effect on inactive tabs
        if(!$(this).hasClass('active'))
        {
          x = e.pageX - this.offsetLeft;
          y = e.pageY - this.offsetTop;

          bgMoz    = '-moz-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + originalBG;
          bgWebKit = '-webkit-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + originalBG;
          bgAll    = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + originalBG;

          $(this)
            .css({ background: bgMoz })
            .css({ background: bgWebKit })
            .css({ background: bgAll });
        }
      })
      .mouseout(function () {
        // Return the default background color of the tab
        $(this).removeAttr('style');
      });
  };

  // Remove tab by index
  var removeTab = function (event, index) {
    event.preventDefault();
    event.stopPropagation();
    $scope.tabs.splice(index, 1);
  };

  // Add tab to the end of the array
  var addTab = function () {
    $scope.tabs.push({ title: 'Tab ' + counter, content: 'Tab ' + counter });
    counter++;
    $scope.tabs[$scope.tabs.length - 1].active = true;
  };

  // On tab change always re-initialize the moving highlight for the tabs
  var tabChange = function () {
    setHighlight();
  };

  // Initialize the scope functions
  $scope.addTab    = addTab;
  $scope.removeTab = removeTab;
  $scope.tabChange = tabChange;

  // For demonstration add 10 tabs
  for (var i = 0; i < 10; i++) {
    addTab();
  }
}]);
