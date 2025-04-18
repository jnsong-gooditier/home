$(document).ready(function () {
  
  document.addEventListener("DOMContentLoaded", function () {
    const fadeTargets = document.querySelectorAll(".txt_ani");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, {
      threshold: 0.1
    });
  
    fadeTargets.forEach((el) => observer.observe(el));
  });

  document.addEventListener("DOMContentLoaded", function () {
    const items = [
      { selector: '.area_wrap_bg1', className: 'bg1' },
      { selector: '.area_wrap_bg2', className: 'bg2' },
      { selector: '.area_wrap_bg3', className: 'bg3' },
    ];
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const match = items.find(item => el.matches(item.selector));
          if (match) {
            el.classList.add('scroll-show', match.className);
          }
        }
      });
    }, { threshold: 0.2 });
  
    items.forEach(item => {
      const el = document.querySelector(item.selector);
      if (el) observer.observe(el);
    });
  });

});