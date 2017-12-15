import React from "react";
import ReactDOM from "react-dom";
import App from "src/App";
import registerServiceWorker from "src/registerServiceWorker";

import "semantic-ui-css/semantic.min.css";
import "src/index.css";
import members from "data/processed.json";

// Grab unique party names.
// const partyNames = members.map((rec) => rec.partyName);
// const unique = new Set([...partyNames]);

//TODO: Sort members alphabetically, move this to parser.
members.sort((a, b) => {
	if (a.personFamilyName < b.personFamilyName) return -1;
	if (a.personFamilyName > b.personFamilyName) return 1;
	return 0;
});

ReactDOM.render(<App members={members} />, document.getElementById("root"));
registerServiceWorker();
