import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class Preferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    // Make sure the window doesn't outlive the settings object
    window._settings = this.getSettings();
  
    const page = this._createpage(window);
    window.add(page);
  }
    
  _createpage(window) {
    const page = new Adw.PreferencesPage();
    const group = new Adw.PreferencesGroup();
    page.add(group);

    const row = this._createMaximizedNumberRow(window);
    group.add(row);
    return page;
  }

  _createMaximizedNumberRow(window) {
    const row = new Adw.ActionRow({ title: 'Set Monitor Index for Panel' });
    const button = new Gtk.SpinButton({
      adjustment: new Gtk.Adjustment({
            lower: 0,
            upper: 999,
            step_increment: 1
        })
    });

    window._settings.bind(
        'monitor-index',
        button,
        'value',
        Gio.SettingsBindFlags.DEFAULT
    );

    row.add_suffix(button);
    row.activatable_widget = button;
    return row;
  }
}
