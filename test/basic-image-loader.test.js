import React from "react";
import * as renderer from "react-test-renderer";
import { BasicImageLoader } from "src/basic-image-loader";

describe("BasicImageLoader tests", () => {
	test("BasicImageLoader is rendered as expected", () => {
		const component = renderer.create(<BasicImageLoader src={"test.jpeg"}u alt={"404"}/>);
		expect(component.toJSON()).toMatchSnapshot();
	});
	test("Loaded condition changes state to loaded", () => {
		const component = renderer.create(<BasicImageLoader src={"error"} alt={"404"}/>);
		const instance = component.getInstance();
		instance.onLoad();
		expect(instance.state.loaded).toBe(true);
	});
	test("Error condition changes state to error", () => {
		const component = renderer.create(<BasicImageLoader src={"error"} alt={"404"}/>);
		const instance = component.getInstance();
		instance.onError();
		expect(instance.state.error).toBe(true);
	});
});
