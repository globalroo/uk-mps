# uk-mps

```sh
npm install yarn -g
yarn start or yarn build
```
Live site: https://globalroo.github.io/uk-mps/

## Brief description

A list of all current UK-MPs (with images) pulled from the excellent new beta parliament site https://beta.parliament.uk/.

Read the story about how all these images came about here: https://pds.blog.parliament.uk/2017/07/21/mp-official-portraits-open-source-images/

Motivation? I'm listening to https://www.amazon.co.uk/Quantum-Memory-Power-Improve-Champion/dp/0743528662 at the moment, and one of the first chapters is about memorising names and faces. I figured it would be good to do this with our members of parliament, then I saw the APIs and thought it would be fun to combine two activities.

DISCLAIMER: This is VERY work in progress and should be categororised as 'tinkered with in front of the tv' at the moment.

## Update 12 Dec:

Generate a parsed version of "https://api.parliament.uk/Live/fixed-query/house_current_members?house_id=1AFu55Hs&format=application%2Fjson" by running:

```sh
yarn parser
```

This will drop the latest parliament data into the data/processed.json file.

The file is now in a consumable format for the memory game. Ready to update the client side React. An example object can be seen below.

```json
[{
	"honorificName": "Dr Dan Poulter MP",
	"fullName": "Dr Dan Poulter",
	"personFamilyName": "Poulter",
	"personGivenName": "Daniel",
	"personHasPersonalWebLink": "http://www.drdanielpoulter.com/",
	"personHasTwitterWebLink": "https://twitter.com/drdanpoulter",
	"personOtherNames": "Leonard James",
	"houseName": "House of Commons",
	"addressLine1": "House of Commons",
	"addressLine2": "London",
	"postCode": "SW1A 0AA",
	"partyName": "Conservative",
	"positionName": "Parliamentary Under-Secretary (Department of Health)",
	"constituencyGroupName": "Central Suffolk and North Ipswich",
	"constituencyGroupStartDate": "2010-05-06+00:00",
	"email": "daniel.poulter.mp@parliament.uk",
	"phoneNumber": "020 7219 7038",
	"localImage": "images/.jpeg",
	"remoteImage": "https://api.parliament.uk/Live/photo/.jpeg?crop=CU_1:1&width=186&quality=80"
}]
```
