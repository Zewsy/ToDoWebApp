export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
const url = "http://localhost:58313/api/Projects/";

function fetchProjectsSuccess(data){
  return{
    type: FETCH_PROJECTS_SUCCESS,
    data: data
  }
};

function deleteProjectSuccess(projectId){
  return{
    type: DELETE_PROJECT_SUCCESS,
    id: projectId
  }
}

function addProjectSuccess(project){
  return {
    type: ADD_PROJECT_SUCCESS,
    data: project
  }
}

export function fetchProjects() {
  return function(dispatch){
    fetch(url)
        .then(res => res.json())
        .then(res => {
            dispatch(fetchProjectsSuccess(res));
        })
  }
}

export function deleteProject(projectId){
  return function(dispatch){
        fetch(url + projectId,
            {method: 'DELETE'})
        .then(() => dispatch(deleteProjectSuccess(projectId))) 
  }
}

export function addProject(project, history){
  return function(dispatch){
      fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: project.name,
          description: project.desc
        })
      }).then(() => dispatch(addProjectSuccess(project)))
      .then(() => history.push('/'));
  }
}