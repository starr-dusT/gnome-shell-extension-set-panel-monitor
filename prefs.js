'use strict';

const { Adw, Gio, Gtk } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();


function init() {
}

function fillPreferencesWindow(window) {

    const settings = ExtensionUtils.getSettings(
        'org.gnome.shell.extensions.gnome-set-panel-monitor');
    
    const page = new Adw.PreferencesPage();
    const group = new Adw.PreferencesGroup();
    page.add(group);

    const row = new Adw.ActionRow({ title: 'Set Monitor Index for Panel' });
    group.add(row);

    const button = new Gtk.SpinButton({
        adjustment: new Gtk.Adjustment({
            lower: 0,
            upper: 999,
            step_increment: 1
        })
    });

    settings.bind(
        'monitor-index',
        button,
        'value',
        Gio.SettingsBindFlags.DEFAULT
    );

    row.add_suffix(button);
    row.activatable_widget = button;
    window.add(page);
}
