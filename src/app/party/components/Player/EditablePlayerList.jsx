/* Utils */
import React, { Component } from "react";
import PropTypes from "prop-types";

import { playerType } from "../../type";
import EditablePlayer from "./EditablePlayer";

class EditablePlayerList extends Component {
  static propType = {
    players: playerType.isRequired,
    onPlayerUpdate: PropTypes.func.isRequired,
  };

  render() {
    const players = this.props.players.map(player =>
      <EditablePlayer
        key={player.id}
        player={player}
        onPlayerUpdate={this.props.onPlayerUpdate}
      />
    );

    return (
      <div>
        {players}
      </div>
    );
  }
}

export default EditablePlayerList;