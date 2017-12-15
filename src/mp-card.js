import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const partyColours = {
	Conservative: "blue",
	Labour: "red",
	ScottishNationalParty: "yellow",
	Independent: "white",
	LiberalDemocrat: "orange",
	DemocraticUnionistParty: "orange",
	PlaidCymru: "lightGreen",
	GreenParty: "green",
	SinnFéin: "darkOrange",
	IndependentUnionist: "lightBlue",
	UlsterUnionistParty: "blue",
	Speaker: "green"
};

export const getDate = (date) => format(date.split("+").shift(), "MMM YYYY");

export const MPCard = ({ mp }) => {
	const index = mp.partyName.split(" ").join("");
	const color = partyColours[index];
	const classes = `${color} card card-overrides`;
	return (
		<div className={classes}>
			<div className="image">
				<img src={mp.localImage} alt={mp.honorificName} />
			</div>
			<div className="content">
				<div className="header">{mp.honorificName}</div>
				<div className="meta">{mp.constituencyGroupName}</div>
				<div className="description">{mp.positionName}</div>
			</div>
			<div className="extra content">
				<span className="right floated">
					<i className="calendar icon" />
					{getDate(mp.constituencyGroupStartDate)}
				</span>
				<span>
					<i className="id badge icon" />
					{mp.partyName}
				</span>
			</div>
		</div>
	);
};

MPCard.propTypes = {
	mp: PropTypes.object
};
