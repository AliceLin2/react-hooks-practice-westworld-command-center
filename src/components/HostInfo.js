import React from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({
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
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.

  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  const options = [
    { key: "1", text: "High Plains", value: "High Plains" },
    { key: "2", text: "Lowlands", value: "Lowlands" },
    { key: "3", text: "Under Construction", value: "Under Construction" },
    { key: "4", text: "Pariah", value: "Pariah" },
    { key: "5", text: "Python Pass", value: "Python Pass" },
    { key: "6", text: "Badlands", value: "Badlands" }
  ];
  const limits = {
    "high_plains": 8,
    "lowlands": 6,
    "under_construction": 8,
    "pariah": 14,
    "python_pass": 14,
    "badlands": 10
  }
  function handleOptionChange(e, { value }) {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    const formattedVal = value.toLowerCase().split(" ").join("_")

    if(numOfHostsInArea[formattedVal]===undefined || numOfHostsInArea[formattedVal]<limits[formattedVal]){
      fetch(`http://localhost:3001/hosts/${selectedHost.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...selectedHost,
          area : formattedVal
        })
      })
      .then(r=>r.json())
      .then(data=>{
        onChangeCurrentArea(value)
        onUpdateHosts(selectedHost.id)
        onAddLogs(logClass.notify(`${selectedHost.firstName} set in area ${value}`))
      })
    }else{
      onAddLogs(logClass.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${value}`))
    }
  }

  function handleRadioChange() {
    fetch(`http://localhost:3001/hosts/${selectedHost.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...selectedHost,
        active : !isActive
      })
    })
    .then(r=>r.json())
    .then(data=>{
      onUpdateHosts(selectedHost.id)
      onChangeIsActive(!isActive)
      if(isActive===false){
        onAddLogs(logClass.warn(`Activated ${selectedHost.firstName}`))
      }else{
        onAddLogs(logClass.notify(`Decommissioned ${selectedHost.firstName}`))
      }
    })
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={/* pass in the right image here */ selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selectedHost.firstName} | {selectedHost.gender === "Male" ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={isActive ? "Active" : "Decommissioned"}
                checked={isActive}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              selection
              value={currentArea}
              options={options}
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
