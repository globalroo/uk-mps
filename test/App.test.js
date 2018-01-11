import React from "react";
import * as renderer from "react-test-renderer";
import App from "src/App";
import members from "data/processed.json";

jest.mock("src/mp-card", () => ({
	MPCard: ({ mp }) => <div>{mp.honorificName}</div> // eslint-disable-line
}));

jest.mock("src/card-stack/card-stack");
jest.mock("src/card-stack/animated-button");

describe("Application tests", () => {
	test("Application is rendered as expected", () => {
		const component = renderer.create(<App members={members} />);
		expect(component.toJSON()).toMatchSnapshot();
	});

	test("Application is rendered as expected", () => {
		const component = renderer.create(<App members={members} />);
		const instance = component.getInstance();
		const enableControlsSpy = jest.fn();
		instance.controls = {
			enable: enableControlsSpy
		};
		instance.enableControls();
		expect(enableControlsSpy).toHaveBeenCalled();
	});
});
