import menu from "./menu.js";

function initializePageFromMenu(menu) {
  createButtonsFromMenu(menu);
  displayMenuItems(menu);
}

function displayMenuItems(menu, filter = "All") {
  const filterdMenu = menu.filter((menuItem) =>
    filter == "All" ? true : filter == menuItem.category
  );
  const menuItemElements = createMenuItemElements(filterdMenu);
  const sectionCenter = document.querySelector(".section-center.row");

  // clear existing items
  sectionCenter.innerHTML = "";

  menuItemElements.forEach((menuItem) => {
    sectionCenter.appendChild(menuItem);
  });
}

function createMenuItemElements(menu, filter) {
  const menuItemElements = menu.map((menuItem) => {
    const menuItemDisplay = document.createElement("div");
    menuItemDisplay.classList.add("menu-items");
    menuItemDisplay.classList.add("col-lg-6");
    menuItemDisplay.classList.add("col-sm-12");

    menuItemDisplay.appendChild(createMenuItemImage(menuItem));
    menuItemDisplay.appendChild(createMenuItemInfo(menuItem));

    return menuItemDisplay;
  });

  return menuItemElements;
}

function createMenuItemInfo(menuItem) {
  const menuItemInfo = document.createElement("div");

  menuItemInfo.classList.add("menu-info");

  menuItemInfo.appendChild(createMenuItemTitle(menuItem));
  menuItemInfo.appendChild(createMenuItemText(menuItem));

  return menuItemInfo;
}

function createMenuItemTitle(menuItem) {
  const menuItemTitle = document.createElement("div");

  menuItemTitle.classList.add("menu-title");

  const menuItemTitleName = document.createElement("h4");
  menuItemTitleName.textContent = menuItem.title;

  const menuItemTitlePrice = document.createElement("h4");
  menuItemTitlePrice.textContent = menuItem.price;
  menuItemTitlePrice.classList.add("price");

  menuItemTitle.appendChild(menuItemTitleName);
  menuItemTitle.appendChild(menuItemTitlePrice);

  return menuItemTitle;
}

function createMenuItemText(menuItem) {
  const menuItemText = document.createElement("div");
  menuItemText.textContent = menuItem.desc;
  menuItemText.classList.add("menu-text");

  return menuItemText;
}

function createMenuItemImage(menuItem) {
  const menuItemImage = document.createElement("img");

  menuItemImage.src = menuItem.img;
  menuItemImage.alt = menuItem.title;
  menuItemImage.classList.add("photo");

  return menuItemImage;
}

function createButtonsFromMenu(menu) {
  const buttonContainer = document.querySelector("div.btn-container");

  const uniqueCategories = getCategoriesFromMenu(menu);

  uniqueCategories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-outline-dark");
    button.classList.add("btn-item");
    button.textContent = category;

    addButtonEventListener(button, menu);

    buttonContainer.appendChild(button);
  });
}

function addButtonEventListener(buttonElement, menu) {
  buttonElement.addEventListener("click", function () {
    const filter = buttonElement.textContent;
    displayMenuItems(menu, filter);
  });
}

function getCategoriesFromMenu(menu) {
  const categories = [];

  const uniqueCategories = new Set(menu.map((menuItem) => menuItem.category));

  categories.push("All");
  categories.push(...uniqueCategories);

  return categories;
}

initializePageFromMenu(menu);
