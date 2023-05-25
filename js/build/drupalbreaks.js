(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CKEditor5"] = factory();
	else
		root["CKEditor5"] = root["CKEditor5"] || {}, root["CKEditor5"]["drupalbreaks"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "ckeditor5/src/core.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__("dll-reference CKEditor5.dll"))("./src/core.js");

/***/ }),

/***/ "ckeditor5/src/ui.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__("dll-reference CKEditor5.dll"))("./src/ui.js");

/***/ }),

/***/ "ckeditor5/src/widget.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__("dll-reference CKEditor5.dll"))("./src/widget.js");

/***/ }),

/***/ "dll-reference CKEditor5.dll":
/***/ ((module) => {

"use strict";
module.exports = CKEditor5.dll;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// EXTERNAL MODULE: delegated ./core.js from dll-reference CKEditor5.dll
var delegated_corefrom_dll_reference_CKEditor5 = __webpack_require__("ckeditor5/src/core.js");
// EXTERNAL MODULE: delegated ./widget.js from dll-reference CKEditor5.dll
var delegated_widgetfrom_dll_reference_CKEditor5 = __webpack_require__("ckeditor5/src/widget.js");
;// CONCATENATED MODULE: ./js/ckeditor5_plugins/drupalbreaks/src/insertDrupalbreaks.js
/**
 * @file defines InsertDrupalbreaks, which is executed when the simpleBox
 * toolbar button is pressed.
 */
// cSpell:ignore simpleboxediting



class InsertDrupalbreaks extends delegated_corefrom_dll_reference_CKEditor5.Command {

  execute() {
    const {model} = this.editor;
    model.change((writer) => {
      model.insertContent(createDrupalbreaks(writer));
    });
  }

  refresh() {
    const {model} = this.editor;
    const {selection} = model.document;

    const allowedIn = model.schema.findAllowedParent(
        selection.getFirstPosition(),
        'drupalbreaks',
    );

    this.isEnabled = allowedIn !== null;
  }
}
  function createDrupalbreaks(writer) {
    const drupalbreaks = writer.createElement('drupalbreaks');
    return drupalbreaks;
  }






;// CONCATENATED MODULE: ./js/ckeditor5_plugins/drupalbreaks/src/drupalbreaksEditing.js




class DrupalbreaksEditing extends delegated_corefrom_dll_reference_CKEditor5.Plugin {
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register("drupalbreaks", {
      allowWhere: "block",
      isInline: true,
    });
  }
  static get requires() {
    return [delegated_widgetfrom_dll_reference_CKEditor5.Widget];
  }
  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
        'insertDrupalbreaks',
        new InsertDrupalbreaks(this.editor),
    );
  }
  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('drupalbreaks', {
      isObject: true,
      allowWhere: '$text',
      isInline: true,
    });
    schema.addChildCheck((context, childDefinition) => {
      if (
          context.endsWith('drupalbreaks') &&
          childDefinition.name === 'drupalbreaks'
      ) {
        return false;
      }
    });
  }
  _defineConverters() {
    const {conversion} = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'drupalbreaks',
      view: {
        name: 'drupalbreaks',
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'drupalbreaks',
      view: {
        name: 'drupalbreaks',
      }

    });

    conversion.for('editingDowncast').elementToElement({
      model: 'drupalbreaks',
      view: (modelElement, { writer: viewWriter }) => {
        const container = viewWriter.createContainerElement('div', {
          class: 'drupalbreaks',
          style: ' display: block; ' +
              ' height: 5px; ' +
              ' border-top: 1px dotted red; ' +
              ' border-bottom: 1px dotted red; '
        });

        return (0,delegated_widgetfrom_dll_reference_CKEditor5.toWidget)(container, viewWriter, { label: 'drupalbreaks widget' });
      },
    });
  }

}





// EXTERNAL MODULE: delegated ./ui.js from dll-reference CKEditor5.dll
var delegated_uifrom_dll_reference_CKEditor5 = __webpack_require__("ckeditor5/src/ui.js");
;// CONCATENATED MODULE: ./icons/simpleBox.svg
/* harmony default export */ const simpleBox = ("<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1.95154 2.84131C1.95154 2.28902 2.39925 1.84131 2.95154 1.84131H17.0484C17.6007 1.84131 18.0484 2.28902 18.0484 2.84131V17.1588C18.0484 17.7111 17.6007 18.1588 17.0484 18.1588H2.95154C2.39925 18.1588 1.95154 17.7111 1.95154 17.1588V2.84131ZM3.5116 8.10129H16.4926V15.3194C16.4926 15.8717 16.0449 16.3194 15.4926 16.3194H4.5116C3.95931 16.3194 3.5116 15.8717 3.5116 15.3194V8.10129ZM4.44415 3.81676C3.89187 3.81676 3.44415 4.26447 3.44415 4.81676V6.35087H16.4316V4.81676C16.4316 4.26447 15.9838 3.81676 15.4316 3.81676H4.44415Z\" fill=\"black\"/></svg>\n");
;// CONCATENATED MODULE: ./js/ckeditor5_plugins/drupalbreaks/src/drupalbreaksUI.js
/**
 * @file registers the simpleBox toolbar button and binds functionality to it.
 */





class DrupalbreaksUI extends delegated_corefrom_dll_reference_CKEditor5.Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('drupalbreaks', (locale) => {
      const command = editor.commands.get('insertDrupalbreaks');
      const buttonView = new delegated_uifrom_dll_reference_CKEditor5.ButtonView(locale);

      buttonView.set({
        label: editor.t('Drupalbreaks'),
        icon: simpleBox,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () =>
          editor.execute('insertDrupalbreaks'),
      );

      return buttonView;
    });
  }

}


;// CONCATENATED MODULE: ./js/ckeditor5_plugins/drupalbreaks/src/Drupalbreaks.js
/**
 * @file This is what CKEditor refers to as a master (glue) plugin. Its role is
 * just to load the “editing” and “UI” components of this Plugin. Those
 * components could be included in this file, but
 *
 * I.e, this file's purpose is to integrate all the separate parts of the plugin
 * before it's made discoverable via index.js.
 */





class Drupalbreaks extends delegated_corefrom_dll_reference_CKEditor5.Plugin {
  static get requires() {
    return [DrupalbreaksEditing, DrupalbreaksUI];
  }
}

;// CONCATENATED MODULE: ./js/ckeditor5_plugins/drupalbreaks/src/index.js
/**
 * @file The build process always expects an index.js file. Anything exported
 * here will be recognized by CKEditor 5 as an available plugin. Multiple
 * plugins can be exported in this one file.
 *
 * I.e. this file's purpose is to make plugin(s) discoverable.
 */



/* harmony default export */ const src = ({
  Drupalbreaks: Drupalbreaks,
});

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});