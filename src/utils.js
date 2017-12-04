const RDF_DESCRIPTOR = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const FULLNAME_BY_SURNAME_KEY = "http://example.com/A5EE13ABE03C4D3A8F1A274F57097B6C";
const FULLNAME_BY_FORENAME_KEY = "http://example.com/F31CBD81AD8343898B49DC65743F0BDF";
const MEMBER_IMAGE_KEY = "https://id.parliament.uk/schema/memberHasMemberImage";
const FAMILY_NAME_KEY = "https://id.parliament.uk/schema/personFamilyName";
const GIVEN_NAME_KEY = "https://id.parliament.uk/schema/personGivenName";
const PARLIAMENT_API = "http://lda.data.parliament.uk/members.json";
const LOCALSTORE_KEY = "membersOfParliament";
const PERSON_TYPE = "Person";

export const getThumbnailPortrait = (id = "404") => `images/${id}.jpeg`;
export const getTailOfKey = (key = "") => key.split("/").pop();
export const getCachedMembers = async () => await localStorage.getItem("membersOfParliament");

const getValueFromKeyPair = (keypairArr = []) => {
	const [keypair = { value: undefined }] = keypairArr;
	const { value } = keypair;
	return value;
};

export const getDataFromParliament = async name => {
	const response = await fetch(
		encodeURI(`${PARLIAMENT_API}?fullName=${name}`)
	);
	const jsonResponse = await response.json();
	const { result = { items: [] } } = jsonResponse;
	const { items = [] } = result;
	const [data] = items;
	return data;
};

export const flattenData = async members => {
	const formattedMembers = [];
	for (const [recordIndex, recordData] of Object.entries(members)) {
		const recordType = getValueFromKeyPair(recordData[RDF_DESCRIPTOR]);
		// Only find people - bunch of Nodes in the raw data
		if (recordType && recordType.includes(PERSON_TYPE)) {
			const mpKey = getTailOfKey(recordIndex);
			formattedMembers.push({
				id: getTailOfKey(mpKey),
				image: getThumbnailPortrait(
					getTailOfKey(getValueFromKeyPair(recordData[MEMBER_IMAGE_KEY]))
				),
				fullNameByForename: getValueFromKeyPair(recordData[FULLNAME_BY_FORENAME_KEY]),
				fullNameBySurname: getValueFromKeyPair(recordData[FULLNAME_BY_SURNAME_KEY]),
				familyName: getValueFromKeyPair(recordData[FAMILY_NAME_KEY]),
				givenName: getValueFromKeyPair(recordData[GIVEN_NAME_KEY]),
				data: await getDataFromParliament(getValueFromKeyPair(recordData[FULLNAME_BY_FORENAME_KEY]))
			});
		}
	}
	localStorage.setItem(LOCALSTORE_KEY, JSON.stringify(formattedMembers));
	return formattedMembers;
};
