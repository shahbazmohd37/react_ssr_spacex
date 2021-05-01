/* eslint-disable css-modules/no-unused-class */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class SpaceXCard extends Component {
  render() {
    const { mission_name = '', launch_year = '', launch_success = '', mission_id = [], land_success = '', links = {} } = this.props.data;
    const { mission_patch = ''} = links;
    return (
           <div className={"card"}>
             <img src={mission_patch} />
             <div>
               {mission_name}
             </div>
             <ul>
               {mission_id.map((missionId) => {
                 return 
                 <li>{missionId}</li>
               })}
             </ul>
             <div className="details">
               Launch Year: {launch_year}
               <span>
                 Successfull Launch: {launch_success}
               </span>
               <span>
                 Successfull Landing: {land_success}
               </span>
             </div>
           </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaceXCard);
