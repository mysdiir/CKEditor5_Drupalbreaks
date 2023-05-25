/**
 * @file registers the drupalbreaks toolbar button and binds functionality to it.
 */

import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import icon from '../../../../icons/simpleBox.svg';

export default class DrupalbreaksUI extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('drupalbreaks', (locale) => {
      const command = editor.commands.get('insertDrupalbreaks');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: editor.t('Drupalbreaks'),
        icon,
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

