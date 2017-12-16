import React from "react";
import * as renderer from "react-test-renderer";
import { MPCard, getBestAvailableImage } from "src/mp-card";
import members from "data/processed.json";

const singleMP = members.shift();

describe("MPCard tests", () => {
	test("MPCard is rendered as expected", () => {
		const component = renderer.create(<MPCard mp={singleMP} />);
		expect(component.toJSON()).toMatchSnapshot();
	});
	test("getBestAvailableImage returns a good image", () => {
		const testImage = "good.jpeg";
		const twitterImage = "twitter.jpeg";
		const availableImage = getBestAvailableImage(testImage, twitterImage);
		expect(availableImage).toBe("good.jpeg");
	});
	test("getBestAvailableImage returns a twitter image, if no default image", () => {
		const testImage = "404";
		const twitterImage = "twitter.jpeg";
		const availableImage = getBestAvailableImage(testImage, twitterImage);
		expect(availableImage).toBe("twitter.jpeg");
	});
	test("getBestAvailableImage leaves the 404 in place if no Twitter image", () => {
		const testImage = "404.jpeg";
		const twitterImage = "";
		const availableImage = getBestAvailableImage(testImage, twitterImage);
		expect(availableImage).toBe("404.jpeg");
	});
});
