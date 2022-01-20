window.addEventListener("DOMContentLoaded", () => {
  // LOADER
  const loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.opacity = 0;
    setTimeout(function () {
      loader.style.display = "none";
    }, 100); //1500
  }, 200); //2000

  // TABS
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    headerParents = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  headerParents.addEventListener("click", (event) => {
    // console.log(event);
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // MODAL
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector("[data-close]");
  const allModalBtns = document.querySelectorAll("[data-modal]");

  function showModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearInterval(showModalByTime);
  }
  function hideModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
  modalClose.addEventListener("click", hideModal);

  allModalBtns.forEach((btn) => {
    btn.addEventListener("click", showModal);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  //const showModalByTime = setTimeout(showModal, 5000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  // DATA
  const deadline = "2022-08-05";

  function getTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return {
      total: total,
      days: days,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const time = getTime(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  // CLASS
  class CarCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 1000;
      this.changeToUSD();
    }
    changeToUSD() {
      // method which transfer cars price to usd
      this.price = this.price * this.transfer;
    }

    render() {
      //method which returns cards html
      const element = document.createElement("div");
      element.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> $</div>
        </div>
    </div>
      `;
      this.parent.append(element);
    }
  }

  new CarCard(
    "img/tabs/1.jpg",
    "Car",
    "2021 Mercedes-Benz C-Class",
    ` The 2021 Mercedes-Benz C-Class finishes in the top half of our
  luxury small car rankings. It's powerful and upscale, but it has
  so-so handli...`,
    199,
    ".menu .container"
  ).render();

  new CarCard(
    "img/tabs/2.jpg",
    "Car",
    "2021 Mercedes-Benz CLA-Class",
    ` The 2021 Mercedes-Benz CLA offers punchy powertrains, an elegant
    interior, and easy-to-use tech features, but it also has a firm
    ride and a ..`,
    299,
    ".menu .container"
  ).render();

  new CarCard(
    "img/tabs/3.jpg",
    "Car",
    "2021 Mercedes-Benz SCLA-Class",
    `The German luxury car-manufacturer has been around for more than a
    century, having elegantly drifted rough curves of automobile.`,
    399,
    ".menu .container"
  ).render();

  // SLIDERS FIRST WAY(EASY)

  // const slides = document.querySelectorAll(".offer__slide"),
  //   prev = document.querySelector(".offer__slider-prev"),
  //   next = document.querySelector(".offer__slider-next"),
  //   current = document.querySelector("#current"),
  //   total = document.querySelector("#total");
  // let slideIndex = 1;
  // showSlide(slideIndex);
  // function showSlide(i) {
  //   if (slideIndex > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (slideIndex < 1) {
  //     slideIndex = slides.length;
  //   }
  //   slides.forEach((item) => (item.style.cssText = "display:none"));
  //   slides[slideIndex - 1].style.display = "block";
  //   if (slides < 10) {
  //     current.textContent = `${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function slidePlus(i) {
  //   showSlide((slideIndex += 1));
  // }
  // prev.addEventListener("click", () => {
  //   slidePlus(-1);
  // });

  // next.addEventListener("click", () => {
  //   slidePlus(1);
  // });

  // SLIDERS FIRST WAY(DIFFICULT)

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;
  slidesField.style.width = 100 * slides.length + "%";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";
  let indicator = document.createElement("ol"),
    dots = [];
  indicator.style.cssText = `
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    z-index:15;
    display:flex;
    justify-content:center;
    margin-right:15%;
    margin-left:15%;
    list-style:none;
  `;
  slider.append(indicator);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
    box-sizing:content-box;
    flex:0 1 auto;
    width:30px;
    height:6px;
    margin:0 3px;
    cursor:pointer;
    background-color:#fff;
    background-clip:padding-box;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    opacity:.5;
    transform:opacity .6s ease;
  `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicator.append(dot);
    dots.push(dot);
  }
  function totalAndCurrontContents() {
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
    }
  }
  totalAndCurrontContents();
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    // if (slideIndex < 10) {
    //   current.textContent = `0${slideIndex}`;
    // } else {
    //   current.textContent = slideIndex;
    // }
    slideIndexView();
    dots.forEach((dot) => {
      dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  });

  function slideIndexView() {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    // if (slideIndex < 10) {
    //   current.textContent = `0${slideIndex}`;
    // } else {
    //   current.textContent = slideIndex;
    // }
    slideIndexView();
    dots.forEach((dot) => {
      dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slideIndexView();
      dots.forEach((dot) => {
        dot.style.opacity = ".5";
      });
      dots[slideIndex - 1].style.opacity = 1;
      slidesField.style.transform = `translateX(-${offset}px)`;
    });
  });

  // ACCORDION
  const accordion = document.querySelectorAll(".accordion");
  accordion.forEach((acc) => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("active");
      const panel = acc.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});
