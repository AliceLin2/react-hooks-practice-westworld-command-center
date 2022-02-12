import React, {useEffect, useState} from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./WestworldMap"
import Headquarters from "./Headquarters"
import "../stylesheets/App.css";

function App() {
  const [areas, setAreas] = useState([])
  const [hosts, setHosts] = useState([])
  const [selectedHost, setSelectedHost] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [currentArea, setCurrentArea] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [numOfHostsInArea, setNumOfHostsInArea] = useState({
    "high_plains" : 0,
    "lowlands" : 0,
    "under_construction" : 0,
    "pariah" : 0,
    "python_pass" : 0,
    "badlands" : 0,
  })

  useEffect(()=>{
    fetch("http://localhost:3001/hosts")
    .then(r=>r.json())
    .then(data=>{
      setHosts(data)
      const numArray = {}
      data.forEach(host=>{numArray[host.area] = (numArray[host.area] ?? 0) +1})
      setNumOfHostsInArea(numArray)
    })
  },[])

  useEffect(()=>{
    fetch("http://localhost:3001/areas")
    .then(r=>r.json())
    .then(data=>setAreas(data))
  },[])

  function handleChangeSelection(selected){
    setSelectedHost(selected)
  }
  function handleShowDetail(){
    setShowDetail(true)
  }
  function handleUpdateHosts(id){
    fetch("http://localhost:3001/hosts")
    .then(r=>r.json())
    .then(data=>{
      setHosts(data)
      const numArray = {}
      data.forEach(host=>{numArray[host.area] = (numArray[host.area] ?? 0) +1})
      setNumOfHostsInArea(numArray)
      setSelectedHost((data.filter(host=>host.id===id)[0]))
    })
  }

  function handleRefresh(){
    fetch("http://localhost:3001/hosts")
    .then(r=>r.json())
    .then(data=>setHosts(data))
  }

  return (
    <Segment id="app">
      {/* What components should go here? Check out Checkpoint 1 of the Readme if you're confused */}
      <WestworldMap 
          areas={areas} 
          hosts={hosts} 
          selectedHost={selectedHost} 
          onChangeShowDetail={handleShowDetail} 
          onChangeSelection={handleChangeSelection}
          onChangeIsActive={setIsActive}
          onChangeCurrentArea={setCurrentArea}
      />
      <Headquarters 
          hosts={hosts} 
          selectedHost={selectedHost} 
          showDetail={showDetail}
          onChangeShowDetail={handleShowDetail} 
          onChangeSelection={handleChangeSelection}
          onUpdateHosts={handleUpdateHosts}
          currentArea={currentArea}
          isActive={isActive}
          onChangeIsActive={setIsActive}
          onChangeCurrentArea={setCurrentArea}
          onRefresh={handleRefresh}
          numOfHostsInArea={numOfHostsInArea}
      />
    </Segment>
  );
}

export default App;
