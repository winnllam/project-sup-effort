import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Monaco from "./Monaco";
import * as lobbyService from "../../services/api/Lobbies.js";
import MonacoOther from "./MonacoOther";

function MonacoTabs({ number, language, lobby, user }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState([]);

  const handleTabSelect = (index) => {
    setTabIndex(index);
  };

  let tabPanels = [];
  let tabs = [];

  function updateUsers() {
    lobbyService.getLobby(lobby).then((res) => {
      let arr = res.players;
      const foundIdx = arr.findIndex((el) => el === user);
      arr.splice(foundIdx, 1);
      arr.unshift(user);
      setUsers(arr);
    });

    for (let i = 0; i < users.length; i++) {
      tabs.push(<Tab key={i}>{`${users[i]}`}</Tab>);
    }

    tabPanels.push(
      <TabPanel key={0}>
        <Monaco number={number} language={language} lobby={lobby} user={user} />
      </TabPanel>
    );

    for (let i = 1; i < users.length; i++) {
      tabPanels.push(
        <TabPanel key={i}>
          <MonacoOther
            number={number}
            language={language}
            lobby={lobby}
            user={users[i]}
          />
        </TabPanel>
      );
    }
  }

  updateUsers();

  return (
    <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
      <TabList>{tabs}</TabList>

      {tabPanels}
    </Tabs>
  );
}

export default MonacoTabs;
