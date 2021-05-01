/* eslint-disable css-modules/no-unused-class */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FilterComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selectedParams || ''
    };
  }
  handleFilterButton = (e) => {
    let filterValue = '';
    const elem = e.target.parentElement.classList[0];
    if(elem.includes('filterComp')) {
      filterValue = e.target.innerHTML
      this.props.clickHandler && this.props.clickHandler({[this.props.name || 'launch_year']: filterValue});
      this.setState({
        selected: filterValue
      })
    }
  }
  render() {
    const { list = [] , name = '', selectedParams = ''} = this.props;
    const { selected = '' } = this.state;
    return (
      <div className="filterComp" onClick={this.handleFilterButton} key={name}>
      {list.map((item, index) => {
        return (
          <button key={`${item}_${name}`} className={`${selectedParams === item ? 'selected' : '' }`}>{item}</button>
        );
      })}
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterComp);
