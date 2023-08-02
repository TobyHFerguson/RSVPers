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
 * Return the name of the event and the list of participants, as an RSVPObject
 * 
 * This has the side effect of updating the event name iff the count recorded in the name differs from the participant count.
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
    updateEventName(newName);
  }
  return rsvpObject;

  /**
   * Update the event name in RWGPS itself
   * 
   */
  function updateEventName(newName) {
    const scheduledRowURL = `https://ridewithgps.com/events/${id}`;
    const e = rwgps.get_events([scheduledRowURL])[0];
    const event = RWGPSlib.EventFactory(Globals).fromRwgpsEvent(e);
    event.name = newName;
    rwgps.edit_events([{ url: scheduledRowURL, event: event }]);
  }
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


