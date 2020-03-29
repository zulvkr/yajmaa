// place for vue app
var navbar = new Vue({
  el: "#navbar"
});

var buttonTouch = new Vue({
  el: "#fr-button-1",
  data: {}
});

var buttonAside = new Vue({
  el: "#fr-button-2",
  data: {}
});

var carousel = new Vue({
  el: "#carousel",
  data: {
    carousels: [
      { text: 'Slide 1', color: 'primary' },
      { text: 'Slide 2', color: 'info' },
      { text: 'Slide 3', color: 'success' },
      { text: 'Slide 4', color: 'warning' },
      { text: 'Slide 5', color: 'danger' }
    ]
  }
});
