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
  /** {@linkcode Container} to hold all elements related to the egg hatching scene */
  public eggHatchContainer: Phaser.GameObjects.Container;

  /**
   * Constructs a new {@linkcode EggHatchSceneHandler}.
   * @param scene The current {@linkcode BattleScene}.
   */
  constructor(scene: BattleScene) {
    super(scene, Mode.EGG_HATCH_SCENE);
  }

  /**
   * Sets up the UI elements for the egg hatching scene in the {@linkcode eggHatchContainer}.
   */
  setup() {
    this.eggHatchContainer = this.scene.add.container(0, -this.scene.game.canvas.height / 6);

    this.scene.fieldUI.add(this.eggHatchContainer);

    const eggLightraysAnimFrames = this.scene.anims.generateFrameNames("egg_lightrays", { start: 0, end: 3 });

    if (!(this.scene.anims.exists("egg_lightrays"))) {
      this.scene.anims.create({
        key: "egg_lightrays",
        frames: eggLightraysAnimFrames,
        frameRate: 32
      });
    }
  }


  show(_args: any[]): boolean {
    super.show(_args);
    this.getUi().showText(null, 0);
    this.scene.setModifiersVisible(false);
    return true;
  }

  /**
   * Processes input during the egg hatching scene.
   * @param button  The {@linkcode Button} that was pressed.
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

  setCursor(_cursor: integer): boolean {
    return false;
  }

  /**
   * Clears the Handler and Container
   */
  clear() {
    super.clear();
    this.eggHatchContainer.removeAll(true);
    this.getUi().hideTooltip();
  }
}
