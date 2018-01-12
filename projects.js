
function projectHTML(project){
  return `
    <div class="project-container"><a href="${project.url}">
      <img class="project-preview" src="${project.url}/preview.png" />
      <div class="project-name">
        ${project.name}
      </div>
      <div class="project-description">
        ${project.description}
      </div>
      <div class="project-date">
        ${project.date}
      </div>
    </a></div>
  `;
}

function displayProjects(projects){
  const elm = document.getElementById('projects');
  projects.forEach(p => {
    elm.innerHTML += projectHTML(p);
  });
}
fetch('projects.json').then(r => r.json()).then(displayProjects);
