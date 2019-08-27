import React from "react";
import Form from "react-jsonschema-form";


const log = (type) => console.log.bind(console, type);

const armTemplateJSON = {
    "$schema": "https://schema.management.some.com/",
    "contentVersion": "0.0.0.0",
    "parameters": {
      "name": {
        "value": "somevalue"
      },
      "adminUsername": {
        "value": "someadmin"
      },
      "adminPassword": {
        "value": "password"
      },
      "somelabel": {
        "value": "somelabelvalue"
      }
    }
  };


const convertToSchema = armTemplateJSON=>{
    const schema = {
        title: "file name",
        type:"object",
        required:[],
        properties:{}
    };

    Object.keys(armTemplateJSON["parameters"])
    .map(key=>[key ,armTemplateJSON["parameters"][key].value])
    .forEach(arr => {
        schema.required.push(arr[0]) ;
        schema.properties[arr[0]] ={
            "type": "string",
            "title": arr[0],
            "default": arr[1],
            "value" :arr[1]
        };
    });
    console.log("Schema : ", schema)
    return schema;

}

const App = () =>{
    
    const schema = convertToSchema(armTemplateJSON);

    return (  <Form schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />);
};

export default App