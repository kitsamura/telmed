const getNews = async () => {
    let res = await fetch('https://api.tildacdn.info/v1/getpageslist/?publickey=yk73h1c7j53b7x87qvfe&secretkey=4dsatm85ct2bd9evar2u&projectid=861576');
    return res.json()
}

getNews().then((news) => {
        if(news.status == 'FOUND') {

            let news_list = news.result.slice(-3);
            news_list.forEach((nn, ind) => {
            	if ((nn.sort >= 1000000) && (nn.sort < 2000000)){
                let block = $('#blocks').find('.col').eq(ind);
                block.find('strong').text(nn.title);
                block.find('p').text(nn.descr);
                block.find('img').attr('src', nn.img);
                block.find('.newsdate').text(nn.date.split(' ')[0])
                block.attr('onclick', `window.location=\"http://blog.telmed24.ru/${nn.filename}\"`)
           }
            }) 
        }


    })