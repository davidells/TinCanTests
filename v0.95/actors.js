/* Global equal, responseText, statement, ok, deepEqual, QUnit, module, asyncTest, Util, start */
/*jslint devel: true, browser: true, sloppy: false, maxerr: 50, indent: 4, plusplus: true */
var actorEnv = {};

module('Actors', {
	setup: function () {
		"use strict";
		Util.init(actorEnv);
	}
});

//PUT | GET | DELETE http://example.com/TCAPI/agents/<actor>/profile/<profile object key>
asyncTest('Profile', function () {
	"use strict";
	actorEnv.util.putGetDeleteStateTest(actorEnv, '/agents/profile?agent=<agent>');
});

//GET http://example.com/TCAPI/agents/<agent>
asyncTest('Definition', function () {
	"use strict";
	var env = actorEnv,
		url = '/agents?agent=<agent>';

	env.util.request('GET', url, null, true, 200, 'OK', function (xhr) {
		equal(env.util.tryJSONParse(xhr.responseText).mbox[0], env.util.actor.mbox, 'actor mbox');
		start();
	});
});

//GET http://example.com/TCAPI/agents/<agent>/profile[?since=<timestamp>]
asyncTest('Profile, multiple', function () {
	"use strict";
	actorEnv.util.getMultipleTest(actorEnv, '/agents/profile?agent=<agent>','profileId');
});

asyncTest('Profile, Concurrency Rules', function(){
    "use strict";
    var env = actorEnv;
    var url = "/agents/profile?agent=<agent>&profileId=" + env.util.ruuid();
    env.util.concurrencyRulesTest(env, url, true);
});
