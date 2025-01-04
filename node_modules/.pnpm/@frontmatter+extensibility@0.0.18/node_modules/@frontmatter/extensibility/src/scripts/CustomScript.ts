import { Question } from "../models/Question.js";

export abstract class CustomScript {
  /**
   * Call this method to ask questions to the user
   * @param questions
   */
  public static askQuestions(questions: Question[]): void {
    console.log(
      JSON.stringify({
        questions: questions,
      })
    );
  }

  /**
   * Call this method to prompt GitHub Copilot
   * @param prompt
   */
  public static promptCopilot(prompt: string): void {
    console.log(
      JSON.stringify({
        fmAction: "promptCopilot",
        fmPrompt: prompt,
      })
    );
  }

  /**
   * Opens a file or page once the script has finished.
   * @param fileOrPagePath - The path of the file or page to open.
   */
  public static open(fileOrPagePath: string): void {
    console.log(
      JSON.stringify({
        fmAction: "open",
        fmPath: fileOrPagePath,
      })
    );
  }

  /**
   * Call this method to indicate that the script has finished.
   * @param log
   */
  public static done(log: string): void {
    console.log(log);
  }
}
