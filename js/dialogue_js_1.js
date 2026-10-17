    // 全局音频对象
    let currentAudio = new Audio();
    let isPlayingAll = false;
    let currentIndex = 0;

    // 点出菜单
        function toggleMenu(e) {
        e.stopPropagation();
        const menu = document.getElementById('menuDropdown');
        const btn = document.getElementById('menuBtn');
        
        menu.classList.toggle('show');
        btn.classList.toggle('active'); // 切換 active 類來控制箭頭旋轉
    }

    // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById("menuDropdown");
            const btn = document.getElementById("menuBtn");
            const menuWrapper = document.querySelector('.menu-wrapper');

            if (dropdown && dropdown.classList.contains('show')) {
                if (!menuWrapper.contains(event.target)) {
                    dropdown.classList.remove('show');
                    btn.classList.remove('active');
                }
            }
        });

    // 渲染页面
    function renderScript() {
        const container = document.getElementById('chatContainer');
        container.innerHTML = scriptData.map((line, index) => {
            const formattedText = line.text.replace(/([a-zA-Z\s\-]+)/g, '<span class="en-term">$1</span>');
            return `
            <div class="message-row role-person${line.role}" id="msg-${index}">
                <div class="msg-header">
                    <span class="role-label">${line.name} [${line.jobtitle}] :</span>
                    <button class="mini-play-btn" onclick="playSingleLine(${index})">
                        🔊 播放
                    </button>
                </div>
                <div class="text-content">${formattedText}</div>
            </div>
            `;
        }).join('');
    }

    function updateStatus(text, isError = false) {
        const bar = document.getElementById('statusBar');
        bar.innerHTML = text;
        bar.className = isError ? 'status-bar error-msg' : 'status-bar';
    }

    function highlightMessage(index) {
        document.querySelectorAll('.message-row').forEach(el => el.classList.remove('playing'));
        if (index !== null) {
            const el = document.getElementById(`msg-${index}`);
            if (el) {
                el.classList.add('playing');
                // 滚动到当前播放位置
                const yOffset = -160; 
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }
    }
