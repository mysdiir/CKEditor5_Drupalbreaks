/**
 * @file defines InsertDrupalbreaks, which is executed when the simpleBox
 * toolbar button is pressed.
 */
// cSpell:ignore simpleboxediting

import { Command } from 'ckeditor5/src/core';

export default class InsertDrupalbreaks extends Command {

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





