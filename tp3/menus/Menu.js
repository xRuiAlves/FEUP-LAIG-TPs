/**
 * Menu
 * @constructor
 */
class Menu extends PrimitiveObject {
	constructor(scene, button_actions, backgroundTexturePath) {
		super(scene);

        this.menu_height = 2;
        this.menu_width = 3;
        this.button_spacing = 0.35;

        this.background = scene.primitive_factory.create({ 
            type: "plane", 
            npartsU: 20, 
            npartsV: 20 }
        );

        this.buttons = [];
        for (let button_action of button_actions) {
            this.buttons.push(new Button(scene, button_action));
        }

        this.initMaterials(backgroundTexturePath);
    };

    display() {
        this.scene.pushMatrix();
            this.scene.scale(this.menu_width, this.menu_height, 1);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.menu_material.apply();
            this.background.display();
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.menu_back_material.apply();
            this.background.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.translate(-this.menu_width/3, this.button_spacing/4, 0);
            for (let button of this.buttons) {
                button.display();
                this.scene.translate(0, -this.button_spacing, 0);
            }
        this.scene.popMatrix();
    }

    initMaterials(backgroundTexturePath) {
        let background_texture = new CGFtexture(this.scene, backgroundTexturePath);
        let background_back_texture = new CGFtexture(this.scene, "menus/resources/menuback.png");

        this.menu_material = new CGFappearance(this.scene);
        this.menu_material.setAmbient(0.15, 0.15, 0.15, 1);
        this.menu_material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.menu_material.setSpecular(0.3, 0.3, 0.3, 1);
        this.menu_material.setEmission(0, 0, 0, 1);
        this.menu_material.setShininess(25);
        this.menu_material.setTexture(background_texture);

        this.menu_back_material = new CGFappearance(this.scene);
        this.menu_back_material.setAmbient(0.15, 0.15, 0.15, 1);
        this.menu_back_material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.menu_back_material.setSpecular(0.3, 0.3, 0.3, 1);
        this.menu_back_material.setEmission(0, 0, 0, 1);
        this.menu_back_material.setShininess(25);
        this.menu_back_material.setTexture(background_back_texture);
    }
};