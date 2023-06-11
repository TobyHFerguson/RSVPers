function doGet(e) {

  // use an externally hosted stylesheet
  const style = '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">';

  // Get the event object


  const t = HtmlService.createTemplateFromFile('Index');
  t.event = getEventData(e.parameter.event);
  return t.evaluate();

}

function getEventData(event) {
  const title = 'My Event Title: ' + (event ? event : 0)
  return {
    'title': title,
    'participants': ['Fred Astaire', 'John Smith'],
    'leaders': ['John Smith']
  }
}

function myFunction() {
  Logger.log(HtmlService
    .createTemplateFromFile('Index')
    .getCode());
}

function testThis() {
  x = {
    'participants': ['Fred Astaire', 'John Smith'],
    'leaders': ['John Smith']
  }
  x.participants.forEach(p => {
    if (x.leaders.includes(p)) {
      console.log(p)
    } else {
      console.log('no');
    }
  })
}
