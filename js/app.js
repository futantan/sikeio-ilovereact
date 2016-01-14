window.onload = function() {
  animateLogo();
  animateRobot();
  // 当页面首次加载的时候更新 slider
  updateSliderControl();

  addSmoothScrolling();
};

// 使用 onscroll 回调函数来更新 slider
window.onscroll = function() {
  updateSliderControl();
};

function animateLogo() {
  TweenMax.fromTo(".react-logo", 3, {
    // from
    css: {}
  }, {
    // to
    css: {
      y: "-50px",
    },

    // 永久重复动画的选项
    repeat: -1,

    // 反转、重新运行动画的选项
    yoyo: true,
    // 改变 easing 类型
    ease: Power2.easeInOut
  });
}

function animateRobot() {
  var t = new TimelineMax({
    yoyo: true,
    repeat: -1
  });
  t.to("#android-robot", 1, {
    rotation: "-=15deg"
  });
}

function updateSliderControl() {
  // 获得所有的 slider 链接
  var links = document.querySelectorAll("#slider-control a");

  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    // 获取被链接指向的部分
    var section = document.querySelector(link.getAttribute("href"));
    var sectionTop = section.offsetTop;
    var sectionBottom = sectionTop + section.offsetHeight;

    // 检查 window.scrollY 是否在这部分中
    if(window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      link.className = "active";
    } else {
      link.className = "";
    }
  }
}

function scrollToElement(element) {
  var topOfElement = element.offsetTop;

  TweenMax.to(window,1,{
    scrollTo: {
      y: topOfElement,
    },

    ease: Power2.easeInOut,
  });
}

function stopDefAction(evt) {
    evt.preventDefault();
}

function addSmoothScrolling() {
  var links = document.querySelectorAll("#slider-control a");

  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    // 使用闭包包裹，不然 link 为最后一次设置的值
    (function(_link) {
      // 为了能够显示动画，取消默认的点击效果
      _link.addEventListener('click', stopDefAction, false);
      _link.addEventListener("click", function(event) {
        // `event` 是鼠标点击事件

        // BUG 警告！使用闭包或者 ES6 `let` 修复。
        var href = _link.getAttribute("href");
        scrollToElement(document.querySelector(href));
        // alert(href);
      });
    })(link);
  }
}
