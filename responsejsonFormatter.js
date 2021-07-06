const fs = require("fs");

const a = [
  {
      "language": "Hindi",
      "iconCharacter": "अ"
  }];

function handleArray(arr) {
  return {
    type: "array",
    description: "",
    items: handleAllData(arr[0]),
  };
}
function handleObj(obj) {
  let result = { type: "object", description: "" };
  let properties = {};
  for (let key in obj) {
    properties[key] = handleAllData(obj[key]);
  }
  return { ...result, properties };
}
function handleString(str) {
  return {
    type: "string",
    description: "",
  };
}
function handleNumber() {
  return {
    type: "number",
    description: "",
  };
}
function handleBoolean() {
  return {
    type: "boolean",
    description: "",
  };
}

function handleNull() {
  return { type: "integer", nullable: true };
}
function handleAllData(data) {
  if (typeof data === "string") {
    return handleString(data);
  } else if (typeof data === "number") {
    return handleNumber(data);
  } else if (Array.isArray(data)) {
    return handleArray(data);
  } else if (typeof data === "object") {
    return handleObj(data);
  } else if (typeof data === "boolean") {
    return handleBoolean(data);
  } else {
    return handleNull();
  }
}

fs.writeFileSync("./output.json", JSON.stringify(handleAllData(a)));
