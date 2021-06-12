/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"gruppo1/gruppo1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});