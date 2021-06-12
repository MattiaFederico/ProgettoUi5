/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"gruppo1/gruppo1/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});