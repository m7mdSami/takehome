/* eslint-disable no-unneeded-ternary */
angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees, $location) {
  const homePageVm = this;
  const { filter } = $location.search();
  homePageVm.employees = [];
  homePageVm.searchValue = filter;
  homePageVm.current_page = 1;
  homePageVm.isLoad = false;
  homePageVm.isLastPage = false;

  const getEmployees = (page) => {
    homePageVm.isLoad = true;
    Employees.getEmployees(page)
      .then(({ data }) => {
        homePageVm.current_page = data.current_page;
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.isLoad = false;
        homePageVm.isLastPage = data.current_page === data.pages ? true : false;
      });
  };

  activate();

  function activate() {
    getEmployees(homePageVm.current_page);
  }

  homePageVm.filter = (value) => {
    if (value && value !== '') {
      $location.search('filter', value);
      homePageVm.searchValue = value;
    } else {
      $location.search('filter', null);
      homePageVm.searchValue = '';
    }
  };

  homePageVm.loadMore = (page) => {
    getEmployees(page);
  };
}
