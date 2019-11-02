export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';

function fetchProjectsSuccess(data){
  return{
    type: FETCH_PROJECTS_SUCCESS,
    data: data
  }
};

export function fetchProjects() {
  return function(dispatch){
    fetch('http://localhost:3001/projects')
        .then(res => res.json())
        .then(res => {
            dispatch(fetchProjectsSuccess(res));
        })
  }
}