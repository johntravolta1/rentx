"use strict";

var _tsyringe = require("tsyringe");

var _DayjsDateProvider = require("./DayjsDateProvider");

_tsyringe.container.registerSingleton('DayjsDateProvider', _DayjsDateProvider.DayjsDateProvider);