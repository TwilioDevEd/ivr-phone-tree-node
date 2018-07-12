const {welcome, menu, planets} = require('../../src/ivr/handler');

describe('IvrHandler#Welcome', () => {
  it('should serve TwiML with gather', () => {
    const twiml = welcome();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Gather')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML options
    expect(twiml).toContain('action="/ivr/menu"');
    expect(twiml).toContain('numDigits="1"');
    expect(twiml).toContain('loop="3"');

    // TwiML content
    expect(twiml).toContain('Thanks for calling the E T Phone Home Service.');
  });
});

describe('IvrHandler#Menu', () => {
  it('should redirect to welcomes with digits other than 1 or 2', () => {
    const twiml = menu();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML content
    expect(twiml).toContain('welcome');
  });

  it('should serve TwiML with say twice and hangup', () => {
    const twiml = menu('1');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(4);
    expect(count('Hangup')).toBe(1);

    // TwiML content
    expect(twiml).toContain(
      'To get to your extraction point, get on your bike and go down the ' +
      'street. Then Left down an alley. Avoid the police cars. Turn left ' +
      'into an unfinished housing development. Fly over the roadblock. Go ' +
      'passed the moon. Soon after you will see your mother ship.'
    );
    expect(twiml).toContain(
      'Thank you for calling the ET Phone Home Service - the ' +
      'adventurous alien\'s first choice in intergalactic travel'
    );
  });

  it('should serve TwiML with gather and say', () => {
    const twiml = menu('2');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Gather')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML options
    expect(twiml).toContain('action="/ivr/planets"');
    expect(twiml).toContain('numDigits="1"');

    // TwiML content
    expect(twiml).toContain(
      'To call the planet Broh doe As O G, press 2. To call the planet DuhGo ' +
      'bah, press 3. To call an oober asteroid to your location, press 4. To ' +
      'go back to the main menu, press the star key '
    );
  });
});

describe('IvrHandler#Planets', () => {
  it('should redirect to welcomes with digits other than 2, 3 or 4', () => {
    const twiml = planets();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);
    expect(count('Redirect')).toBe(2);

    // TwiML content
    expect(twiml).toContain('welcome');
  });

  it('should serve TwiML with dial', () => {
    const twiml = planets('4');

    // TwiML verbs
    expect(twiml).toContain('Dial');

    // TwiML content
    expect(twiml).toContain('+12027336637');
  });
});

/**
 * Counts how many times a word is repeated
 * @param {String} paragraph
 * @return {String[]}
 */
function countWord(paragraph) {
  return (word) => {
    const regex = new RegExp(`\<${word}[ | \/?\>]|\<\/${word}?\>`);
    return (paragraph.split(regex).length - 1);
  };
}
