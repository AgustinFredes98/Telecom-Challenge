import * as React from "react";
import renderer from "react-test-renderer"
import Header from '.'
import { expect } from '@jest/globals';



describe ('Header', () => {
	describe ('Snapshots', () => {
    it('should render correctly', () => {
			const container = renderer.create(<Header currentIconURL="az<s"/>).toJSON();
			expect(container).toMatchSnapshot();
		});
	});
});