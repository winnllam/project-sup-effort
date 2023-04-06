import React, { useState, useEffect, useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Monaco from "./Monaco";
import * as lobbyService from "../../services/api/Lobbies.js";
import MonacoOther from "./MonacoOther";
import { SocketContext } from "../../context/socket.js";

function MonacoTabs({ number, language, lobby, user }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [tabPanels, setTabPanels] = useState([]);
  const [numUsers, setNumUsers] = useState(0);
  const socket = useContext(SocketContext);

  useEffect(() => {
    let userTab = [<Tab key={0}>{`${user}`}</Tab>];
    setTabs(userTab);
    let userTabPanel = [
      <TabPanel key={0}>
        <Monaco number={number} language={language} lobby={lobby} user={user} />
      </TabPanel>,
    ];
    setTabPanels(userTabPanel);
    lobbyService.getLobby(lobby).then((res) => {
      let arr = res.players;
      console.log(arr);
      const foundIdx = arr.findIndex((el) => el === user);
      arr.splice(foundIdx, 1);
      arr.unshift(user);
      setUsers(arr);
    });

    socket.on("user-connected", (message) => {
      if (!users.includes(message)) {
        setNumUsers(numUsers + 1);
      }
    });
  }, [numUsers]);

  useEffect(() => {
    if (users.length === 0) {
      return;
    }

    let curTabs = [];
    for (let i = 0; i < users.length; i++) {
      curTabs.push(<Tab key={i}>{`${users[i]}`}</Tab>);
    }
    setTabs(curTabs);
    let curTabPanels = [];
    curTabPanels.push(
      <TabPanel key={0}>
        <Monaco number={number} language={language} lobby={lobby} user={user} />
      </TabPanel>
    );
    for (let i = 1; i < users.length; i++) {
      curTabPanels.push(
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

    console.log(curTabs, curTabPanels);
    setTabPanels(curTabPanels);
  }, [users, language, lobby, number, user]);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={setTabIndex}>
      <TabList>{tabs}</TabList>
      {tabPanels}
    </Tabs>
  );
}

export default MonacoTabs;
