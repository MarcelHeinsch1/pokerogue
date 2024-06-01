import BattleScene from "../battle-scene";
import { EggHatchPhase } from "../egg-hatch-phase";
import { Mode } from "./ui";
import UiHandler from "./ui-handler";
import {Button} from "../enums/buttons";

/**
 * Handles the UI for the Egg Hatching Scene.
 * Manages the display and interaction of the egg hatching process.
 */
export default class EggHatchSceneHandler extends UiHandler {
  /** Container to hold all elements related to the egg hatching scene */
  public eggHatchContainer: Phaser.GameObjects.Container;

  /**
   * Constructs a new EggHatchSceneHandler.
   * @param scene The current BattleScene.
   */
  constructor(scene: BattleScene) {
    super(scene, Mode.EGG_HATCH_SCENE);
  }

  /**
   * Sets up the UI elements for the egg hatching scene.
   * This method initializes the container for the egg hatching elements
   * and prepares the necessary animations.
   */
  setup() {
    // Create a container for the egg hatching scene elements and position it
    this.eggHatchContainer = this.scene.add.container(0, -this.scene.game.canvas.height / 6);

    // Add the container to the fieldUI
    this.scene.fieldUI.add(this.eggHatchContainer);

    // Generate animation frames for the egg light rays
    const eggLightraysAnimFrames = this.scene.anims.generateFrameNames("egg_lightrays", { start: 0, end: 3 });

    // If the animation does not already exist, create it
    if (!(this.scene.anims.exists("egg_lightrays"))) {
      this.scene.anims.create({
        key: "egg_lightrays",
        frames: eggLightraysAnimFrames,
        frameRate: 32
      });
    }
  }

  /**
   * Shows the UI elements for the egg hatching scene.
   * @param _args Arguments passed to the show method.
   * @returns boolean Always returns true.
   */
  show(_args: any[]): boolean {
    super.show(_args);

    this.getUi().showText(null, 0);

    this.scene.setModifiersVisible(false);

    return true;
  }

  /**
   * Processes input during the egg hatching scene.
   * @param button The button that was pressed.
   * @returns boolean True if the input was handled, otherwise false.
   */
  processInput(button: Button): boolean {
    // Tries to skip the animation upon pressing action or cancel
    if (button === Button.ACTION || button === Button.CANCEL) {
      const phase = this.scene.getCurrentPhase();

      if (phase instanceof EggHatchPhase && phase.trySkip()) {
        return true;
      }
    }

    return this.scene.ui.getMessageHandler().processInput(button);
  }

  /**
   * Sets the cursor position (not used in this handler).
   * @param _cursor The cursor index.
   * @returns boolean Always returns false.
   */
  setCursor(_cursor: integer): boolean {
    return false;
  }

  /**
   * Clears the UI elements for the egg hatching scene.
   * Removes all elements from the container and hides any tooltips.
   */
  clear() {
    super.clear();
    this.eggHatchContainer.removeAll(true);
    this.getUi().hideTooltip();
  }
}
