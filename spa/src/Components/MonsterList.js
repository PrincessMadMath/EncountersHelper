import React, { Component } from "react";
import PropTypes from "prop-types";
import LazyLoad, { forceCheck } from "react-lazyload";
import Monster from "./Monster";

import styled from "styled-components";

const AddButton = styled.div`
    position: absolute;
    right: 20px;
    top: 10px;
`;

export default class MonsterList extends Component {
    static propTypes = {
        visibleMonsters: PropTypes.array.isRequired,
        spellsDB: PropTypes.array.isRequired,
    };

    componentDidUpdate() {
        try {
            forceCheck();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { visibleMonsters, spellsDB, onAddMonster } = this.props;

        return (
            <div>
                {visibleMonsters.map(function(monster) {
                    return (
                        <LazyLoad key={monster.name} height={88}>
                            <Monster monster={monster} spells={spellsDB}>
                                <AddButton>
                                    <button onClick={() => onAddMonster(monster.name)}>+</button>
                                </AddButton>
                            </Monster>
                        </LazyLoad>
                    );
                })}
            </div>
        );
    }
}