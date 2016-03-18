/**
 * Created by: leafchild
 * Date: 1/11/16
 * Time: 08:17
 */

var expect = chai.expect;

describe("Namespace", function () {

	it("provides the 'TheGame' object", function () {
		// Expect exists and is an object.
		expect(TheGame).to.be.an("object");

		// Expect all namespace properties are present.
		expect(TheGame).to.include.keys(
			  "Collections", "Models",
			  "Routers", "Views"
		);
	});

	it("provides init() function for the 'TheGame' object", function () {
		expect(TheGame.init).to.be.an("function");
	});
});
