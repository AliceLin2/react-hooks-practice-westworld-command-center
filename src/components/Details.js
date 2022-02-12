import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo"

function Details({
                  showDetail, 
                  selectedHost, 
                  onUpdateHosts, 
                  currentArea, 
                  isActive, 
                  onChangeIsActive, 
                  onChangeCurrentArea, 
                  numOfHostsInArea,
                  logClass,
                  onAddLogs
                }) {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  return (
    <Segment id="details" className="HQComps">
      {showDetail ?  <HostInfo 
                        selectedHost={selectedHost} 
                        onUpdateHosts={onUpdateHosts}
                        currentArea={currentArea}
                        isActive={isActive}
                        onChangeIsActive={onChangeIsActive} 
                        onChangeCurrentArea={onChangeCurrentArea} 
                        numOfHostsInArea={numOfHostsInArea}
                        logClass={logClass}
                        onAddLogs={onAddLogs} 
                     /> 
                     : 
                     <Image size="medium" src={Images.westworldLogo} />
                     }
    </Segment>
  );
}

export default Details;
