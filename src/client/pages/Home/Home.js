/* eslint-disable css-modules/no-unused-class */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCompleteData } from '../../actions/spacexAction';
import FilterComp from '../../components/FilterComp/FilterComp'
import SpaceXCard from '../../components/SpaceXCard/SpaceXCard';
import { addParamToUrl, getQueryStringAsObj } from '../../utils/helperUtils';
import './Home.scss';

class SpaceX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {},
      successLaunch: ['true', 'false'],
      successLanding: ['true', 'false'],
      // };
    }
  }
  componentDidMount() {
    const queryParams = getQueryStringAsObj();
    console.log(queryParams);
    if (this.props.spacexData.length !== 0) {
      this.setYearList(this.props.spacexData);
      Object.keys(queryParams).length !== 0 && this.props.fetchCompleteData(queryParams);
      this.setState({
        queryParams
      })
    } else {
      this.props.fetchCompleteData().then((data) => {
        this.setYearList(data)
      });
    }
  }

  setYearList = (data = {}) => {
    const yearSet = new Set();
    const yearList = []
    data.forEach((item) => {
      const { launch_year: launchYear } = item;
      yearSet.add(launchYear)
    });
    yearSet.forEach((key, value) => {
      yearList.push(value)
    })
    this.setState({
      yearList
    });
  }
  updateQueryParam = (param) => {
    // this.setState({
    //   queryParams: {...this.state.queryParams, ...param}
    // });
    // this.props.fetchCompleteData({...this.state.queryParams, ...param});
  }
  handleFilterClicked = (filterObj) => {
    console.log('year selected ', filterObj)
    this.setState({
      queryParams: { ...this.state.queryParams, ...filterObj }
    });
    // const url = new URL(window.location.href);
    const newUrl = addParamToUrl(window.location.href, { ...this.state.queryParams, ...filterObj });
    window.history.pushState({}, '', newUrl);
    this.props.fetchCompleteData({ ...this.state.queryParams, ...filterObj });
  }
  render() {
    const { yearList = [], launch_year, successLaunch = [], successLanding = [], queryParams } = this.state;
    const { spacexData = [] } = this.props;
    return (
      <div className="homeCon">
        <div className="heading">Space X Launch Programs</div>
       <div className={"home"}>
        <div className="card">
          Filters
         <span>Launch Year</span>
          <FilterComp list={yearList} clickHandler={this.handleFilterClicked} selectedParams={queryParams.launch_year} name={'launch_year'} />
          <span>Success Launch</span>
          <FilterComp list={successLaunch} clickHandler={this.handleFilterClicked} selectedParams={queryParams.launch_success} name={'launch_success'} />
          <span>Success Landing</span>
          <FilterComp list={successLanding} clickHandler={this.handleFilterClicked} selectedParams={queryParams.land_success} name={'land_success'} />
          <div>
          </div>
        </div>
        <div className="spacexCon">
        {spacexData.map((data, index) => {
          return <SpaceXCard data={data} key={`$satelite_${index}`} />
        })}
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    spacexData: state.spacex?.spacexData || []
  }
};

const mapDispatchToProps = {
  fetchCompleteData
};

export default
  connect(mapStateToProps, mapDispatchToProps)(SpaceX);
