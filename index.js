const p2s = require("postman-to-swagger");
const yaml = require("js-yaml");
const fs = require("fs");
// const
// const postmanJson = require('./postman_collection.json')
// const swaggerJson = p2s(postmanJson, {
//   target_spec: "swagger2.0",
//   info: {
//     version: 'v1'
//   }
// })

//let output = JSON.stringify(swaggerJson, null, 2)
// let output = yaml.safeDump(swaggerJson)
// yaml.
// // Save to file
// fs.writeFileSync(
//   'swagger.yaml',
//   output,
//   'utf8'
// )

const curl_to_json = require("curl-to-json-object");
const path = require("path");
const curl_request = `curl --location --request PUT 'localhost:3002/api/v1/candidate/profile' \
--header 'auth-token;' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AkGQbfHGyEDlTH_ztMzFo5I11rnhG9cXe.hAo7%2BnD9Jx23yfzuBjAAGT1I1xAOVde1DlacRlbeaYM' \
--data-raw '{
    "candidateDetails": {
        "emergencyContact": 9716164470,
        "photoURL": "https://images.livemint.com/img/2019/10/25/600x338/pan_card_1565610340828_1572021543426.",
        "currentJobRole": "5f9a371892a5032e14375777",
        "currentLocation": {
            "type": "Point",
            "coordinates": [
                73.1411716,
                20.4324018
            ]
        },
        "reachability": {
            "sms": {
                "reachable": true
            },
            "whatsapp": {
                "reachable": true
            },
            "app": {
                "reachable": false
            }
        },
        "whatsAppConsent": false,
        "communicationLanguage": [
            "English"
        ],
        "name": "Narinder Singh",
        "mobileNo": 9467044858,
        "gender": "Male",
        "highestEducation": "11th to 12th",
        "age": 22,
        "district": "Karnal",
        "state": "Haryana",
        "identificationDocuments": [
            {
                "imageUrl": "https://images.livemint.com/img/2019/10/25/600x338/pan_card_1565610340828_1572021543426.PNG",
                "type": "PAN",
                "number": "1279JTTY6",
                "isValid": true
            }
        ],
        "currentSalary": 1000,
        "currentEmploymentStatus": "Working",
        "currentWorkingCompany": "Google",
        "address": {
            "address": "hNO567,gsdhsad",
            "pinCode": 121009,
            "district": "Faridabad",
            "state": "Haryana"
        },
        "totalExperience": 3,
        "expectedSalary": {
            "maximum": 2000,
            "minimum": 1000
        },
        "bankAccount": {
            "accountNumber": 12345678909823,
            "IFSC": "ASS787",
            "bankName": "BOI"
        }
    },
    "candidateProfile": {
        "willingToRelocate": true,
        "preferredGoals": [
            "60d313f5990ceb361feaf382"
        ],
        "preferredJobCategory": [
            "60d178c2335ce94877122650"
        ],
        "preferredJobRole": [
            "5f9a35ca3baec22d02bb40d6"
        ],
        "pastCompanies": [
            "Flipkart"
        ],
        "pastJobRoles": [
            "5f9a422d04e890368b6c21a1"
        ],
        "preferredLocation": [
            {
                "state": "Karnataka",
                "district": "Bangalore",
                "coordinates": {
                    "type": "Point",
                    "coordinates": [
                        73.1411716,
                        20.4324018
                    ]
                }
            }
        ],
        "certificate": [
            {
                "name": "marksheet",
                "imageUrl": "https://images.livemint.com/img/2019/10/25/600x338/pan_card_1565610340828_1572021543426.PNG",
                "skills": [
                    "5f9a371892a5032e14375777"
                ]
            }
        ]
    },
    "assests": {
        "Bike": {
            "location": {
                "state": "Karnataka",
                "district": "Bangalore",
                "coordinates": {
                    "type": "Point",
                    "coordinates": [
                        73.1411716,
                        20.4324018
                    ]
                }
            }
        },
        "SmartPhone": true,
        "Computer": true
    }
}'`;
const requestJson = curl_to_json(curl_request);
requestJson.url = curl_request
  .split("PUT")
  .pop()
  .split("--header")
  .shift()
  .replace(/'/g, "")
  .trim();
console.log(requestJson);

try {
  const doc = yaml.load(fs.readFileSync("./output.yaml", "utf8"));
  fs.writeFileSync("output1.yaml", yaml.dump(doc));
} catch (e) {
  console.log(e);
}

function apiRequest({ method, data, headers, url }) {
  return new Promise(function (resolve, reject) {
    const postData = querystring.stringify(data);
    const urlComponant = url.split(":");

    const port = parseInt(urlComponant.pop().split("/").shift()) || 80;
    let path = '';
    let hostname = ''
    if (url.split("/")[1]) {
      hostname = url.split("/").shift();
      path = url.substr(url.indexOf("/") + 1);
    } else {
      hostname = url.split("/")[2];
      path = b.substr(b.indexOf("/", 8));
    }

    const options = {
      hostname,
      port,
      path,
      method,
      headers,
    };
    let response = "";
    const req = http.request(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        response += chunk;
      });
      res.on("end", () => {
        resolve(response);
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    // Write data to request body
    req.write(postData);
    req.end();
  });
}
