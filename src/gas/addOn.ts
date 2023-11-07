export interface AddOnInterface {
  initUi: () => GoogleAppsScript.Base.Ui;
  addToMenu: (menu: GoogleAppsScript.Base.Menu) => void;
}

export interface UniversalMenuInterface {
  addToMenu: (menu: GoogleAppsScript.Base.Menu) => void;
}

const universalMenu: UniversalMenuInterface = {
  addToMenu(menu: GoogleAppsScript.Base.Menu) {
    menu.addItem("Show Dialog", "showDialog");
    menu.addItem("Show Sidebar", "showSidebar");
  },
};

export function getAddOnEnvironment():
  | "Slides"
  | "Docs"
  | "Sheets"
  | "Forms"
  | "Unknown" {
  try {
    SlidesApp.getUi();
    return "Slides";
  } catch (err) {}

  try {
    DocumentApp.getUi();
    return "Docs";
  } catch (err) {}

  try {
    SpreadsheetApp.getUi();
    return "Sheets";
  } catch (err) {}

  try {
    FormApp.getUi();
    return "Forms";
  } catch (err) {}

  return "Unknown";
}

export function onOpen(e: any): void {
  // Call all registered AddOn onOpen methods...
  let ui: GoogleAppsScript.Base.Ui;
  let menu: GoogleAppsScript.Base.Menu;
  let specificAddOn: AddOnInterface;
  let addOnType = getAddOnEnvironment();
  if (addOnType == "Forms") {
    specificAddOn = {
      initUi() {
        return FormApp.getUi();
      },
      addToMenu(menu: GoogleAppsScript.Base.Menu) {},
    };
  }
  if (specificAddOn) {
    ui = specificAddOn.initUi();
    let menu = ui.createAddonMenu();
    specificAddOn.addToMenu(menu);
    universalMenu.addToMenu(menu);
    menu.addToUi();
  }
}

export function onInstall(e) {
  // Call all registered AddOn onInstall methods
}
