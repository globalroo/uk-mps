import React from "react";
import * as renderer from "react-test-renderer";
import { MPCard } from "src/mp-card";
import members from "data/processed.json";

const singleMP = members.shift();

describe("MPCard tests", () => {
	test("MPCard is rendered as expected", () => {
		const component = renderer.create(<MPCard mp={singleMP} />);
		expect(component.toJSON()).toMatchSnapshot();
	});
});
