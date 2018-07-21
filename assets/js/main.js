$(document).ready(function() {
  $('.menu-icon').on('click', function() {
    $('nav ul').toggleClass('showing');
  });
});

$(window).on('scroll', function() {
  if ($(window).scrollTop()) {
    $('nav').addClass('black scroll');
    $('.logo a').addClass('scroll');
  } else {
    $('nav').removeClass('black scroll');
    $('.logo a').removeClass('scroll');
  }
});

$('.scrolling-link').click(function(e) {
  e.preventDefault();
  let aid = $(this).attr('href');
  $('html,body').animate({ scrollTop: $(aid).offset().top - 130 }, 'slow');
});
