var twilio = require('twilio');

/*
 * GET: '/'
 */
exports.index = function (request, response) {
    response.render('index');
};

/*
 * POST: '/ivr/welcome'
 */
exports.welcome = function (request, response) {
    var twiml = new twilio.TwimlResponse();
    twiml.gather({
        action: "/ivr/welcome",
        numDigits: "1",
        method: "POST"
    }, function (node) {
        node.play("http://howtodocs.s3.amazonaws.com/et-phone.mp3", { loop: 3 });
    });
    response.send(twiml);
};

/*
 * POST: '/ivr/menu'
 */
exports.menu = function (request, response) {
    var selectedOption = request.body.Digits;
    var optionActions = {
        "1": giveExtractionPointInstructions,
        "2": listPlanets
    }
    
    if (optionActions[selectedOption]) {
        var twiml = new twilio.TwimlResponse();
        optionActions[selectedOption](twiml);
        response.send(twiml);
    }
    response.send(redirectWelcome());
};

/*
 * POST: '/ivr/planets'
 */
exports.planets = function (request, response) {
    var selectedOption = request.body.Digits;
    var optionActions = {
        "2": "+12024173378",
        "3": "+12027336386",
        "4": "+12027336637"
    }
    
    if (optionActions[selectedOption]) {
        var twiml = new twilio.TwimlResponse();
        twiml.dial(optionActions[selectedOption]);
        response.send(twiml);
    }
    response.send(redirectWelcome());
};

var giveExtractionPointInstructions = function (twiml) {
    twiml.say("To get to your extraction point, get on your bike and go down " +
        "the street. Then Left down an alley. Avoid the police cars. Turn left " +
        "into an unfinished housing development. Fly over the roadblock. Go " +
        "passed the moon. Soon after you will see your mother ship.",
        { voice: "alice", language: "en-GB" });
    
    twiml.say("Thank you for calling the ET Phone Home Service - the " +
        "adventurous alien's first choice in intergalactic travel");
    
    twiml.hangup();
    return twiml;
}

var listPlanets = function (twiml) {
    twiml.gather({
        action: "/ivr/planets",
        numDigits: "1",
        method: "POST"
    }, function (node) {
        node.say("To call the planet Broh doe As O G, press 2. To call the planet " +
            "DuhGo bah, press 3. To call an oober asteroid to your location, press 4. To " +
            "go back to the main menu, press the star key ",
            { voice: "alice", language: "en-GB", loop: 3 });
    });
    return twiml;
}

var redirectWelcome = function () {
    var twiml = new twilio.TwimlResponse();
    twiml.say("Returning to the main menu", { voice: "alice", language: "en-GB" });
    twiml.redirect("/ivr/welcome");
    return twiml;
}