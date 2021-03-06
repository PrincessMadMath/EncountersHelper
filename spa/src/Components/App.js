import React, { useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import Modal from "react-modal";

import monsters from "../data/monsters.json";
import spells from "../data/spells.json";

import { Header } from "./Header";
import { Welcome } from "./Welcome";
import { MonsterDatabase } from "./MonsterDatabase";
import { SpellDatabase } from "./SpellDatabase";
import { MonsterSingle } from "./MonsterSingle";
import { NotFound } from "./NotFound";
import { createGlobalStyle } from "styled-components";
import { EncounterManager } from "./Encounter/EncounterManager";
import { DatabaseUploader } from "./DatabaseUploader";

// TODO: Refactor to tachyon
const GlobalStyle = createGlobalStyle`
    body {
    margin: 0 auto;
    padding: 0;
    font-family: "Helvetica", "Arial", "sans-serif";
    font-size: 14px;
    line-height: 1.5;
    }
`;

export const DBContext = createContext({
    monstersDB: monsters,
    spellsDB: spells,
});

// See http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement("#root");

const App = () => {
    const [monstersDB, setMonstersDB] = useState(monsters);

    const handleUploadMonster = newMonsters => {
        const updatedMonsters = [...monstersDB, ...newMonsters];
        setMonstersDB(updatedMonsters);
    };

    return (
        <DBContext.Provider value={{ monstersDB, spellsDB: spells }}>
            <div className="App">
                <GlobalStyle />
                <Route path="/" component={Header} />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route
                        exact
                        path="/monsters"
                        render={props => <MonsterDatabase monstersDB={monstersDB} {...props} />}
                    />
                    <Route
                        path="/monsters/:monsterId"
                        render={props => <MonsterSingle monstersDB={monstersDB} {...props} />}
                    />
                    <Route
                        path="/encounter"
                        render={props => <EncounterManager monstersDB={monstersDB} {...props} />}
                    />
                    <Route
                        exact
                        path="/spells"
                        render={props => <SpellDatabase {...props} spellsDB={spells} />}
                    />
                    <Route
                        exact
                        path="/uploader"
                        render={() => <DatabaseUploader onUploadMonsters={handleUploadMonster} />}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </DBContext.Provider>
    );
};

export default App;
