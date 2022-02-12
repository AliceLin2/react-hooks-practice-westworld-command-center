import React, {useState} from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({
                host, 
                selectedHost, 
                onChangeShowDetail, 
                onChangeSelection, 
                onChangeIsActive, 
                onChangeCurrentArea
              }) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  const [selected, setSelected] = useState(false)
  let areaNames = []
  host.area.split("_").forEach(name=>{
    areaNames.push(name.charAt(0).toUpperCase()+name.slice(1)) 
  })

  function handleClick(){
    onChangeShowDetail(true)
    onChangeSelection(host)
    setSelected(!selected)
    onChangeIsActive(host.active)
    onChangeCurrentArea(areaNames.join(" "))
  }
  return (
    <Card
      className={host.id === selectedHost.id? "host selected" : "host"}
      onClick={/* On Click what? */ handleClick}
      image={/* I wonder what goes here...*/ host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
