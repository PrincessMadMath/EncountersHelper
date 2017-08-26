/* Utils */
import React, { Component } from "react";

import { connect } from "react-redux";

import { addMonster } from "../../redux/reducers";

/* Components */
import SearchBar from "../../components/Utils/SearchBar";
import MonstersList from "../../components/Monsters/MonstersList";

class MonsterDatabase extends Component {
  constructor(props) {
    super(props);

    console.log("Monster Constructor");

    this.state = {
      showed_monsters: props.all_monsters.slice(),
    };

    this.updateMonsters = this.updateMonsters.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    const { all_monsters } = nextProps;

    this.setState({
      showed_monsters: all_monsters,
    });
  };

  updateMonsters(updatedSpells) {
    this.setState({
      showed_monsters: updatedSpells,
    });
  }

  render() {
    const { all_monsters } = this.props;

    return (
      <div>
        <SearchBar searchables={all_monsters} callback={this.updateMonsters} />
        <MonstersList monstersToRender={this.state.showed_monsters} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    all_monsters: state.monsters,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMonster: monster => {
      dispatch(addMonster(monster));
    },
  };
};

const Database = connect(mapStateToProps, mapDispatchToProps)(MonsterDatabase);

export default Database;
