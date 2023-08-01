#RSVPers
RSVPers is a web app referenced in the RWGPS events produced by Santa Cruz County Cycling Club

## Credentials
It requires a javascript Credentials object at global scope, containing the email address and password of a user who has the rights to update an event, structured thus:

```javascript
const Credentials = {
  username: "foo@bar.com", 
  password: "MyPassword"
}

```

## Deployment
To reduce the text in the body of the event we use tinyurl.com to shorten the URL of the app.

ANY TIME that there's a modification to this script the following process needs to be followed:
1. a new deployment must be created
2. A new tiny url must be created from the new deployment's url
3. The Ride Manager Functions script's Globals.RSVP_BASE_URL property must be updated with that tiny url
