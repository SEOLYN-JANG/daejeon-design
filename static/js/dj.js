/* main.js — 공통 JS (플로팅 배너 + 애니메이션) */
/* 원본 poedit.co.kr inline script에서 복사 */
/* 상단 카운터(실시간 이용자 수·잔여 프로젝트)는 로직 노출 방지를 위해 서버(PHP, functions.php)로 이전 */

// ========== Fade-up 애니메이션 ==========
(function() {
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section, index) {
        if (index === 0) return;
        if (section.classList.contains('dj-cs1bf3')) return;
        section.classList.add('dj-fu59b0');
    });

    var childSelectors = [
        '.service-item', '.fsc-box',
        '.stat-item',
        '.portfolio-card',
        '.news-card',
        '.dj-pcc7eb', '.rv-card', '.rv-text-card',
        '.col-card', '.nt-row',
        '.about-board-col',
        '.dj-cfrd59b', '.dj-cl110d', '.dj-cr708d',
        '.difference-block', '.faq-item'
    ];
    var children = document.querySelectorAll(childSelectors.join(','));
    children.forEach(function(el) {
        el.classList.add('dj-fuceeb7');
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.dj-fu59b0, .dj-fuceeb7').forEach(function(el) {
        observer.observe(el);
    });
})();

// ========== 모바일 메뉴 ==========
(function() {
    var menu = document.getElementById('dj-mfaee');
    var backdrop = document.getElementById('dj-mfa7f');
    var openBtn = document.getElementById('dj-m9f29');
    var closeBtn = document.getElementById('dj-m6b78');
    if (!menu || !openBtn) return;

    function open() {
        menu.classList.add('open');
        if (backdrop) backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        menu.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);

    menu.querySelectorAll('.dj-mmnb698 a').forEach(function(link) {
        link.addEventListener('click', close);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('open')) close();
    });
})();

// ========== 플로팅 배너 ==========
(function() {
    const banner = document.getElementById('dj-fd5d7');
    if (!banner) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;
        const distanceToBottom = bodyHeight - (scrollTop + windowHeight);

        if (scrollTop < 100 || distanceToBottom < 100) {
            banner.classList.add('hidden');
        } else {
            banner.classList.remove('hidden');
        }
    });

    banner.addEventListener('click', function() {
        window.location.href = 'contact.html';
    });
})();

/* animations.js — 메인 페이지 애니메이션 모음 */

