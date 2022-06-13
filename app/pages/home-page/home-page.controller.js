angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees, $location) {
  const homePageVm = this;
  const { filter } = $location.search();
  homePageVm.employees = [];
  homePageVm.searchValue = filter;
  homePageVm.current_page = 1;

  const getEmployees = (page) => {
    Employees.getEmployees(page)
      .then(({ data }) => {
        console.log(data);
        homePageVm.current_page = data.current_page;
        homePageVm.employees = homePageVm.employees.concat(data.employees);
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
    console.log(999);
    getEmployees(page);
  };
}
