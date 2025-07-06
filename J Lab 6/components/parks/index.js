import { JSDOM } from "jsdom"; //import the JSDOM class from "jsdom" module

var xml;
let parkNS = "http://www.example.org/PFRMapData";

async function loadXml() {
  if (xml == undefined) {
    //If other servers (for your data source) has not disallowed requests from other domains (CORS) then you can fetch from that URL directly. If a local file, you can technically use fs to read from a file.
    let response = await fetch(
      "http://localhost:8888/facilities-data.xml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    const data = new JSDOM(await response.text(), { contentType: "application/xml" });
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadParks() {
  xml = await loadXml();
  return xml.querySelectorAll("Location");
}
async function getParkById(id) {
  xml = await loadXml();
  let xpath = `//Location[LocationID/text()='${id}']`;
  let result = xml.evaluate(
    xpath,
    xml,
    parkNS,
    4,
    null
  );
  return result.iterateNext();
}

export default {
  loadParks,
  getParkById
};