import React from "react";
import Host from "./Host"
import { Card } from "semantic-ui-react";

function HostList({
                    hosts, 
                    selectedHost, 
                    onChangeShowDetail, 
                    onChangeSelection, 
                    onChangeIsActive, 
                    onChangeCurrentArea
                  }) {
  return (
    <Card.Group itemsPerRow={6}>{/* What do you think, partner? */
      hosts.map(host=><Host 
                          key={host.id} 
                          host={host}
                          selectedHost={selectedHost} 
                          onChangeShowDetail={onChangeShowDetail} 
                          onChangeSelection={onChangeSelection}
                          onChangeIsActive={onChangeIsActive}
                          onChangeCurrentArea={onChangeCurrentArea}
                        />)
    }</Card.Group>
  );
}

export default HostList;
