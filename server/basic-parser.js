import { test } from "server/test-data"
const meaningfulFields = [
	"D79B0BAC513C4A9A87C9D5AFF1FC632F",
	"F31CBD81AD8343898B49DC65743F0BDF",
	"addressLine1",
	"addressLine2",
	"constituencyGroupName",
	"constituencyGroupStartDate",
	"email",
	"houseName",
	"partyName",
	"personFamilyName",
	"personGivenName",
	"personHasPersonalWebLink",
	"personHasTwitterWebLink",
	"personOtherNames",
	"phoneNumber",
	"positionName",
	"postCode"
];

const findValue = (array, item, start = 0, end = array.length - 1) => {
	if (start > end) {
		return -1;
	}
	const middle = Math.floor((start + end) / 2);
	return array[middle] === item
		? middle
		: item < array[middle] ? findValue(array, item, start, middle - 1) : findValue(array, item, middle + 1, end);
};

// Return found fieldName or undefined
const getUsefulFields = (key = "") => {
	const foundAt = findValue(meaningfulFields, key);
	if (foundAt > -1) {
		return meaningfulFields[foundAt];
	} else {
		return;
	}
};

const getTailOfKey = (key = "") => key.split("/").pop();

const getValueFromKeyPair = (keypairArr = []) => {
	const [keypair = { value: undefined }] = keypairArr;
	const { value } = keypair;
	return value;
};

const getMeaningfulFields = (ix, data, useful = {}) => {
	for (const [recordIndex, recordData] of Object.entries(data)) {
		const fieldName = getUsefulFields(getTailOfKey(recordIndex));
		if (fieldName) {
			//get the data out of the record.
			useful[fieldName] = getValueFromKeyPair(recordData);
		} else {
			if (typeof recordData === "object") {
				getMeaningfulFields(ix, recordData, useful);
			}
		}
	}
};

// Recursive Parser to pull out useful data for memory game from api.parliament.uk endpoints.
// https://api.parliament.uk/Live/fixed-query/constituency_current_by_initial?initial=a&format=application%2Fjson
// https://api.parliament.uk/Live/fixed-query/constituency_by_id?constituency_id=rbjeoKoX&format=application%2Fjson
// https://api.parliament.uk/Live/fixed-query/house_party_current_members?house_id=1AFu55Hs&party_id=DIifZMjq&format=application%2Fjson
// https://api.parliament.uk/Live/fixed-query/house_current_parties?house_id=1AFu55Hs&format=application%2Fjson
// https://beta.parliament.uk/parties/DIifZMjq

let useful = {};
getMeaningfulFields("43RHonMf", test, useful);
console.log(JSON.stringify(useful));
