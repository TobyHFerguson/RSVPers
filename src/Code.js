function doGet(e) {

  // use an externally hosted stylesheet
  const style = '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">';

  // Get the event object


  const t = HtmlService.createTemplateFromFile('Index');
  t.event = getEventData(e.parameter.event);
  return t.evaluate();

}

function getEventData(e) {
  const id = 222372
  let rwgps = new RWGPS(new RWGPSService("toby.h.ferguson@icloud.com", "1rider1"));
  const event = rwgps.get_event(Globals.EVENTS_URI + "/" + id);
  const participants = rwgps.getParticipants(id);
  return {
    'name': event.name,
    'participants': participants,
    'leaders': ['Jane Ferguson']
  }
}

function myFunction() {
  Logger.log(HtmlService
    .createTemplateFromFile('Index')
    .getCode());
}


