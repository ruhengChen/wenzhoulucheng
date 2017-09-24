/**
 * Created by ysh on 2017/6/20.
 * 浙江启程科技电子股份有限公司
 */
function Global(){
    //this.requestURL = 'http://183.129.255.154:8085/QGM/QGMServlet';
	this.SMXprogramURL = 'http://183.129.255.154:8085/SMXprogram/';
    window.onload = function(){
        // 配置全局ajaxError回调函数
        $(document).ajaxError(function(event, XHR, ajaxOptions, thrownError){
            console.log('错误信息：'+XHR.statusText);
            console.log('ajax参数对象：',ajaxOptions);
//            alert('网络不通或者服务器错误');
        })
    }
}
// 获取URL参数
Global.prototype.getUrlParam = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) {return unescape(r[2]);}else{ return null;} //返回参数值
}
//获取当前时间
Global.prototype.getDateTime = function(){
    var date = new Date();
    now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    return now;
}
//xml字符串转xml对象
Global.prototype.createXml =  function (str){
    if(document.all){
        var xmlDom=new ActiveXObject("Microsoft.XMLDOM");
        xmlDom.loadXML(str);
        return xmlDom;
    }
    else
        return new DOMParser().parseFromString(str, "text/xml");
}
//XML对象转json对象
Global.prototype.xml2Json = function (xml) {
    var obj = {};
    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            // obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        console.log(xml.nodeValue)
        obj = xml.nodeValue;
    }
    // do children

    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = Global.prototype.xml2Json(item);
            } else {
                if (typeof(obj[nodeName].length) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(Global.prototype.xml2Json(item));
            }
        }
    }
    return obj;
}
window.global = new Global();