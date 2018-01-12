
function projectHTML(project){
  return `
    <div class="project-container"><a href="${project.url}">
      <img class="project-preview" src="${project.image}" />
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

function projectCategoryHTML(category){
  const html = category.projects.reduce((a, c) => a + projectHTML(c), '');
  return `
    <div>
      <div class="project-category-title">
        ${category.name}
      </div>
      <div class="project-category">
        ${html}
      </div>
    </div>
  `;
}

function getTimestamp(){
  return Math.floor((new Date()).getTime() / (60 * 1000));
}

function displayProjects(projectData){
  const elm = document.getElementById('projects');
  elm.innerHTML += projectCategoryHTML(projectData.primary);
  elm.innerHTML += projectCategoryHTML(projectData.small);
}
fetch(`projects.json?v=${getTimestamp()}`).then(r => r.json()).then(displayProjects);
