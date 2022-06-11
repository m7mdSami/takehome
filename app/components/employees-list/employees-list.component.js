angular
  .module('appModule')
  .component('employeesList', {
    templateUrl: 'components/employees-list/employees-list.html',
    controller: EmployeesListComponent,
    controllerAs: 'EmployeesListComponentVm',
    bindings: {
      employeesList: '<',
      searchValue: '<',
    },
  });

function EmployeesListComponent($scope, $sce) {
  $scope.highlight = function (text, searchValue) {
    if (!searchValue) {
      return $sce.trustAsHtml(text);
    }
    return $sce.trustAsHtml(text.replace(new RegExp(searchValue, 'gi'), '<span class="c-users-list__highlightedText">$&</span>'));
  };
}
