document.addEventListener('DOMContentLoaded', () => {
  // menu
  const hamburger = document.querySelector('.js-hamburger');
  const drawer = document.getElementById('js-drawer');
  const drawerCloseButton = document.querySelector('.js-drawer-close');
  const showDrawer = () => {
    if (drawer.open) {
      drawer.close();
    }
    drawer.setAttribute('data-active', 'true');
    drawer.showModal();
  };
  const hideDrawer = () => {
    drawer.setAttribute('data-active', 'false');
    drawer.close();
  };
  hamburger.addEventListener('click', showDrawer);
  drawerCloseButton.addEventListener('click', hideDrawer);
});
