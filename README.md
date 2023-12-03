This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.

# Zowe Widgets (formally: zLUX widgets) library

Adding the library to your package:
`npm install "git+ssh://git@github.com:zowe/zlux-widgets.git" --save`

Popup Window
Imports:  
Module: `import { ZluxPopupWindowModule } from '@zlux/widgets'`  
Component: `import { ZluxPopupWindowComponent } from '@zlux/widgets'` template: `<zlux-popup-window>`  
Template parameters:
- header: string
- dark: boolean - if true - apply dark style to header
- width: string - force write content area width by this value
- onCloseWindow: EventEmitter

Popup Window Button Area  
Imports:  
Module: `import { ZluxPopupWindowModule } from '@zlux/widgets'`  
Component: `import { ZluxPopupWindowButtonAreaComponent } from '@zlux/widgets'` template:   `<zlux-popup-window-button-area>`

The buttons are rendered in the place corresponding to the style:
-  "popup-window-button-left"
-  "popup-window-button-center"
-  without style for right aligned

Button
Imports:  
Module: `import { ZluxButtonModule } from '@zlux/widgets'`  
Component: `import { ZluxButtonComponent } from '@zlux/widgets'` template: `<zlux-button>`  
Template parameters:
- buttonType: string -  attribute "type" of buttons tag
- label: string
- disabled: boolean
- style: any
- styleClass: string - attribute "class" of buttons tag
- callToAction: boolean - if true - apply "Call To Action" style to button
- onClick: EventEmitter

Example:
```
<zlux-popup-window [header]="'headerString'" (onCloseWindow)="closePopupHandle($event)">
  There is main content
  <zlux-popup-window-button-area>
    <zlux-button buttonType="submit"
                class="popup-window-button-left"
                label="Left aligned button"
                callToAction="true"></zlux-button>
    <zlux-button buttonType="button"
                class="popup-window-button-center"
                label="Center aligned button"></zlux-button>
    <zlux-button buttonType="button"
                label="Right aligned button"></zlux-button>
  </zlux-popup-window-button-area>
</zlux-popup-window>
```

# For Maintainers
Because this library is used as an npm package, you must remember to commit changes to index.js and index.js.map, and any other files that changed as the result of building the application (e.g. **/*.d.ts)

Also, remember to retain the copyright headers in those build products (they currently need to be restored "by hand")

## Develop your app with local version of zlux-widgets - Option 1 Linking
If you want to develop the Zowe Widgets and your own app simultaneously, you can do the following:

### Part I- How to link

#### Add npm symlink 
Note: @zlux/widgets is package name in package.json
```
cd zlux-widgets
npm link 
```
#### Replace dependency in your app
```
cd my-app/webClient
npm link @zlux/widgets
```

### Part II - Back to normal, how to delink

#### Remove Dependency link
```
cd my-app/webClient
npm unlink
```

#### Delete npm symlink

```
cd zlux-widgets
npm uninstall
```

## Develop your app with local version of Zowe Widgets - Option 2 Local path
An alternative to option 1 is to use a local path.

#### Add local path of built zlux-widgets
Change the package.json of your app to point to the local path of the built zlux-widgets. For example in package.json,
```
[...]
"@zlux/widgets": "file://../../your-local-path/zlux-widgets",
[...]
```
## Develop your app with local version of zlux-widgets - Option 3 Git path
Change the package.json of your app to point to the Git repo & branch. Your Git repo may also be your fork. For example in package.json,
```
[...]
"@zlux/widgets": "git+https://github.com/zowe/zlux-widgets.git#<your-branch>",
[...]
```


This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.
