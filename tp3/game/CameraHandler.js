class CameraHandler {
    static setScene(scene) {
        this.scene = scene;
    }

    static update(delta_time) {
        if (this.rotationAmount > 0) {
            let amount = Math.min(this.speed * this.speed_multiplier * delta_time, this.rotationAmount);
            this.rotate(amount);
            this.rotationAmount -= amount;
        }
    }

    static rotate(angle) {
        this.scene.camera.orbit(CGFcameraAxis.y, angle);
    }

    static swapPlayer(player_type) {
        this.speed_multiplier = 1.0;

        if (player_type === this.curr_player) {
            // No need to rotate, already in the right position
            return;
        }
        
        // Only engage motion if no motion is ongoing
        if (!this.rotationAmount > 0) {
            this.curr_player = player_type;
            this.rotationAmount = Math.PI;
        }    
    }

    static menuRotation() {
        this.speed_multiplier = 2.5;
        this.rotationAmount = Math.PI * 2;
    }

    static isMoving() {
        return this.rotationAmount > 0;
    }

    static moveToPlayerPosition() {
        this.rotate((this.curr_player - 1) * Math.PI);
    }

    static get zoom_amount() {
        return this.last_zoom;
    }

    static zoomTo(amount) {
        this.scene.camera.zoom(-this.last_zoom);
        this.scene.camera.zoom(amount);
        this.last_zoom = amount;
    }
}

CameraHandler.rotationAmount = 0;
CameraHandler.speed = Math.PI/2e3;
// The camera starts in the white player
CameraHandler.curr_player = 1;
CameraHandler.last_zoom = 0;