document.addEventListener('DOMContentLoaded', function () {

    /* ========== 통계 카운터 룰렛 ========== */
    function shuffleArray(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function buildRoulette(ul, targetDigit) {
        ul.innerHTML = '';
        var random1 = shuffleArray([0,1,2,3,4,5,6,7,8,9]);
        var random2 = shuffleArray([0,1,2,3,4,5,6,7,8,9]);
        var all = random1.concat(random2);
        all.forEach(function (num) {
            var li = document.createElement('li');
            li.className = 'dj-cni5a97';
            li.textContent = num;
            ul.appendChild(li);
        });
        var index = all.lastIndexOf(parseInt(targetDigit));
        var itemH = ul.querySelector('.dj-cni5a97') ? ul.querySelector('.dj-cni5a97').offsetHeight : 52;
        var offset = index > 0 ? index * itemH : 10 * itemH;
        setTimeout(function () {
            ul.style.transform = 'translateY(-' + offset + 'px)';
        }, 50);
    }

    function startRouletteAnimation(container) {
        var wraps = container.querySelectorAll('.dj-cnie0ff');
        var digitCount = wraps.length;
        var number = container.dataset.number.padStart(digitCount, '0');
        var digits = number.split('');
        var boxes = container.querySelectorAll('.dj-cni6e1f');
        digits.forEach(function (digit, idx) {
            buildRoulette(boxes[idx], digit);
        });
    }

    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var el = entry.target;
            if (entry.isIntersecting) {
                startRouletteAnimation(el);
            } else {
                el.querySelectorAll('.dj-cni6e1f').forEach(function (box) {
                    box.innerHTML = '';
                    box.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.dj-snabf4').forEach(function (el) {
        statsObserver.observe(el);
    });

    /* ========== 뉴스 캐러셀 드래그 + 프로그레스 ========== */
    var scrollContainer = document.getElementById('scrollContainer');
    var newsProgressBar = document.getElementById('dj-sd96f');

    if (scrollContainer) {
        /* 모바일: 2번째 카드를 초기 중앙에 배치 */
        if (window.innerWidth <= 767) {
            var secondCard = scrollContainer.querySelectorAll('.news-card')[1];
            if (secondCard) {
                var cardCenter = secondCard.offsetLeft - (scrollContainer.offsetWidth - secondCard.offsetWidth) / 2;
                scrollContainer.scrollLeft = cardCenter;
            }
        }
    }

    if (scrollContainer && newsProgressBar) {
        scrollContainer.addEventListener('scroll', function () {
            var scrollLeft = scrollContainer.scrollLeft;
            var maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            var percent = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
            newsProgressBar.style.width = percent + '%';
        });

        scrollContainer.addEventListener('wheel', function (e) {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
            }
        }, { passive: false });

        var isDown = false, startX, scrollLeft;
        scrollContainer.addEventListener('mousedown', function (e) {
            isDown = true;
            scrollContainer.classList.add('active');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            e.preventDefault();
        });
        window.addEventListener('mouseup', function () {
            isDown = false;
            scrollContainer.classList.remove('active');
        });
        window.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - scrollContainer.offsetLeft;
            scrollContainer.scrollLeft = scrollLeft - (x - startX) * 2;
        });
    }

    /* ========== 리뷰 카드 무한 스크롤 ========== */
    var reviewContainer = document.getElementById('reviewScrollInner');
    if (reviewContainer) {
        var reviewData = [
            { logo: "theme/assets/first/LOGO_Kookmin-bank.jpg", title: "디자인부터 인쇄까지 빠르게 받아볼 수 있었습니다", text: "시안을 2가지로 제안해주셔서 선택의 폭이 넓었고, 수정도 신속하게 진행되어 인쇄까지 빠르게 받아볼 수 있었습니다." },
            { logo: "theme/assets/first/LOGO_hite-jinro.jpg", title: "캐릭터 활용 홍보물, 기대 이상이었습니다", text: "브랜드 캐릭터를 활용한 홍보물을 의뢰했는데 톤앤매너를 정확히 살려주셔서 내부 반응이 아주 좋았습니다." },
            { logo: "theme/assets/first/LOGO_mirae.jpg", title: "너무 만족스럽고 수정이 필요없네요", text: "너무 만족스러운 디자인이고 수정 없이 마무리하면 될 것 같습니다 ^^ 대표님께서도 감사하다고 전해달라 하시네요." },
            { logo: "theme/assets/first/LOGO_ewha-university.png", title: "수정없이 한번에 컨펌되었습니다!", text: "컨셉이 정해진 것이 없었는데 원하는 디자인으로 잘 나왔습니다. 수정 없이 한번에 컨펌되어 편하게 작업했습니다~" },
            { logo: "theme/assets/first/LOGO_nationalforensic-logo.jpg", title: "보고서·브로슈어 모두 믿고 맡깁니다", text: "기관 발간물 특성상 검수 기준이 까다로운데도 일정과 품질 모두 정확하게 맞춰주셨습니다." },
            { logo: "theme/assets/first/LOGO_samsung-bio.jpg", title: "빠르고 신속한 작업! 다음에 또 요청드리겠습니다!", text: "리플렛 디자인 의뢰 후 마음에 들어서 포스터 디자인까지 의뢰하게 되었네요^^ 빠르고 친절하게 작업해주셔서 감사드립니다!" },
            { logo: "theme/assets/first/LOGO_cj-enm.png", title: "전체적으로 디자인이 좋아서 수정할 필요가 없습니다!", text: "전체적으로 디자인이 좋아서 개선할 것이 없습니다! 포스터와 랜딩페이지까지 시간 내에 빠르게 제작해주셔서 감사드립니다." },
            { logo: "theme/assets/first/LOGO_k-league.jpg", title: "좋은 작업물 만들어주셔서 감사드립니다!", text: "일정이 타이트했는데 기한에 맞춰 잘 작업해주셨습니다~ 두 가지 제작물의 톤앤매너까지 잘 맞춰주셔서 마음에 드네요." }
        ];

        function createReviewCard(data, index) {
            var card = document.createElement('div');
            card.className = 'dj-rc5e8a';
            if (index % 2 === 1) card.classList.add('dj-rcb2aa');
            card.innerHTML = '<div class="dj-rc5728"><img src="' + data.logo + '" class="dj-rl9856" alt=""><h3>' + data.title + '</h3><p>' + data.text + '</p></div>';
            return card;
        }

        var isMobile = window.innerWidth <= 767;
        var loopCount = isMobile ? 2 : 3;

        for (var loop = 0; loop < loopCount; loop++) {
            reviewData.forEach(function (item, idx) {
                reviewContainer.appendChild(createReviewCard(item, loop * reviewData.length + idx));
            });
        }

        if (isMobile) {
            var scrollX = 0;
            var speed = 0.5;
            var scrollUnit = reviewContainer.scrollWidth / 2;

            function reviewHScrollLoop() {
                scrollX += speed;
                if (scrollX >= scrollUnit) scrollX = 0;
                reviewContainer.style.transform = 'translateX(' + (-scrollX) + 'px)';
                requestAnimationFrame(reviewHScrollLoop);
            }
            reviewHScrollLoop();
        } else {
            var scrollTop = 0;
            var scrollSpeed = 0.5;
            var scrollUnit = reviewContainer.scrollHeight / 3;

            function reviewScrollLoop() {
                scrollTop += scrollSpeed;
                if (scrollTop >= scrollUnit) scrollTop = 0;
                reviewContainer.style.transform = 'translateY(' + (-scrollTop) + 'px)';
                requestAnimationFrame(reviewScrollLoop);
            }
            reviewScrollLoop();
        }
    }

    /* ========== 차별점 사이드바 스크롤 ==========
       인디케이터(#dj-flfea8 .active) + 페이드 + 클릭 이동은
       front-page.php 인라인 스크립트에서 단독으로 처리한다.
       (두 곳에서 .active 를 건드리면 충돌해 깜빡이므로 여기서는 제거함) */

    /* FAQ 아코디언은 front-page.php 인라인 스크립트에서 단독 처리 (중복 핸들러 제거) */

});

