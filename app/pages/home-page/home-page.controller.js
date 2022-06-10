angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.employees = [];

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }

  homePageVm.filter = function (value) {
    const searchString = value.toLowerCase();
    homePageVm.employees = homePageVm.employees.filter(employee => {
      return (
        employee.profile.name.toLowerCase().includes(searchString) ||
        employee.profile.about.toLowerCase().includes(searchString)
      );
    });
  };
}
