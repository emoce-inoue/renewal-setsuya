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

  // メニュークリック時、ページ内リンクのためにメニューを閉じる
  const menuItem = document.querySelectorAll('.js-menu-link');
  menuItem.forEach((link) => {
    if (link) {
      link.addEventListener('click', hideDrawer);
    }
  });

  // swiper
  let swiperInstance = null;
  const initializeSwiper = () => {
    if (!swiperInstance) {
      /*global Swiper*/
      swiperInstance = new Swiper('.swiper', {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 24,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      });
    }
  };

  const destroySwiper = () => {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  };

  const handleResponsive = () => {
    if (window.matchMedia('(max-width: 920px)').matches) {
      initializeSwiper();
    } else {
      destroySwiper();
    }
  };

  handleResponsive();
  window.addEventListener('resize', handleResponsive);

  // simulation
  const genderButtons = document.querySelectorAll('.l-simulation__input--gender');
  genderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      genderButtons.forEach((btn) => {
        btn.classList.remove('l-simulation__input--active');
      });
      button.classList.add('l-simulation__input--active');
    });
  });

  // fixed cta
  const ctaBanner = document.querySelector('.l-fixed-cta');
  const footerWrapper = document.querySelector('.l-footer');
  const simulationSection = document.getElementById('simulation');
  const footerMargin = 28;

  const updateCTAPosition = () => {
    const footerRect = footerWrapper.getBoundingClientRect();

    if (footerRect.top <= window.innerHeight) {
      ctaBanner.style.position = 'absolute';
      ctaBanner.style.insetBlockEnd = `${footerWrapper.offsetHeight + footerMargin}px`;
    } else {
      ctaBanner.style.position = 'fixed';
      ctaBanner.style.insetBlockEnd = '12px';
    }
  };

  const checkSimulationSection = () => {
    const exampleRect = simulationSection.getBoundingClientRect();

    if (exampleRect.top < window.innerHeight) {
      ctaBanner.classList.add('l-fixed-cta--visible');
      window.addEventListener('scroll', updateCTAPosition);
      window.addEventListener('resize', updateCTAPosition);
      updateCTAPosition();
    } else {
      ctaBanner.classList.remove('l-fixed-cta--visible');
      window.removeEventListener('scroll', updateCTAPosition);
      window.removeEventListener('resize', updateCTAPosition);
    }
  };

  window.addEventListener('scroll', checkSimulationSection);
  window.addEventListener('resize', checkSimulationSection);
  checkSimulationSection();

  // modal
  const modal = document.getElementById('modal');
  const modalInner = document.querySelector('.l-modal__inner');
  const modalTriggers = document.querySelectorAll('.js-modal-trigger');
  const isPC = () => window.matchMedia('(min-width: 768px)').matches;
  // モーダルを開く
  const openModal = (event) => {
    if (isPC()) {
      event.preventDefault();
      modal.style.display = 'flex';
    }
  };
  modalTriggers.forEach((trigger) => trigger.addEventListener('click', openModal));
  // モーダルを閉じる関数
  const closeModal = () => (modal.style.display = 'none');
  modal.addEventListener('click', (event) => {
    if (!modalInner.contains(event.target) || event.target.closest('.l-modal__close')) {
      closeModal();
    }
  });

  // トップへ戻るボタン
  const pageTopButton = document.querySelector('.l-page-top__button');
  if (pageTopButton) {
    pageTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
