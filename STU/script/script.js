window.onload = function() {
    var swiper = document.getElementById("swiper");
    var swiperItems = swiper.getElementsByClassName("swiper-item");
    var leftArrow = document.getElementById("left-arrow");
    var rightArrow = document.getElementById("right-arrow");
    var indicators = document.getElementsByClassName("indicator");
    var index = 0;
    var timer = null;

    // 设置轮播图默认的透明度和位移
    function setDefaultStatus() {
        for (var i = 0; i < swiperItems.length; i++) {
            if (index == i) {
                swiperItems[i].style.opacity = 1;
            } else {
                swiperItems[i].style.opacity = 0;
            }
            swiperItems[i].style.transform = "translateX(" + (-i * swiper.offsetWidth) + "px)";
        }

        for (var k = 0; k < indicators.length; k++) {
            indicators[k].onclick = function() {
                clearInterval(timer);
                var clickIndex = parseInt(this.getAttribute("data-index"));
                index = clickIndex;
                changeItem();
            }
        }
    }
    setDefaultStatus();

    function changeItem() {
        if (index < 0) {
            index = swiperItems.length - 1;
        } else if (index >= swiperItems.length) {
            index = 0;
        }
        for (var j = 0; j < swiperItems.length; j++) {
            swiperItems[j].style.opacity = 0;
        }
        swiperItems[index].style.opacity = 1;
        // 随着item轮换也轮换指示器
        setInticatorOn();
    }
    leftArrow.onclick = function() {
        clearInterval(timer);
        index--;
        changeItem();
    }
    rightArrow.onclick = function() {
        clearInterval(timer);
        index++;
        changeItem();
    }

    function autoChange() {
        timer = setInterval(function() {
            index++;
            changeItem();
        }, 2000)
    }

    // 自动播放
    autoChange();

    // 鼠标经过停止播放
    swiper.addEventListener("mouseover", function() {
        clearInterval(timer);
    }, false)

    // 鼠标移出重新自动播放
    swiper.addEventListener("mouseout", function() {
        autoChange()
    }, false);

    // 自动变换指示器背景颜色
    function setInticatorOn() {
        for (var i = 0; i < indicators.length; i++) {
            // element.classList.remove("on") -> 把某个元素class类的指定的值删除，删除了on值，on就是一个css选择器，里面设置了背景颜色为红色
            indicators[i].classList.remove("on");
        }
        // element.classList.add("on") -> 给某个元素的class中添加指定的值，这个是添加了on值
        indicators[index].classList.add("on");
    }
}