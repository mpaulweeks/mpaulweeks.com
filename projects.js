
function projectHTML(project){
  return `
    <div class="project-container">
      <a href="${project.url}">
        <img class="project-preview" src="${project.image || 'preview/placeholder.png'}" />
      </a>
      <a href="${project.url}">
        <div class="project-name">
          ${project.name}
        </div>
      </a>
      <div class="project-description">
        ${project.description.replace('\n', '<br/>')}
      </div>
      <div class="project-date">
        ${project.date_pretty}
      </div>
    </div>
  `;
}

function projectCategoryHTML(category){
  const html = category.projects.reduce((a, c) => a + projectHTML(c), '');
  return `
    <div>
      <div class="project-category-title">
        ${category.label}
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

function binByCategories(projects){
  const cMap = {};
  projects.forEach(p => {
    const category = p.wip ? "wip" : p.category;
    cMap[category] = (cMap[category] || []).concat(p);
  });
  const categories = Object.keys(cMap).map(cKey => {
    return {
      label: cKey,
      projects: cMap[cKey],
    }
  });
  return categories;
}

function binByScale(projects){
  const cMap = {};
  projects.forEach(p => {
    const scale = p.wip ? "wip" : p.scale;
    cMap[scale] = (cMap[scale] || []).concat(p);
  });
  const scales = [
    {
      key: "large",
      name: "Projects",
    },
    {
      key: "wip",
      name: "Work in Progress",
    },
    {
      key: "small",
      name: "Small Projects",
    },
  ];
  const categories = scales.map(scale => {
    return {
      label: scale.name,
      projects: cMap[scale.key] || [],
    }
  });
  return categories;
}

function siftSortProjects(projectData){
  const sifted = projectData.reduce((lst, curr) => curr.hidden ? lst : lst.concat(curr), []);
  const sorted = sifted.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }).reverse();
  return sorted;
}

function displayProjects(projectData){
  const projects = siftSortProjects(projectData);

  // const categories = binByCategories(projects);
  const categories = binByScale(projects);

  const elm = document.getElementById('projects');
  elm.innerHTML = '';
  categories.forEach(category => {
    elm.innerHTML += projectCategoryHTML(category);
  });
}
fetch(`projects.json?v=${getTimestamp()}`).then(r => r.json()).then(displayProjects);
