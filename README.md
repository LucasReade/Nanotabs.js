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
const tc = new tabbable('tabBar', 'tabContent', {});
```
### Options
- ``showAddBtn`` - true/false

### Methods
- ```count``` - returns a count of tab elements
- ```add({opts})``` - creates and adds a new tab and content element
- ```remove(t_id)``` - removes tab and content based in passed id
- ```select(t_id)``` - selects tab and content based in passed id
---
- ```createGroup({opts})``` - WIP
- ```addTabToGroup(t_id, g_id)``` - WIP
- ```removeTabFromGroup(t_id, g_id)``` - WIP
- ```removeGroup(g_id)``` - WIP
---
- ```addEventListener(event, void)``` - creates event listener

### Events listeners
- ```tab-select``` => (selectedTab, selectedContent)
- ```tab-add``` => (newTab, newContent)
- ```tab-remove``` => ()
- ```tab-allRemoved``` => ()
---
- ```group-add``` => WIP
- ```group-remove``` => WIP

### Styles
- ```.tabbable_tabList``` - div containing all tabs
- ```.tabbable_addBtn``` - tab add button