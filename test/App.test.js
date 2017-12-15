import React from "react";
import * as renderer from "react-test-renderer";
import App from "src/App";
import members from "data/processed.json";

jest.mock("src/mp-card", () => ({
	//eslint-disable-next-line
	MPCard: ({ mp }) => (<div> mp.honorificName} </div>)
}));

describe("Application tests", () => {
	test("Application is rendered as expected", () => {
		const component = renderer.create(<App members={members} />);
		expect(component.toJSON()).toMatchSnapshot();
		//expect(650).toBe(650);
	});
});
