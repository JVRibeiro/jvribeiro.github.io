/* jshint esversion: 6 */

let orca = {
  init: () => {

    // Initialize Materialize components.
    $('.tabs').tabs();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  orca.init();
});
