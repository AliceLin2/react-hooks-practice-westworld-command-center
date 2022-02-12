import React, {useState} from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({hosts, onRefresh, logs, logClass, onAddLogs}) {
  const [activated, setActivated] = useState(false)
  
  function handleClick(){
    if(activated===false){
      hosts.map(host=>updateAllHost(host, activated))
      setActivated(true)
      onAddLogs(logClass.warn("Activating all hosts!"))
    }else{
      hosts.map(host=>updateAllHost(host, activated))
      setActivated(false)
      onAddLogs(logClass.notify("Decommissiong all hosts."))
    }
  }

  function updateAllHost(host, activated){
    fetch(`http://localhost:3001/hosts/${host.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ...host,
        active: !activated
      })
    })
    .then(r=>r.json())
    .then(onRefresh())
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      {/* This isn't always going to be the same color...*/}
      {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      <Button fluid color={activated? "green" : "red"} content={activated? "DECOMMISSION ALL" : "ACTIVATE ALL"} onClick={handleClick} />
    </Segment>
  );
}

export default LogPanel;
