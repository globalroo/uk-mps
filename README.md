# uk-mps

```sh
npm install yarn -g
yarn start
```

## Brief description

A list of all UK-MPs stiched together from the excellent new beta parliament site https://beta.parliament.uk/ and the also amazing http://lda.data.parliament.uk which is used for additional meta as the endpoints on the beta site are not open yet.

Read the story about how all these images came about here: https://pds.blog.parliament.uk/2017/07/21/mp-official-portraits-open-source-images/

Motivation? I'm listening to https://www.amazon.co.uk/Quantum-Memory-Power-Improve-Champion/dp/0743528662 at the moment, and one of the first chapters is about memorising names and faces. I figured it would be good to do this with our members of parliament, then I saw the APIs and thought it would be fun to combine two activities.

DISCLAIMER: This is VERY work in progress, the utils.js has the stitching code to get the images and sew the data together. At the moment, it's using the parsed data I've pulled once locally. It's probably going to end up being a carousel of MPS.

As there is no commonality other than names between the old and the new endpoints, I've had to use them.
Thankfully they seem to match exactly between sites.
