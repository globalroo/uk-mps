import {
	ALL_PARLIAMENT_MEMBERS,
	MEMBER_IMAGE_KEY,
	getRemoteThumbnailPortrait,
	getTailOfKey,
	getThumbnailPortrait,
	getValueFromKeyPair
} from "server/helpers";

import { getMPExtendedInfo } from "server/get-extended-mp-info";

const axios = require("axios");
const fs = require("fs");

const FULLNAME_BY_FORENAME_KEY = "http://example.com/F31CBD81AD8343898B49DC65743F0BDF";
const PERSON_TYPE = "Person";
const RDF_DESCRIPTOR = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const PROCESSED_DATA_FILE = "data/processed.json";

const getMemberData = async (members) => {
	const formattedMembers = [];
	for (const [recordIndex, recordData] of Object.entries(members)) {
		const recordType = getValueFromKeyPair(recordData[RDF_DESCRIPTOR]);
		if (recordType && recordType.includes(PERSON_TYPE)) {
			const index = getTailOfKey(recordIndex);
			const mpName = getValueFromKeyPair(recordData[FULLNAME_BY_FORENAME_KEY]);
			//eslint-disable-next-line
			console.log(`${mpName} [${index}] being processed.`);
			const extendedMPInfo = await getMPExtendedInfo(index);
			formattedMembers.push({
				id: index,
				...extendedMPInfo,
				localImage: getThumbnailPortrait(getTailOfKey(getValueFromKeyPair(recordData[MEMBER_IMAGE_KEY]))),
				remoteImage: getRemoteThumbnailPortrait(getTailOfKey(getValueFromKeyPair(recordData[MEMBER_IMAGE_KEY])))
			});
		}
	}
	return formattedMembers;
};

const getData = async (url) => {
	const response = await axios.get(url);
	const { data } = response;
	return await getMemberData(data);
};

const outputMembers = async (processed) => fs.writeFileSync(PROCESSED_DATA_FILE, JSON.stringify(await processed));

getData(ALL_PARLIAMENT_MEMBERS).then((processedData) => {
	outputMembers(processedData);
});
