import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertDrupalbreaks from './insertDrupalbreaks';
export default class DrupalbreaksEditing extends Plugin {
  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register("drupalbreaks", {
      allowWhere: "block",
      isInline: true,
    });
  }
  static get requires() {
    return [Widget];
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

        return toWidget(container, viewWriter, { label: 'drupalbreaks widget' });
      },
    });
  }

}




