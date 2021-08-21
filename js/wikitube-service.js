

const YT_KEY = '___';
const gSearches = loadFromStorage('searchesDB') || [];

function getYouTubeSearchResults(onSuccess, searchTxt){
    // Retrieve from cache if exist 
    const cacheResult =  gSearches.find(search=>{
        if(search.searchTxt === searchTxt && (new Date() - Date.parse(search.timeStamp)) < 1000*60*60){
            console.log('Retrieve Youtube from cache')
            return true;
        }
    });
    if(cacheResult){
        onSuccess(cacheResult.results.youtube)
        return;
    }

    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${searchTxt}`)
        .then(res=>{
            console.log('Retrieve Youtube from server');

            // Save to cache
            gSearches.push({searchTxt, results: {youtube: res.data.items}, timeStamp: new Date()})
            saveToStorage('searchesDB', gSearches)

            onSuccess(res.data.items)
        })
        .catch(err=>{
            console.log('Cannot reach server: ' + err);
        })
}

function getWikiSearchResults(onSuccess, searchTxt){
      // Retrieve from cache if exist 
      const cacheResult =  gSearches.find(search=>{
        if(search.searchTxt === searchTxt && (new Date() - Date.parse(search.timeStamp)) < 1000*60*60){
            console.log('Retrieve Wiki from cache')
            return true;
        }
    });
    if(cacheResult){
        onSuccess(cacheResult.results.wiki)
        return;
    }

    axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchTxt}&format=json`)
        .then(res=>{
            console.log('Retrieve Wiki from server');

            // Save to cache
            setTimeout(()=>{
                gSearches[gSearches.length - 1].results.wiki = res.data.query.search;
                saveToStorage('searchesDB', gSearches)
            }, 1000)

            onSuccess(res.data.query.search)
        })
        .catch(err=>{
            console.log('Cannot reach server: ' + err);
        })
}