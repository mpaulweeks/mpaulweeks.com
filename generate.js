
// templates

const projectHTML = (project) => `
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

const monthlyProjectHTML = (project) => `
  <div class="project-container">
    <div class="project-category-title">
      ${project.date_pretty.split(' ')[0]}
    </div>
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
  </div>
`;

const projectCategoryHTML = (category) => `
  <div class="project-category-container">
    <div class="project-category-title">
      ${category.label}
    </div>
    <div class="project-category-content ${category.class}">
      ${category.projects.map(projectHTML).join('')}
    </div>
  </div>
`;

const monthlyChallengeHTML = (projects) => `
  <div class="project-category-container">
    <div class="project-category-content">
      ${projects.map(monthlyProjectHTML).join('')}
    </div>
  </div>
`;

// sorting logic

function getTimestamp(){
  return Math.floor((new Date()).getTime() / (60 * 1000));
}

const priorityBins = ["wip", "defunct"];

function binByCategories(projects){
  const cMap = {};
  projects.forEach(p => {
    if (!priorityBins.includes(p.status)){
      const category = p.category;
      cMap[category] = (cMap[category] || []).concat(p);
    }
  });
  const categoryNames = Object.keys(cMap).sort();
  const categories = categoryNames.map(cKey => {
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
    const scale = priorityBins.includes(p.status) ? p.status : p.scale;
    cMap[scale] = (cMap[scale] || []).concat(p);
  });
  const scales = [
    {
      key: "large",
      name: "Featured Projects",
      class: "two", // todo temporary fix for awkward number of featured projects
    },
    {
      key: "small",
      name: "Projects",
    },
    {
      key: "wip",
      name: "Work in Progress",
    },
    {
      key: "defunct",
      name: "No Longer Maintained",
    },
  ];
  const categories = scales.map(scale => {
    return {
      class: scale.class || '',
      label: scale.name,
      projects: cMap[scale.key] || [],
    }
  });
  return categories;
}

function siftSortProjects(projectData, filterFunc){
  const isDebug = window.location.search.includes('debug');
  let sifted = projectData.filter(proj => isDebug || !proj.hidden);
  if (filterFunc){
    sifted = sifted.filter(proj => filterFunc(proj));
  }
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

function displayProjects(projectData, filterFunc){
  const footer = document.getElementById('footer');
  const projects = siftSortProjects(projectData, filterFunc);

  const elm = document.getElementById('projects');
  elm.innerHTML = '';
  if (window.location.pathname.includes('2019')){
    elm.innerHTML += monthlyChallengeHTML(projects.reverse());
  } else {
    let categories = binByScale(projects);
    if (window.location.search.includes('category')){
      categories = binByCategories(projects);
      footer.innerHTML = `<a href="?">Back to Default View</a>`;
    }
    categories.forEach(category => {
      if (category.projects.length > 0){
        elm.innerHTML += projectCategoryHTML(category);
      }
    });
  }
}

// init

function fetchProjects(localPath, filterFunc){
  return fetch(`${localPath}?v=${getTimestamp()}`)
    .then(r => r.json())
    .then(data => displayProjects(data, filterFunc));
}

