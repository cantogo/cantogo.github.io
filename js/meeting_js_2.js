
// 播放单句
    function playSingleLine(index) {
        stopAudio(); // 重置状态
        highlightMessage(index);
        playAudioFile(index, () => {
            highlightMessage(null);
            updateStatus("播放结束");
        });
    }

    // 播放全部
    function playAll() {
        stopAudio();
        isPlayingAll = true;
        currentIndex = 0;
        playNext();
    }

    // 递归播放下一句
    function playNext() {
        if (!isPlayingAll || currentIndex >= scriptData.length) {
            stopAudio();
            updateStatus("全段播放结束");
            return;
        }

        highlightMessage(currentIndex);
        
        playAudioFile(currentIndex, () => {
            currentIndex++;
            setTimeout(playNext, 250);
        });
    }

    function stopAudio() {
        isPlayingAll = false;
        currentAudio.pause();
        currentAudio.currentTime = 0;
        highlightMessage(null);
        updateStatus("已停止");
    }


    // 初始化
    renderScript();
