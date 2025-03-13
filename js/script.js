$(document).ready(function () {

    let pageIndex = 0; // 현재 페이지 인덱스
    let pageCount = $("section").length; // 섹션 개수
    let isScrolling = false; // 스크롤 중인지 체크
    let isSnapScrollEnabled = $(window).width() > 1023; // 기본적으로 PC에서는 스냅 스크롤 활성화

    function checkWindowSize() {
        isSnapScrollEnabled = $(window).width() > 1023;
    }

    $(window).on("resize", checkWindowSize); // 창 크기 변경 시 다시 체크

    function scrollToPage(index) {
        if (!isSnapScrollEnabled || index < 0 || index >= pageCount) return; // 범위 벗어나면 실행 안 함
        isScrolling = true; // 스크롤 중 플래그 설정
        $("html, body").stop().animate({
            scrollTop: $(window).height() * index
        }, 800, function () {
            isScrolling = false; // 애니메이션 끝난 후 다시 스크롤 가능하게 설정
        });
        pageIndex = index; // 현재 인덱스 업데이트
    }

    $(window).on("wheel", function (e) {
        if (!isSnapScrollEnabled || isScrolling) return; // 태블릿 이하에서는 스냅 스크롤 안 함
        if (e.originalEvent.deltaY > 0) {
            scrollToPage(pageIndex + 1); // 아래로 스크롤
        } else {
            scrollToPage(pageIndex - 1); // 위로 스크롤
        }
    });

    // 키보드 방향키로도 스크롤 가능
    $(document).on("keydown", function (e) {
        if (!isSnapScrollEnabled || isScrolling) return;
        if (e.key === "ArrowDown") {
            scrollToPage(pageIndex + 1);
        } else if (e.key === "ArrowUp") {
            scrollToPage(pageIndex - 1);
        }
    });

    // 화면 크기 변경 시 현재 페이지 위치 조정
    $(window).on("resize", function () {
        scrollToPage(pageIndex);
     });

    let isMenuOpen = false; // 메뉴가 열렸는지 여부

    // 스크롤 이벤트
    function handleScroll() {
        if (!isMenuOpen) { 
            if ($(window).scrollTop() > $(window).height() * 0.9) {
                $(".scrolloff").hide();
                $(".scrollon").show();
            } else {
                $(".scrolloff").show();
                $(".scrollon").hide();
            }
        }
    }

    $(window).on("scroll", handleScroll);

    // 메뉴 hover 이벤트
    $(".mainNav>li, .subNavBG").on("mouseenter", function () {
        isMenuOpen = true;
        $(".scrolloff").hide();
        $(".scrollon").show();
        $(".subNavBG, .subNav").stop().slideDown();
    });

    $(".subNavBG").on("mouseleave", function () {
        isMenuOpen = false;
        $(".subNavBG").stop().slideUp(function () {
            handleScroll(); // 메뉴가 닫힌 후 스크롤 상태에 따라 헤더 복구
        });
    });

    $(document).ready(function () {
        $(".header .menuBtn").on("click", function () {
            $(".menuOn").fadeIn(); // 메뉴 표시 (부드러운 효과)
        });
    
        $(".menuOn .menuBtn").on("click", function () {
            $(".menuOn").fadeOut(); // 메뉴 숨김 (부드러운 효과)
        });
    });
    
});