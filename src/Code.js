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
  let id = 222563; // Jacky Averill ride leader no name
  id = 198803; // ride count says 10, but only 9 in rsvp list
  console.log(getEventData(id))
}


