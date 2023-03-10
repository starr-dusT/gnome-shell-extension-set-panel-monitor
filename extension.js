/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const Gio = imports.gi.Gio;
const St = imports.gi.St;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const LM = Main.layoutManager;
//const MT = Main.messageTray;

class Extension {
    constructor() {
        this._index = null;
    }

    _setPanel() {
        this._index = this.settings.get_int('monitor-index');
        for (const monitor of LM.monitors){
            if (monitor.index == this._index){
                this.set_panel(monitor)
            }
        }
    }

    enable() {
        log(`enabling ${Me.metadata.name}`);
        this.settings = ExtensionUtils.getSettings(
            'org.gnome.shell.extensions.gnome-panel-to-monitor');
        this.settings.connect('changed::' + 'monitor-index', this._setPanel.bind(this))
//      this._sessionId = Main.sessionMode.connect('updated', this._setPanel.bind(this));
//      this._ws_active_changed = global.workspace_manager.connect('active-workspace-changed', this._setPanel.bind(this));
//      this._original_getDraggableWindowForPosition = Main.panel._getDraggableWindowForPosition;
//      this._setPanel();
//      this.patch_getDraggableWindowForPosition();
    }

    disable() {
        log(`disabling ${Me.metadata.name}`);
//      if (this._sessionId) {
//          Main.sessionMode.disconnect(this._sessionId);
//          Main.panel._getDraggableWindowForPosition = this._original_getDraggableWindowForPosition;
//      }
        this.set_panel(LM.primaryMonitor);
    }

    set_panel(monitor) {
        LM.panelBox.set_position(monitor.x, monitor.y);
		LM.panelBox.set_size(monitor.width, -1);
		LM.panelBox.visible = true;
    }

//	patch_getDraggableWindowForPosition() {
//		const patches = [
//			{ from: 'metaWindow.is_on_primary_monitor()', to: 'true' },
//		];
//
//		const { Meta } = imports.gi; // used in _getDraggableWindowForPosition(), do not remove
//
//		let func = this._original_getDraggableWindowForPosition.toString();
//		for (const { from, to } of patches) {
//			func = func.replaceAll(from, to);
//		}
//
//		func = func.replace('_getDraggableWindowForPosition(', 'function(');
//		eval(`Main.panel._getDraggableWindowForPosition = ${func}`);
//	}
}

function init() {
    log(`initializing ${Me.metadata.name}`);
    return new Extension();
}
