# Nanotabs.js
Its nano tech. You like it?

## Set up

Setup a basic script tag with a src to the nanotabs.js file and in your html file add a version of the following code.
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
const tc = new NanoTabs('tabBar', 'tabContent', {});
```
### Constructor
- ``tabBar_id`` - String 
- ``tabContent_id`` - String
- ``Options`` - Object (optional)
    - ``showAddBtn`` - true/false

### Properties
- ```tabcount``` - returns a count of tab elements

### Methods
- ```addTab({opts})``` - creates and adds a new tab and content element
- ```removeTab(t_id)``` - removes tab and content based in passed id
- ```selectTab(t_id)``` - selects tab and content based in passed id
---
- ```addGroup({opts})``` - WIP
- ```addTabToGroup(t_id, g_id)``` - WIP
- ```removeTabFromGroup(t_id, g_id)``` - WIP
- ```removeGroup(g_id)``` - WIP
---
- ```addEventListener(event, void)``` - creates event listener (see events)

### Events
- ```tab-select``` => (selectedTab, selectedContent)
- ```tab-added``` => (newTab, newContent)
- ```tab-removed``` => ()
- ```tab-allRemoved``` => ()
---
- ```group-added``` => WIP
- ```group-removed``` => WIP

### Styles
- ```.nanotabs_tabList``` - div containing all tabs
- ```.nanotabs_addBtn``` - tab add button
- ```.nanotabs_group``` - group container
- ```.nanotabs_groupbadge``` - group badge title