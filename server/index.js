//TODO: Type it up
//TODO: Process response from getDataFromPaliament
//TODO: Sort it alphabetically
//TODO: Stitch in other endpoints
//TODO: strip keys of URL formatting

const axios = require("axios");
const fs = require("fs");

const FAMILY_NAME_KEY = "https://id.parliament.uk/schema/personFamilyName";
const FULLNAME_BY_FORENAME_KEY = "http://example.com/F31CBD81AD8343898B49DC65743F0BDF";
const FULLNAME_BY_SURNAME_KEY = "http://example.com/A5EE13ABE03C4D3A8F1A274F57097B6C";
const GIVEN_NAME_KEY = "https://id.parliament.uk/schema/personGivenName";
const LOCALSTORE_KEY = "membersOfParliament";
const MEMBER_IMAGE_KEY = "https://id.parliament.uk/schema/memberHasMemberImage";
const PARLIAMENT_API = "http://lda.data.parliament.uk/members.json";
const PERSON_TYPE = "Person";
const RDF_DESCRIPTOR = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const PROCESSED_DATA_FILE = "processed.json";
const ALL_PARLIAMENT_MEMBERS = "https://api.parliament.uk/Live/fixed-query/house_current_members?house_id=1AFu55Hs&format=application%2Fjson";

const getThumbnailPortrait = (id = "404") => `images/${id}.jpeg`;
const getRemoteThumbnailPortrait = (id = "404") => `https://api.parliament.uk/Live/photo/${id}.jpeg?crop=CU_1:1&width=186&quality=80`;

const getTailOfKey = (key = "") => key.split("/").pop();

const getValueFromKeyPair = (keypairArr = []) => {
	const [keypair = { value: undefined }] = keypairArr;
	const { value } = keypair;
	return value;
};

const getDataFromParliament = async name => {
	const response = await axios(encodeURI(`${PARLIAMENT_API}?fullName=${name}`));
	const { result = { items: [] } } = response;
	const { items = [] } = result;
	const [data] = items;
	return data;
};

const flattenData = async members => {
	const formattedMembers = [];
	for (const [recordIndex, recordData] of Object.entries(members)) {
		console.log(`${recordIndex} being processed`);
		const recordType = getValueFromKeyPair(recordData[RDF_DESCRIPTOR]);
		if (recordType && recordType.includes(PERSON_TYPE)) {
			const mpKey = getTailOfKey(recordIndex);
			formattedMembers.push({
				id: getTailOfKey(mpKey),
				localImage: getThumbnailPortrait(getTailOfKey(getValueFromKeyPair(recordData[MEMBER_IMAGE_KEY]))),
				remoteImage: getRemoteThumbnailPortrait(getTailOfKey(getValueFromKeyPair(recordData[MEMBER_IMAGE_KEY]))),
				fullNameByForename: getValueFromKeyPair(recordData[FULLNAME_BY_FORENAME_KEY]),
				fullNameBySurname: getValueFromKeyPair(recordData[FULLNAME_BY_SURNAME_KEY]),
				familyName: getValueFromKeyPair(recordData[FAMILY_NAME_KEY]),
				givenName: getValueFromKeyPair(recordData[GIVEN_NAME_KEY]),
				data: await getDataFromParliament(getValueFromKeyPair(recordData[FULLNAME_BY_FORENAME_KEY]))
			});
		}
	}
	return formattedMembers;
};

const getData = () => {
	const url = ALL_PARLIAMENT_MEMBERS;

	axios
		.get(url)
		.then( async (response) => {
			const { data } = response;
			const processed = JSON.stringify(await flattenData(response.data));
			fs.writeFileSync(PROCESSED_DATA_FIE, processed);
		})
		.catch(error => {
			console.log(error);
		});
};

const outputMembers = () => {
	let members = JSON.parse(fs.readFileSync(PROCESSED_DATA_FILE));
	console.log(members);
};

//getData(); - generates the "processed.json" used from /data/ to ./
