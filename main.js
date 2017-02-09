document.addEventListener("DOMContentLoaded", function(){


  var mobile = window.matchMedia("screen and (max-width: 420px)");
  //
  //
  //
  // window.addEventListener("resize", function() {
  //
  //   console.log(mobile);
  //
  //   if (mobile.matches) {
  //   document.querySelector('body').style.backgroundColor = 'red';
  //   } else {
  //   // tutaj ekran jest większy niż 320px
  //   document.querySelector('body').style.backgroundColor = 'green';
  //   }
  // });


  window.addEventListener("resize", function() {
    if(window.innerWidth < 420 && mobile.matches) {
      console.log("pasuje");
      document.getElementsByTagName('body')[0].style.backgroundColor = 'yellow';
    } else {
      document.getElementsByTagName('body')[0].style.backgroundColor = 'purple';
    }
  });

  //Zadanie 2

  var isMobile = false;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
  }

//sprawdzamy czy jest to smartfon
  if(!isMobile) {

    var menu = document.querySelector('.mobile-section').querySelector('ul');

    var button = document.querySelector('button');


  if (mobile.matches) {

  menu.style.display = "none";

  button.addEventListener("click", function() {
    if (menu.style.display === 'none') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
  });

  } else {
  // tutaj ekran jest większy niż 420px
  menu.style.display = "block";
  button.style.display = "none";
  }

  window.addEventListener("resize", function() {
    if(mobile.matches) {
      menu.style.display = "none";
      button.style.display = "block";
    } else {
      menu.style.display = "block";
      button.style.display = "none";
    }
  });


}



});
