$(document).ready(function () {


  // 두 번째: 배경 요소들
  const items = [
    { selector: '.area_wrap_bg1', className: 'bg1' },
    { selector: '.area_wrap_bg2', className: 'bg2' },
    { selector: '.area_wrap_bg3', className: 'bg3' },
  ];

  const bgObserver = new IntersectionObserver((entries) => {
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
    if (el) bgObserver.observe(el);
  });
  
  
});