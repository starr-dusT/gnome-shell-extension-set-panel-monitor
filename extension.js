const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const LM = Main.layoutManager;

class Extension {

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
        log(`enabling ${Me.metadata.name}`);
        this.settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.gnome-set-panel-monitor');
        this.settings.connect('changed::' + 'monitor-index', this._movePanel.bind(this))
        this._movePanel();
    }

    disable() {
        log(`disabling ${Me.metadata.name}`);
        this._setPanel(LM.primaryMonitor);
    }
}

function init() {
    log(`initializing ${Me.metadata.name}`);
    return new Extension();
}
