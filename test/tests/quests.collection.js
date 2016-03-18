/**
 * Created by: leafchild
 * Date: 1/11/16
 * Time: 09:52
 */

var expect = chai.expect;

describe("TheGame.Collections.Quests", function () {

	before(function () {
		// Create a reference for all internal suites/specs.
		this.quests = new TheGame.Collections.Quests();
	});

	after(function () {
		// Remove the reference.
		this.notes = null;
	});

	describe("creation", function () {

		it("has default values", function () {
			expect(this.quests).to.be.ok;
			expect(this.quests).to.have.length(0);
		});

		// -- Omitted in Book. --
		it("should be empty on fetch", function (done) {
			// Stash reference to save context.
			var quests = this.quests;

			// Before fetch.
			expect(quests).to.be.ok;
			expect(quests).to.have.length(0);

			// After fetch.
			quests.once("reset", function () {
				expect(quests).to.have.length(0);
				done();
			});

			quests.fetch({ reset: true });
			done();
		});

	});

	describe("modification", function () {

		beforeEach(function () {
			// Load a pre-existing note.
			this.quests.create({
				name: "Test note #1",
				description: "A pre-existing note from beforeEach."
			});
		});

		afterEach(function () {
			// Wipe internal data and reset collection.
			this.quests.reset();
		});

		it("has a single note", function (done) {
			var quests = this.quests, quest;

			// After fetch.
			quests.once("reset", function () {
				expect(quests).to.have.length(1);

				// Check model attributes.
				quest = quests.at(0);
				expect(quest).to.be.ok;
				expect(quest.get("name")).to.contain("#1");
				expect(quest.get("description")).to.contain("pre-existing");

				done();
			});

			quests.fetch({ reset: true });
			done();
		});

		it("can delete a note", function (done) {
			var quests = this.quests, quest;

			// After shift.
			quests.once("remove", function () {
				expect(quests).to.have.length(0);
				done();
			});

			// Remove and return first model.
			quest = quests.shift();
			expect(quest).to.be.ok;
		});

		// -- Omitted in Book. --
		it("can create a second note", function (done) {
			var quests = this.quests,
				  quest = quests.create({
					  name: "Test note #2",
					  description: "A new note, created in the test."
				  });

			// After fetch.
			quests.once("reset", function () {
				expect(quests).to.have.length(2);

				// Check model attributes.
				quest = quests.at(1);
				expect(quest).to.be.ok;
				expect(quest.get("name")).to.contain("#2");
				expect(quest.get("description")).to.contain("new note");

				done();
			});

			quests.fetch({ reset: true });
			done();
		});

	});
});
