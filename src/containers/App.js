import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import {connect} from 'react-redux';
import {setSearchField,requestRobots} from '../actions';

const mapStateToProps = (state) => {
  return {
    searchField:state.searchRobots.searchField,
    robots:state.requestRobots.robots,
    isPending:state.requestRobots.isPending,
    error:state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange:(event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots()
  }

  render() {
    const {searchField,onSearchChange,robots,isPending} = this.props;
    
    const filteredRobots = robots.filter(robot => {
      return robot.name.includes(searchField);
    })

    return isPending?
    <h1>Loading</h1>:
    (
      <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox searchchange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    )
   
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(App);
