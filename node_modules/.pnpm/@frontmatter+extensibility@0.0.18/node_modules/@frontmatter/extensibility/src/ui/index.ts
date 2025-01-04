import { PanelViewResult } from "../models/PanelViewResult.js";

// Development mode
export const enableDevelopmentMode = () => {
  window.fmExternal = window.fmExternal || {};
  window.fmExternal.isDevelopment = true;
};

// Dashboard
/**
 * Register a card image renderer
 * @param cb
 */
export const registerCardImage = (
  cb: (filePath: string, metadata: any) => Promise<string>
) => {
  window.fmExternal = window.fmExternal || {};

  window.fmExternal.getCardImage = cb;
};

/**
 * Register a card footer renderer
 * @param cb
 */
export const registerCardFooter = (
  cb: (filePath: string, metadata: any) => Promise<string>
) => {
  window.fmExternal = window.fmExternal || {};

  window.fmExternal.getCardFooter = cb;
};

// Panel

/**
 * Register a panel view renderer
 * @param cb
 */
export const registerPanelView = (
  cb: (metadata: any) => Promise<PanelViewResult | undefined>
) => {
  window.fmExternal = window.fmExternal || {};

  window.fmExternal.getPanelView = cb;
};

/**
 * Register a custom field
 * @param name
 * @param cb
 */
export const registerCustomField = (name: string, cb: any) => {
  window.fmExternal = window.fmExternal || {};
  window.fmExternal.getCustomFields = window.fmExternal.getCustomFields || [];

  const fieldRef = window.fmExternal.getCustomFields.find(
    (x) => x.name === name
  );
  if (fieldRef) {
    fieldRef.html = cb;
  } else {
    window.fmExternal.getCustomFields.push({ name, html: cb });
  }
};

/**
 * Register a card title renderer
 * @param cb
 * @since 8.5.0
 */
export const registerCardTitle = (
  cb: (filePath: string, metadata: any) => Promise<string>
) => {
  window.fmExternal = window.fmExternal || {};

  window.fmExternal.getCardTitle = cb;
};

/**
 * Register a card description renderer
 * @param cb
 * @since 8.5.0
 */
export const registerCardDescription = (
  cb: (filePath: string, metadata: any) => Promise<string>
) => {
  window.fmExternal = window.fmExternal || {};

  window.fmExternal.getCardDescription = cb;
};

/**
 * Register a card tags renderer
 * @param cb
 * @since 8.5.0
 */
export const registerCardTags = (
  cb: (filePath: string, metadata: any) => Promise<string[]>
) => {
  window.fmExternal = window.fmExternal || {};

  window.fmExternal.getCardTags = cb;
};

/**
 * Register a card date renderer
 * @param cb
 * @since 8.5.0
 */
export const registerCardDate = (
  cb: (filePath: string, metadata: any) => Promise<string>
) => {
  window.fmExternal = window.fmExternal || {};

  window.fmExternal.getCardDate = cb;
};

/**
 * Register a card status renderer
 * @param cb
 * @since 8.5.0
 */
export const registerCardStatus = (
  cb: (filePath: string, metadata: any) => Promise<string>
) => {
  window.fmExternal = window.fmExternal || {};

  window.fmExternal.getCardStatus = cb;
};
