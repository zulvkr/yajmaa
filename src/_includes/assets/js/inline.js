document.addEventListener('DOMContentLoaded', function () {

  // Navbar toggle https://bulma.io/documentation/components/navbar/
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

  // Day differences
  var isAfter = function isBetween(date, min) {
    return date.getTime() >= min.getTime();
  };
  var diffDays = function diffDays(date, otherDate) {
    return Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
  };
  var timeIcon = `<span class="icon"><i class="mdi mdi-clock"></i></span>`;

  var datify = function (date) {
    return new Date(date)
  }
  var $diffDays = Array.prototype.slice.call(document.querySelectorAll('.diffDays'), 0);

  if ($diffDays.length > 0) {
    for (i = 0; i < $diffDays.length; i++) {
      if (isAfter(datify($diffDays[i].innerHTML), new Date())) {
        $diffDays[i].innerHTML = timeIcon + diffDays(datify($diffDays[i].innerHTML), new Date()) + ' hari lagi';
      } else {
        $diffDays[i].innerHTML = timeIcon + 'Donasi telah ditutup';
      }
    }
  }

  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
});

