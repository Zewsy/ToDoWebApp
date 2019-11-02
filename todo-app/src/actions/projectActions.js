export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
const url = "http://localhost:3001/projects/";

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

export function fetchProjects() {
  return function(dispatch){
    fetch(url)
        .then(res => res.json())
        .then(res => {
            dispatch(fetchProjectsSuccess(res))
        })
  }
}

export function deleteProject(projectId){
  return function(dispatch){
    fetch(url + projectId,
        {method: 'DELETE'})
      .then(dispatch(deleteProjectSuccess(projectId)))
  }
}