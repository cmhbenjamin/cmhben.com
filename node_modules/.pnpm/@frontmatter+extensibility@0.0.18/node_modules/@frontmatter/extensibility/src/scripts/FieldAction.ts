import { ContentArguments } from "../models/ScriptArguments.js";
import { getArguments } from "../utils/getArguments.js";
import { CustomScript } from "./CustomScript.js";

export class FieldAction extends CustomScript {
  /**
   * Retrieve the arguments passed to the script
   * @returns
   */
  public static getArguments = (): ContentArguments | undefined =>
    getArguments();

  /**
   * Updates the field value
   *
   * @param fieldValue - The new value for the field.
   */
  public static update(fieldValue: any): void {
    console.log(
      JSON.stringify({
        fmAction: "fieldAction",
        fmFieldValue: fieldValue,
      })
    );
  }
}
