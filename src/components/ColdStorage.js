import React from "react";
import HostList from "./HostList"
import { Segment } from "semantic-ui-react";

function ColdStorage({
                      hosts, 
                      selectedHost, 
                      onChangeShowDetail, 
                      onChangeSelection, 
                      onChangeIsActive, 
                      onChangeCurrentArea
                    }) {
  const filteredHosts = hosts.filter(host=>host.active===false)
  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        {/* Cold Storage contains hosts....but how? Directly? Or is there something else we could use to contain them... */
        <HostList 
          hosts={filteredHosts}
          selectedHost={selectedHost} 
          onChangeShowDetail={onChangeShowDetail} 
          onChangeSelection={onChangeSelection}
          onChangeIsActive={onChangeIsActive}
          onChangeCurrentArea={onChangeCurrentArea}
        />}
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
