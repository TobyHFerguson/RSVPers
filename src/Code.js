function doGet(e) {

  // use an externally hosted stylesheet
  const style = '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">';

  // Get the event object


  const t = HtmlService.createTemplateFromFile('Index');
  t.event = getEventData(e.parameter.event);
  return t.evaluate();

}

/**
 * @typedef {Object} 
 */
/**
 * @typedef {Object} RSVPObject
 * @param {String} name name of the event
 * @param {Participant[]} participants an array of the participants that have rsvp'd to the event
 */
/**
 * 
 * @param {number} id the event id
 * @returns an RSVPObject
 */
function getEventData(id) {
  const s =  RWGPSlib.newRWGPSService(Credentials.username, Credentials.password, Globals);
  let rwgps = new RWGPSlib.newRWGPS(s);
  let rsvpObject = rwgps.getRSVPObject(id)
  let newName = RWGPSlib.getEvent().updateCountInName(rsvpObject.name, rsvpObject.participants.length);
  if (newName !== rsvpObject.name) {
    rsvpObject.name = newName;
    let scheduledRowURLs = [`https://ridewithgps.com/events/${id}`]
    const rwgpsEvents = rwgps.get_events(scheduledRowURLs);
    const scheduledEvents = rwgpsEvents.map(e => RWGPSlib.EventFactory(Globals).fromRwgpsEvent(e));
    scheduledEvents[0].updateRiderCount(rsvpObject.participants.length);
    rwgps.edit_events([{ url: scheduledRowURLs[0], event: scheduledEvents[0] }] )
  }
  return rsvpObject;
}

function myFunction() {
  Logger.log(HtmlService
    .createTemplateFromFile('Index')
    .getCode());
}

function testEventId() {
  let id = 222563; // Jacky Averill ride leader no name
  id = 198803; // ride count says 10, but only 9 in rsvp list
  id = 222293; // Peter Stangar shows up twice, once without a last name!
  id = 222134; // Caused a 'no such event' issue
  id = 222969; // Caused a 'no such event' issue when it shouldn't have. And nothing in the logs :-()
  console.log(getEventData(id))
}


