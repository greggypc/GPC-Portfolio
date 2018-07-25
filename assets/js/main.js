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
        console.log(`no json!`);

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
    projectContainer.append(projectsToAdd);
  }

  function createCard(project) {
    var newPostPanel = $('<div>');
    newPostPanel.addClass('panel panel-default');
    var newPostPanelHeading = $('<div>');
    newPostPanelHeading.addClass('panel-heading');

    var newPostTitle = $('<h2>');

    var newPostPanelBody = $('<div>');
    newPostPanelBody.addClass('panel-body');
    var newPostBody = $('<p>');
    newPostTitle.text(project.name + ' ');
    newPostBody.text(project.description);
    newPostBody.append(project.tech);

    var formattedDate = new Date(project.url);
    newPostPanelHeading.append(newPostTitle);
    newPostPanelBody.append(newPostBody);
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data('project', project);
    return newPostPanel;
  }

  function displayEmpty() {
    console.log(`we're in displayEmpty - no json!`);
    projectContainer.empty();
    const emptyMessage = $('<h2>');
    emptyMessage.html(
      'None of my awesome projects loaded? Bummer! You can try again later or head over to my <a href="https://github.com/greggypc" target="_blank">GitHub</a> to check them out.'
    );
    projectContainer.append(emptyMessage);
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
