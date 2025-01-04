import { MediaArguments } from "../models/ScriptArguments.js";
import { CustomScript } from "./CustomScript.js";

export class MediaScript extends CustomScript {
  /**
   * Retrieve the arguments passed to the script
   * @returns
   */
  public static getArguments(): MediaArguments | undefined {
    const args = process.argv;

    if (!args || args.length <= 0) {
      return undefined;
    }

    const command = args[0];
    const scriptPath = args[1];
    const workspacePath = args[2];
    const mediaPath = args[3];

    // Get all arguments after the file path
    const answerArgs = args.slice(4);
    const answers = answerArgs.reduce((acc, curr) => {
      const [key, value] = curr.split("=");
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    return {
      command,
      scriptPath,
      workspacePath,
      mediaPath,
      answers: Object.keys(answers).length > 0 ? answers : undefined,
    };
  }

  /**
   * Copies the metadata from the source file to the destination file.
   * @param sourcePath - The path of the source file.
   * @param destinationPath - The path of the destination file.
   */
  public static copyMetadata(
    sourcePath: string,
    destinationPath: string
  ): void {
    console.log(
      JSON.stringify({
        fmAction: "copyMediaMetadata",
        fmSourcePath: sourcePath,
        fmDestinationPath: destinationPath,
      })
    );
  }

  /**
   * Copies the metadata from the source file to the destination file and deletes the source file.
   * @param sourcePath - The path of the source file.
   * @param destinationPath - The path of the destination file.
   */
  public static copyMetadataAndDelete(
    sourcePath: string,
    destinationPath: string
  ): void {
    console.log(
      JSON.stringify({
        fmAction: "copyMediaMetadataAndDelete",
        fmSourcePath: sourcePath,
        fmDestinationPath: destinationPath,
      })
    );
  }

  /**
   * Deletes a media file.
   * @param filePath - The path of the file to be deleted.
   */
  public static delete(filePath: string): void {
    console.log(
      JSON.stringify({
        fmAction: "deleteMedia",
        fmPath: filePath,
      })
    );
  }
}
