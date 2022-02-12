import React from "react";
import HostList from "./HostList"
import "../stylesheets/Area.css";

function Area({area, hosts, selectedHost, onChangeShowDetail, onChangeSelection, onChangeIsActive, onChangeCurrentArea}) {
  const filteredHosts = hosts.filter(host=> host.active===true && host.area===area.name)
  let areaNames = []
  area.name.split("_").forEach(name=>{
    areaNames.push(name.charAt(0).toUpperCase()+name.slice(1)) 
  })

  return (
    <div
      className="area"
      id={
        /* Pass in the area name here to make sure this is styled correctly */ 
        area.name
      }
    >
      <h3 className="labels">
        {/* Don't just pass in the name from the data...clean that thing up */
          areaNames.join(" ")
        }
      </h3>
      {/* See Checkpoint 1 item 2 in the Readme for a clue as to what goes here */}
      <HostList 
        hosts={filteredHosts}
        selectedHost={selectedHost} 
        onChangeShowDetail={onChangeShowDetail} 
        onChangeSelection={onChangeSelection}
        onChangeIsActive={onChangeIsActive}
        onChangeCurrentArea={onChangeCurrentArea}
      />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
