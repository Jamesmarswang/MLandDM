function HistoryViews(obj, arg) {
    this.WriteCookie = function (name, value, hours) {
        var expire = "";
        if (hours != null) {
            expire = new Date((new Date()).getTime() + hours * 3600000);
            expire = ";expires=" + expire.toGMTString() + ";path=/;domain=.eastmoney.com";
        }
        document.cookie = name + "=" + escape(value) + expire;
    };

    this.GetCookie = function (name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) { return null };
        }
        else {
            begin += 2;
        }
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
        return unescape(dc.substring(begin + prefix.length, end));
    };
    this.setvi = 1;
    if (arg.def == "") {
        arg.def = ["a-sh-600000-�ַ�����", "a-sz-300017-���޿Ƽ�", "a-sh-600020-��ԭ����", "a-sh-600005-��ֹɷ�", "a-sh-600004-���ƻ���", "a-sz-162605-��˳����", "a-sz-159901-��100ETF", "a-sh-600015-��������", "a-sz-002364-�к����", "a-sh-600128-��ҵ�ɷ�", "a-sz-002357-������ҵ", "a-sz-002363-¡����е", "a-sh-601106-�й�һ��", "a-sz-002013-�к�����", "a-sz-000550-��������"];
    }
    if (arg.def == "0") {
        this.setvi = 0;
    }
    this.mb = { "a": "http://quote.eastmoney.com/[#MARKET#][#CODE#].html", "b": "http://guba.eastmoney.com/topic,[#CODE#].html", "c": "http://fund.eastmoney.com/[#CODE#].html", "d": "http://quote.eastmoney.com/hk/[#CODE#].html", "e": "http://quote.eastmoney.com/gzqh/[#CODE#].html", "f": "http://quote.eastmoney.com/zs[#CODE#].html", "g": "http://quote.eastmoney.com/qihuo/[#CODE#].html", "h": "http://quote.eastmoney.com/hk/[#CODE#].html", "i": "http://quote.eastmoney.com/hk/zs[#CODE#].html", "j": "http://quote.eastmoney.com/us/[#CODE#].html", "k": "http://quote.eastmoney.com/forex/[#CODE#].html", "l": "http://quote.eastmoney.com/[#MARKET#][#CODE#].html", "m": "http://quote.eastmoney.com/gb/zs[#CODE#].html", "n": "http://quote.eastmoney.com/globalfuture/[#CODE#].html", "o": "http://quote.eastmoney.com/qiquan/[#CODE#]_[#MARKET#].html", "p": "http://quote.eastmoney.com/3ban/[#MARKET#][#CODE#].html" };
    if (this.GetCookie("em_hq_fls") == "new") {
        this.mb.a = "http://quote.eastmoney.com/flash/[#MARKET#][#CODE#].html";
    }
    //[����(a:����,b:�ɰ�,c:����,d:�۹�,e:��ָ�ڻ�,f:����ָ��,g:�ڻ�,h:�۹�,i:�۹�ָ��,j:����,k:���,l:ծȯ,m:ȫ��ָ��,n:�����ڻ�,o:��Ȩ,p:3��),�г�(û��Ϊ0),����,����]
    this.len = arg.lns;
    if (arg.lns == 0 || arg.lns > arg.def.length || arg.lns == "" || arg.lns == "undefined") {
        this.len = arg.def.length;
    }
    this.addlen = 0;
    this.ret = [];
    this.init = function () {
        if (arg.set == "") {
            this.ReadInfo();
        }
        else {
            this.SetInfo();
        }
    };
    this.ReadInfo = function () {
        var Str = "<ul>";
        var showlist = new Array();
        var _ckv = this.GetCookie("HAList");
        var ckv;
        if (_ckv != "" && _ckv != null) {
            var ckv = _ckv.split(',');
            if (ckv.length < this.len) {
                this.addlen = this.len - ckv.length;
            }
        }
        else {
            ckv = arg.def;
        }
        for (var i = 0; i < ckv.length; i++) {
            if (i >= this.len) { break; }
            var _tmcn = ckv[i]; showlist.push(ckv[i]);
            var tmcn = _tmcn.split('-');
            if (tmcn.length == 4) {
                var tp = tmcn[0]; var mk = tmcn[1]; var cd = tmcn[2]; var nm = tmcn[3]; var lk = "";
                var _lk = eval("this.mb." + tp);
                var lk = _lk.replace("[#MARKET#]", mk).replace("[#CODE#]", cd);
                Str += "<li><a href=\"" + lk + "\" target=\"_blank\">" + nm + "</a></li>";
                this.ret.push(mk + "-" + cd + "-" + nm);
            }
        }
        if (this.addlen > 0) {
            var ed = 0;
            for (var i = 0; i < arg.def.length; i++) {
                if (showlist.toString().indexOf(arg.def[i]) == -1) {
                    var tmcn = arg.def[i].split('-');
                    if (tmcn.length == 4) {
                        var tp = tmcn[0]; var mk = tmcn[1]; var cd = tmcn[2]; var nm = tmcn[3]; var lk = "";
                        var _lk = eval("this.mb." + tp);
                        var lk = _lk.replace("[#MARKET#]", mk).replace("[#CODE#]", cd);
                        Str += "<li><a href=\"" + lk + "\" target=\"_blank\">" + nm + "</a></li>";
                        this.ret.push(mk + "-" + cd + "-" + nm);
                        ed++;
                    }
                }
                if (ed >= this.addlen) { break; }
            }
        }
        Str += "</ul>";
        if (this.setvi == 1) {
            document.getElementById(obj).innerHTML = Str;
        }
    };

    this.SetInfo = function () {
        var _ckv = this.GetCookie("HAList");
        var ckv = new Array();
        if (_ckv != "" && _ckv != null) {
            ckv = _ckv.split(',');
        }
        ckv.unshift(arg.set);
        for (var i = 1; i < ckv.length; i++) {
            var pattern = new RegExp("([^-]+)-([^-]+)-([^-]+)-([^-]+)", "ig");
            var _s = ckv[i].replace(pattern, "$1-$2-$3-***");
            var _o = arg.set.replace(pattern, "$1-$2-$3-***");
            if (_s == _o) {
                ckv.splice(i, 1);
                break;
            }
            if (i >= this.len) {
                ckv.splice(i, 1);
            }
        }
        this.WriteCookie("HAList", ckv, 99999);
        this.ReadInfo();
    };
    this.init();
}