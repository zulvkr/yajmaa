if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// Navbar toggle https://bulma.io/documentation/components/navbar/
document.addEventListener('DOMContentLoaded', function () {
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function (el) {
      el.addEventListener('click', function () {
        var target = el.dataset.target;
        var $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

// Day differences
var isAfter = function isBetween(date, min) {
  return date.getTime() >= min.getTime();
};
var diffDays = function diffDays(date, otherDate) {
  return Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
};
var timeIcon = `
<span class="icon">
  <i class="mdi mdi-clock"></i>
</span>
`;
var classDiff = document.getElementsByClassName('diffDays');

var theDate = function(date) {
  return new Date(date)
}
for (i = 0; i < classDiff.length; i++) {
  if (isAfter(theDate(classDiff[i].innerHTML), new Date())) {
    classDiff[i].innerHTML = timeIcon + diffDays(theDate(classDiff[i].innerHTML), new Date()) + ' hari tersisa';
  } else {
    classDiff[i].innerHTML = timeIcon + 'Donasi telah ditutup';
  }
}
