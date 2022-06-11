angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees, $location) {
  const homePageVm = this;
  const { filter } = $location.search();
  homePageVm.employees = [];
  homePageVm.searchValue = filter;

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }

  homePageVm.filter = function (value) {
    if (value && value !== '') {
      $location.search('filter', value);
      homePageVm.searchValue = value;
    } else {
      $location.search('filter', null);
      homePageVm.searchValue = '';
    }
  };
}
