import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";
import "../stylesheets/Headquarters.css";
import { Log } from "../services/Log";

function Headquarters({
                        hosts,
                        selectedHost, 
                        onUpdateHosts, 
                        showDetail, 
                        onChangeShowDetail, 
                        onChangeSelection, 
                        currentArea, 
                        isActive, 
                        onChangeIsActive, 
                        onChangeCurrentArea,
                        onRefresh,
                        numOfHostsInArea
                      }) {
  const [logs, setLogs] = useState([])
  function handleAddLogs(msg){
    logs.unshift(msg)
    setLogs(()=>logs)
  }

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>{/* Something goes here.... */
        <ColdStorage 
          hosts={hosts}
          selectedHost={selectedHost}  
          onChangeShowDetail={onChangeShowDetail} 
          onChangeSelection={onChangeSelection}
          onChangeIsActive={onChangeIsActive}
          onChangeCurrentArea={onChangeCurrentArea}
        />}
      </Grid.Column>
      <Grid.Column width={5}>
        <Details
          showDetail={showDetail} 
          selectedHost={selectedHost} 
          onUpdateHosts={onUpdateHosts}
          currentArea={currentArea}
          isActive={isActive}
          onChangeIsActive={onChangeIsActive}
          onChangeCurrentArea={onChangeCurrentArea}
          numOfHostsInArea={numOfHostsInArea}
          logClass={Log}
          onAddLogs={handleAddLogs} 
        />
      </Grid.Column>
      <Grid.Column width={3}>
        {/* and here. Take visual cues from the screenshot/video in the Readme. */
        <LogPanel hosts={hosts} onRefresh={onRefresh} logs={logs} logClass={Log} onAddLogs={handleAddLogs}/>}
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
