interface ScriptArguments {
  // Key 0
  command: string;
  // Key 1
  scriptPath: string;
  // Key 2
  workspacePath: string;
  // Key 4 - 5 depending on content or media script
  answers?: Answer;
  promptResponse?: string;
}

export interface MediaArguments extends ScriptArguments {
  // Key 3
  mediaPath: string;
}

export interface ContentArguments extends ScriptArguments {
  // Key 3
  filePath: string;
  // Key 4
  frontMatter: any;
}

export interface PlaceholderArguments extends ScriptArguments {
  // Key 3
  filePath: string;
  // Key 4
  title: string;
}

export interface Answer {
  [key: string]: string;
}
