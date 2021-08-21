

function init(){
    onSearch('the beatles')
}

function onSearch(txt){
    if(!txt) return;

    getYouTubeSearchResults(renderVideos, txt);
    getWikiSearchResults(renderWiki, txt);
}

function onKey(ev, txt){
    if(ev.key === 'Enter'){
        ev.target.value = '';
        ev.target.blur();
        if(!txt) return
        onSearch(txt);
    }
}

function renderVideos(searchResults){
    
    searchResults.map((result, idx)=>{
        const videoId = result.id.videoId;
        const videoTitle = result.snippet.title;

        if(idx === 0){
            document.querySelector(`.main-video`).innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0"></iframe>`;
        }

        document.querySelector(`.video-${idx + 1}`).innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0"></iframe>
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${videoTitle}</a>`
    })
}

function renderWiki(searchResults){

    let strHtml = ''
    searchResults.map(result=>{
        strHtml += `
        <div class="wiki-value">
            <a href="http://en.wikipedia.org/?curid=${result.pageid}" target="_blank" ><u>${result.title}</u></a>
            <p>${result.snippet}</p>
        </div>
        <br>`
    })

    document.querySelector('.wiki-values').innerHTML = strHtml;
}