/**
 * Created by: leafchild
 * Date: 1/11/16
 * Time: 08:30
 */
var expect = chai.expect;

describe("TheGame.Models.Quest", function () {
	it("has default values", function () {
		// Create empty note model.
		var model = new TheGame.Models.Quest();

		expect(model).to.be.ok;
		expect(model.get("description")).to.equal("");
		expect(model.get("priority")).to.equal(0);
		expect(model.get("comments")).to.equal("");
	});

	it("sets passed attributes", function () {
		var model = new TheGame.Models.Quest({
			name: "Grocery List",
			description: "* Milk\n* Eggs\n*Coffee"
		});

		expect(model.get("name")).to.equal("Grocery List");
		expect(model.get("description")).to.equal("* Milk\n* Eggs\n*Coffee");
	});
});
