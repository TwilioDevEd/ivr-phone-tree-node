# IVR Phone Tree: IVR for beginners. Powered by Twilio - Node.js/Express

[![Build Status](https://travis-ci.org/TwilioDevEd/ivr-phone-tree-node.svg)](https://travis-ci.org/TwilioDevEd/ivr-phone-tree-node)

An example application implementing an automated phone line using 
Node.js and [Express](http://expressjs.com/en/index.html) web framework.

[Read the full tutorial here](https://www.twilio.com/docs/tutorials/walkthrough/ivr-phone-tree/node/express)!

## Local development

First you need to install either [Node.js](http://nodejs.org/) or [io.js](https://iojs.org/en/index.html), both of which 
should also install [npm](https://www.npmjs.com/).

To run the app locally, clone this repository and `cd` into its directory. Then:

1. Install project's dependencies:

    ```
    npm install
    ```

1. Start the development server

    ```
    node .
    ```
    Alternatively you might also consider using [nodemon](https://github.com/remy/nodemon) for this. It works just like 
    the node command, but automatically restarts your application when you change any source code files.
    
    ```
    npm install -g nodemon
    nodemon .
    ```
    
1. Expose the application to the wider Internet using [ngrok](https://ngrok.com/)

    ```
    ngrok http 3000 -host-header="localhost:3000"
    ```
    
1. Provision a number under the [Twilio's Manage Numbers](https://www.twilio.com/user/account/phone-numbers/incoming) 
page on your account. Set the voice URL for the number to http://[your-ngrok-subdomain].ngrok.io/ivr/welcome

That's it

## Run the tests

You can run the tests locally by typing

```
npm test
```

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
