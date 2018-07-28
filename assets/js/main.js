$(document).ready(function() {
  const projectContainer = $('.project-container');
  const dataURL = './projects.json';
  var projects;

  if (window.XMLHttpRequest) {
    $.ajax({
      url: dataURL,
      method: 'GET',
      cache: false,
      timeout: 15000,
      async: true,
      headers: {
        'cache-control': 'no-cache'
      }
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
  }

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
    let newProject = `
    <div class="movie-card">
      <div class="color-overlay">
        <div class="movie-content">
          <div class="movie-header">
            <h1 class="movie-title">${project.name}</h1>
            <h4 class="movie-info">Tech: ${project.tech}</h4>
          </div>
          <p class="movie-desc">${project.description}</p>
          <a class="btn btn-outline" href="${
            project.repoUrl
          }" target="_blank"><i style="font-size:24px" class="fa">&#xf09b;</i>Repo</a>
          
          <a id="deployed" class="btn btn-outline" href="${
            project.url
          }" target="_blank"><i style="font-size:24px" class="fa">&#xf0e7;</i>Deployed</a>

        </div>
      </div>
    </div>
    `;

    return newProject;
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

  // only display hamburger nav on smaller screens
  $('.menu-icon').on('click', function() {
    $('nav ul').toggleClass('showing');
  });

  // toggle close menu on tap
  $('.menu ul li a').on('click', function() {
    $('.menu ul').toggleClass('showing');
  });

  $(window).on('scroll', function() {
    // user leave Top and Nav style changes
    if ($(window).scrollTop()) {
      $('nav').addClass('black scroll');
      $('.logo a').addClass('scroll');
      $('.image').addClass('spin');

      // user scrolls far enought to initailize 'scroll to top' button
      if ($(window).scrollTop() > 100) {
        $('#scroll-home').fadeIn();
      } else {
        $('#scroll-home').fadeOut();
      }

      // user returns to Top and Nav style reverts to original
    } else {
      $('nav').removeClass('black scroll');
      $('.logo a').removeClass('scroll');
      $('.image').removeClass('spin');
    }
  });

  $('#scroll-home').click(function(e) {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });

  $('.scrolling-link').click(function(e) {
    e.preventDefault();
    let aid = $(this).attr('href');
    $('html,body').animate({ scrollTop: $(aid).offset().top - 120 }, 'slow');
  });
});
