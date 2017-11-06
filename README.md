# propolis-node-library-conf
[![Support us on Patreon][badge_patreon]][patreon] [![Build Status][badge_travis]][travis] 

Propolis Node Conf is to make easy to manage and get the right configuration files with cascading.

## :cloud: Installation

```sh
$ npm i --save propolis-node-conf
```

## :clipboard: Example

```js
const conf = require("propolis-node-conf");

let confs = conf.getConfs();
```

## :memo: Documentation

**Methods**

* `setApplicationEnv`
    - (String): Application Environment name, also known in this context has a `level`.
* `levelExist`
* `getApplicationEnv`
* `setConfPath`
* `getConfPath`
* `getLevelPath`
* `getLevelNames`
* `getLevelPaths`
* `setCascadeLevelNames`
* `getCascadeLevelNames`
* `setCascadeLevelPaths`
* `getCascadeLevelPaths`
* `getConfList`
* `getConfContent`
* `getConf`
* `getConfs`
* `saveCache`
* `rmCache`

## :scroll: License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[badge_patreon]: https://propolisframework.github.io/assets/img/patreon.svg
[badge_travis]: https://travis-ci.org/PropolisFramework/propolis-node-conf.svg?branch=master

[patreon]: https://www.patreon.com/propolisframework
[travis]: https://travis-ci.org/PropolisFramework/propolis-node-conf
