function doGet(e) {

  // use an externally hosted stylesheet
  const style = '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">';

  // Get the event object


  const t = HtmlService.createTemplateFromFile('Index');
  t.event = getEventData(e.parameter.event);
  return t.evaluate();

}

function getEventData(id) {
  let rwgps = new RWGPS(new RWGPSService(Credentials.username, Credentials.password));
  return rwgps.getRSVPObject(id)
}

function myFunction() {
  Logger.log(HtmlService
    .createTemplateFromFile('Index')
    .getCode());
}

function testEventId() {
  const id = 222563;
  console.log(getEventData(id))
}


