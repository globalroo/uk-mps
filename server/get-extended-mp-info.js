import axios from "axios";
import Promise from "bluebird";

import { getMPExtendedInfoURI, getTailOfKey, getUsefulField, getValueFromKeyPair } from "server/helpers";

const SERVER_REQUEST_DELAY = 100;

const getMeaningfulFields = (ix, data, useful = {}) => {
	for (const [recordIndex, recordData] of Object.entries(data)) {
		const fieldName = getUsefulField(getTailOfKey(recordIndex));
		if (fieldName) {
			useful[fieldName] = getValueFromKeyPair(recordData);
		} else {
			if (typeof recordData === "object") {
				getMeaningfulFields(ix, recordData, useful);
			}
		}
	}
};

const requestMPExtendedInfo = async (ix) => {
	try {
		const mpData = {};
		const response = await axios.get(getMPExtendedInfoURI(ix));
		const { data } = response;
		getMeaningfulFields(ix, data, mpData);
		return mpData;
	} catch (error) {
		//eslint-disable-next-line
		console.error(error);
	}
};

const staggerRequestHoC = (resolve, ix) => async () => {
	const mpInfo = await requestMPExtendedInfo(ix);
	resolve(mpInfo);
};

export const getMPExtendedInfo = (ix) => {
	return new Promise((resolve) => {
		setTimeout(staggerRequestHoC(resolve, ix), SERVER_REQUEST_DELAY);
	});
};
