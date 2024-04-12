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
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
const LM = Main.layoutManager;

export default class PlainExampleExtension extends Extension {

    _setPanel(monitor) {
        LM.panelBox.set_position(monitor.x, monitor.y);
		LM.panelBox.set_size(monitor.width, -1);
		LM.panelBox.visible = true;
    }

    _movePanel() {
        let monitorIndex = this.settings.get_int('monitor-index');
        for (const monitor of LM.monitors){
            if (monitor.index == monitorIndex){
                this._setPanel(monitor)
            }
        }
    }

    enable() {
        this.settings = this.getSettings('org.gnome.shell.extensions.gnome-set-panel-monitor');
        this.settings.connect('changed::' + 'monitor-index', this._movePanel.bind(this))
        this._movePanel();
    }

    disable() {
        this._setPanel(LM.primaryMonitor);
    }
}

function init() {
    return new Extension();
}
