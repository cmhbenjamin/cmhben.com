<p align="center">
  <a href="https://frontmatter.codes">
    <img alt="Front Matter" src="https://eliostruyf.gallerycdn.vsassets.io/extensions/eliostruyf/vscode-front-matter/8.3.0/1676389253876/Microsoft.VisualStudio.Services.Icons.Default">
  </a>
</p>

# Front Matter CMS - Extensibility module

This module provides a way to extend the CMS its UI with custom functionality, and it provides helpers for creating your custom content or media scripts.

## Custom scripts

To make it easier to create your custom scripts, you can make use of the `@frontmatter/extensibility` module its `ContentScript`, `MediaScript`, and `PlaceholderScript` classes.

### Content scripts

If you want to write a script for content management in Front Matter CMS, you can make use of the `ContentScript` class. This class provides methods to retrieve the arguments, ask questions, and let the script know its done.

#### Get arguments

To retrieve all arguments, you can use the `getArguments` method.

```js
import { ContentScript } from '@frontmatter/extensibility';

const { command, scriptPath, workspacePath, filePath, frontMatter, answers } = ContentScript.getArguments();
```

#### Ask questions

To ask a question to the user in the CMS, you can use the `askQuestions` method:

```js
if (!answers) {
  MediaScript.askQuestions([{
    name: "customId",
    message: "Which ID do you want to use?",
    default: ""
  }]);
  return;
}
```

In case you want to have a multi-select question, you can just add the options to the question:

```js
if (!answers) {
  MediaScript.askQuestions([{
    name: "category",
    message: "Which category do you want to use?",
    options: [
      "Category 1",
      "Category 2",
      "Category 3"
    ]
  }]);
  return;
}
```

> **Important**: Front Matter will execute the same script, so you first need to check if the answers were provided.

You can retrieve the answer from the `answers` object:

```js
const customId = answers.customId;
```

#### Update front matter

To let the CMS know you want to update the article its front matter, you can make use of the `updateFrontMatter` method:

```js
ContentScript.updateFrontMatter({
  "field": "value"
});
```

#### Open a file or page on completion

To let the CMS know you want to open a file or page after the script is done, you can make use of the `open` method:

```js
// Open a URL
ContentScript.open("https://frontmatter.codes");

// Or open a file
ContentScript.open("./path/to/file.md");
```

#### Done

To let the CMS know you are done with your script, you can make use of the `done` method:

```js
ContentScript.done("The script is done");
```

### Media scripts

The `MediaScript` class provides the same functionality as the `ContentScript` class, but it is used for media management scripts. There are a couple differences:

- Arguments will not provide the `frontMatter` object;
- You cannot make use of the `updateFrontMatter` method.

Additionally, they provide the following methods:

- `MediaScript.copyMetadata(source, destination)`: This method will copy the metadata from the source file to the destination file.
- `MediaScript.copyMetadataAndDelete(source, destination)`; This method will copy the metadata from the source file to the destination file and delete the source file.
- `MediaScript.delete(source)`: This method will delete the source file.

### Placeholder scripts

The `PlaceholderScript` class provides the same functionality as the `ContentScript` class, but it is used for placeholders which can be used on content creation. The main difference between the `ContentScript` and `PlaceholderScript` is that it will not provide the `frontMatter` object. Instead it returns the `title` of the page.

## UI extensibility

### Content dashboard

Card extensibility points:

- Image
- Footer

*Extension version 9.0.0 and higher*:

- Draft status
- Date
- Title
- Description
- Tags

### Panel

- Custom panel view
- Custom fields

## Usage

You can make use of ESM modules in order to make use of the extensibility dependency. We recommend to use the CDN from [Skypack](https://www.skypack.dev/) or [jsdelivr](https://www.jsdelivr.com/).

URLs:

- `https://cdn.skypack.dev/@frontmatter/extensibility`
- `https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm`
- `https://esm.run/@frontmatter/extensibility`

### Development mode

Turn on the development mode in order to quickly reload the webviews (panel + dashboard) when you make changes to the code.

```js
import { enableDevelopmentMode } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

enableDevelopmentMode();
```

### Registering a card image

```js
import { registerCardImage } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardImage(async (filePath, metadata) => {
  return `<span>Your HTML</span>`;
});
```

### Registering the card draft status

```js
import { registerCardStatus } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardStatus(async (filePath, metadata) => {
  return `<span>Your HTML</span>`;
});
```

### Registering the card date

```js
import { registerCardDate } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardDate(async (filePath, metadata) => {
  return `<span>Your HTML</span>`;
});
```

### Registering the card title

```js
import { registerCardTitle } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardTitle(async (filePath, metadata) => {
  return `<span>Your HTML</span>`;
});
```

### Registering the card description

```js
import { registerCardDescription } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardDescription(async (filePath, metadata) => {
  return `<span>Your HTML</span>`;
});
```

### Registering the card tags

```js
import { registerCardTags } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardTags(async (filePath, metadata) => {
  return `<span>Your HTML</span>`;
});
```

### Registering a card footer

```js
import { registerCardFooter } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

/**
 * @param {string} filePath - The path of the file
 * @param {object} data - The metadata of the file
 * @returns {string} - The HTML to be rendered in the card footer
 */
registerCardFooter(async (filePath, metadata) => {
  return `<span>Your HTML</span>`;
});
```

### Registering a panel view

```js
import { registerPanelView } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

/**
 * @param {object} data - The metadata of the file
 * @returns {object} - The view to be rendered in the panel
 */
registerPanelView(async (metadata) => {
  return {
    title: "Custom View",
    content: `
      <div>
        <h1>Custom view...</h1>
        <p>Here you can add your own custom view.</p>
      </div>
    `,
  };
});
```

### Registering a custom field

The following example makes use of [lit](https://lit.dev/) to render a custom field, by creating a web component, it makes it easier to have more control over the field.

```js
import { registerCustomField } from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";
import { css, html, LitElement } from "https://esm.run/lit";

let CustomFieldValueChange;

class CustomField extends LitElement {
  static styles = css`
    input {
      border: 1px solid transparent;
      box-sizing: border-box;
      font-family: var(--vscode-font-family);
      padding: var(--input-padding-vertical) var(--input-padding-horizontal);
      color: var(--vscode-input-foreground);
      outline: none;
      background-color: var(--vscode-input-background);
      width: 100%;
    }

    input:focus {
      border: 1px solid var(--vscode-inputValidation-infoBorder);
    }
  `;

  static properties = {
    inputValue: {
      type: String,
    },
  };

  constructor() {
    super();
    this.inputValue = "";
  }

  _internalChange(e) {
    this.inputValue = e.target.value;
    CustomFieldValueChange(e.target.value);
  }

  render() {
    return html`
      <input
        type="text"
        value="${this.inputValue}"
        @change=${(e) => this._internalChange(e)}
      />
    `;
  }
}
customElements.define("custom-field", CustomField);

/**
 * @param {string} name - The name of the custom field to use in the content-type
 * @param {function} callback - The callback that will be used for rendering the custom field
 */
registerCustomField("customField", async (value, onChange) => {
  // Bind the event handler for the onChange evet
  CustomFieldValueChange = onChange;
  // Return the HTML of the custom field
  return `
    <custom-field inputValue="${value || ""}"></custom-field>
  `;
});
```

## Issues

Please report any issues you find in the [Front Matter CMS issue list](https://github.com/estruyf/vscode-front-matter/issues).
