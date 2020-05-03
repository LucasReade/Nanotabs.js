# tabbable.js
Simple extendable tab contorl in pure javascript

## Set up

Setup a basic script tag with a src to the tabble.js file and in your html file add a version of the following code.
```
<div id="tabBar">
    <template><div><p>Tab</p></div></template>
</div>
<div id="tabContent">
    <template><div></div></template>
</div>
```
The template controls will becore your tab and content items when created.


In your main Js file add the following code.
```
const tc = new tabbable('tabBar', 'tabContent');
```
### methods
- tabs - returns a list of tab elements
- add({opts}) - creates and adds a new tab and content element
- remove(t_id) - removes tab and content based in passed id
- select(t_id) - selects tab and content based in passed id
- addEventListener(event, void) - creates event listener

### Events
- select => (selectedTab, selectedContent)
- add => (newTab, newContent)
- remove => ()
- allRemoved => ()