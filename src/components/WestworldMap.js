import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area"

function WestworldMap({
                        areas, 
                        hosts, 
                        selectedHost, 
                        onChangeShowDetail, 
                        onChangeSelection, 
                        onChangeIsActive, 
                        onChangeCurrentArea
                      }) {
  return <Segment id="map">
          {/* What should we render on the map? */}
            {areas.map(area=><Area 
                                key={area.id} 
                                area={area} 
                                hosts={hosts}
                                selectedHost={selectedHost} 
                                onChangeShowDetail={onChangeShowDetail} 
                                onChangeSelection={onChangeSelection}
                                onChangeIsActive={onChangeIsActive}
                                onChangeCurrentArea={onChangeCurrentArea}
                                />)}
         </Segment>;
}

export default WestworldMap;
