
var dayjs = require('dayjs')
const { getCityNaInfo,createCityNaInfo, updateById } = require('../service/city.service')
const { userRegisterError, changePasswordError  } = require('../constant/err.type')
const crawlerRequest = require('../crawler');
var myCheerio = require('cheerio');
var myIconv = require('iconv-lite');
var myEncoding = "utf-8";

class cityController {
    async getCityNaInfo(ctx, next) {
        const { date, name, site, createDate } = ctx.query
        try {
            const res = await getCityNaInfo(date, name, site, createDate)
            ctx.body = {
                code: 0,
                message: '获取成功',
                data: res
            }
        } catch (err) {
            console.log(err)
            ctx.app.emit('error', getDataError, ctx)
        }
    } 

    async crawlerInsertCityInfo() {
      //爬取内容
      
      // var source_name = "环境质量监测点";
      
      var seedURL = 'https://data.rmtc.org.cn/gis/listtype0M.html';
      crawlerRequest(seedURL, function(err, res, body) { //读取种子页面
        // body为页面buffer数据，通过iconv转为html源码，通过cheerio转为可供js操作的对象模型（DOM）
       
         //用iconv转换编码
         var html = myIconv.decode(body, myEncoding);
         // console.log(html);
         //准备用cheerio解析html
         var $ = myCheerio.load(html, { decodeEntities: true });
         let datali = $('.datali');
           let crawler_data = [];
           datali.each((i,e)=>{
           let name_city = $(e).find('.divname a').text().match(/[\u4e00-\u9fff]+/g)
       
             crawler_data.push({
               name: name_city[0],
               site: name_city[1],
               value: Number($(e).find('.divval .label').text().split(' ')[0]),
               date: $(e).find('.divval .showtime').text(),
               createDate: dayjs().format('YYYY-MM-DD')
             })
           })
       
        // 存入数据库
        createCityNaInfo(crawler_data)
       });
    }
}

module.exports = new cityController()