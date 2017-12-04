import React from "react";
import ReactDOM from "react-dom";
import "src/index.css";
import App from "src/App";
import registerServiceWorker from "src/registerServiceWorker";

// This image data was acquired from the excellent https://beta.parliament.uk/
// Read the story about how the images came about here: https://pds.blog.parliament.uk/2017/07/21/mp-official-portraits-open-source-images/
// The APIs aren't public yet but will be soon. Some amazing engineering going on over there.
// In the meantime I've used these MP images from the beta site and stitched together with
// the live API site (also excellent!) here: http://lda.data.parliament.uk
// As there is no commonality other than names to make the connection I've used that.
// Thankfully it seems pretty consistent.

import { members } from "data/members";

ReactDOM.render(<App members={members} />, document.getElementById("root"));
registerServiceWorker();