/* consultation.js — 상담현황 슬라이드 (회전 애니메이션만 담당) */
/* 메시지 데이터(회사명 풀·생성 공식)는 서버(PHP, functions.php의 poedit_inquiry_messages)에서 생성 */
/* 여기서는 #dj-sc6549[data-messages]에 담긴 최종 4건을 4초마다 순환 표시만 한다 */
/* 내용(dj-mt883a)·날짜(dj-mde15d)는 각자 자기 셀(overflow:hidden) 안에서 세로로 굴러간다 →
   내용이 제목/날짜 줄 위로 침범해 보이지 않음(모바일 2줄 레이아웃 대응). */

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var slidingContent = document.getElementById("dj-sc6549");
        if (!slidingContent) return;

        var messages;
        try {
            messages = JSON.parse(slidingContent.getAttribute("data-messages") || "[]");
        } catch (e) {
            messages = [];
        }
        if (!messages.length) return;

        // 구조 1회 생성 (이후엔 텍스트 값만 갱신). 각 셀이 자기 줄만큼 잘라(overflow:hidden) 내부를 굴린다.
        slidingContent.innerHTML =
            '<div class="dj-mpeb72">' +
                '<div class="dj-mcd4c8 dj-mt883a"><div class="dj-mibeb1"></div></div>' +
                '<div class="dj-mcd4c8 dj-mde15d"><div class="dj-mibeb1"></div></div>' +
            '</div>';
        var textInner = slidingContent.querySelector(".dj-mt883a .dj-mibeb1");
        var dateInner = slidingContent.querySelector(".dj-mde15d .dj-mibeb1");
        if (!textInner || !dateInner) return;

        function setContent(msg) {
            textInner.textContent = msg.text;
            dateInner.textContent = msg.date;
        }

        var currentIndex = 0;
        setContent(messages[currentIndex]);
        if (messages.length < 2) return;
        currentIndex = 1;

        // 굴리는 거리 = 각 셀 높이 (데스크톱 30 / 모바일 20 등 CSS에 따름)
        function cellH(inner) {
            return (inner.parentElement && inner.parentElement.offsetHeight) || 30;
        }
        function setTransition(v) {
            textInner.style.transition = v;
            dateInner.style.transition = v;
        }
        function setY(ty, dy) {
            textInner.style.transform = "translateY(" + ty + "px)";
            dateInner.style.transform = "translateY(" + dy + "px)";
        }

        setInterval(function () {
            var msg = messages[currentIndex];
            var th = cellH(textInner), dh = cellH(dateInner);
            // 1) 현재 내용 위로 슬라이드 아웃
            setTransition("transform 0.5s ease");
            setY(-th, -dh);
            setTimeout(function () {
                // 2) 애니 끄고 아래로 순간이동 + 새 내용 렌더
                setTransition("none");
                setY(th, dh);
                setContent(msg);
                // 3) 다시 애니 켜고 제자리로 슬라이드 인
                setTimeout(function () {
                    setTransition("transform 0.5s ease");
                    setY(0, 0);
                }, 50);
            }, 500);
            currentIndex = (currentIndex + 1) % messages.length;
        }, 4000);
    });
})();
