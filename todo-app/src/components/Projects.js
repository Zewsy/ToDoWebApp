import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";

class CProject extends Component {
    componentDidMount() {
      this.props.getData();
    }
    render() {
      return (
        <ul>
            {this.props.projects.map(el => (
                <li key={el.id}>{el.name}</li>))}
        </ul>
      );
    }
}

function mapStateToProps(state){
    return {
        projects: state.remoteProjects.slice(0, 2)
    };
}

const Project = connect(
    mapStateToProps, 
    { getData }
  )(CProject);

export default Project;