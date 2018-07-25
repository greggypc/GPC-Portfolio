$(document).ready(function() {
  const projectContainer = $('.project-container');
  const dataURL = './projects.json';
  var projects;

  $.ajax({
    url: dataURL,
    method: 'GET'
  })
    .then(data => {
      console.log(data);
      projects = data;
      if (!projects || !projects.length) {
        displayEmpty();
      } else {
        loadProjects();
      }
    })
    .catch(err => {
      throw new Error(err.message);
    });

  function loadProjects() {
    console.log('now in function loadProjects' + projects);

    projectContainer.empty();
    let projectsToAdd = [];
    projects.map(project => {
      projectsToAdd.push(createCard(project));
      console.log(project);
    });
  }

  function createCard(project) {
    let x = 9;
  }

  $('.menu-icon').on('click', function() {
    $('nav ul').toggleClass('showing');
  });

  $(window).on('scroll', function() {
    if ($(window).scrollTop()) {
      $('nav').addClass('black scroll');
      $('.logo a').addClass('scroll');
      $('.image').addClass('spin');
    } else {
      $('nav').removeClass('black scroll');
      $('.logo a').removeClass('scroll');
      $('.image').removeClass('spin');
    }
  });

  $('.scrolling-link').click(function(e) {
    e.preventDefault();
    let aid = $(this).attr('href');
    $('html,body').animate({ scrollTop: $(aid).offset().top - 120 }, 'slow');
  });
});
