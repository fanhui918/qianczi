   
    function select(id) {

        var s = $("input[type=radio]");
        for (var i = 0; i < s.length; i++)
        {

        	
            if(s[i].value == '' + id + '') {

                s[i].checked=true;
            }

        }
    }

    //银行卡号校验

    //Description:  银行卡号Luhm校验

    //Luhm校验规则：16位银行卡号（19位通用）:

    // 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
    // 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
    // 3.将加法和加上校验位能被 10 整除。


    function luhmCheck(card){
        var bankno = $(card).val();
        if (bankno.length < 16 || bankno.length > 19) {
        //$("#banknoInfo").html("银行卡号长度必须在16到19之间");
            return false;
        }
        var num = /^\d*$/;  //全数字
        if (!num.exec(bankno)) {
        //$("#banknoInfo").html("银行卡号必须全为数字");
            return false;
        }
        //开头6位
        var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(bankno.substring(0, 2))== -1) {
            alert("银行卡号开头6位不符合规范");
            return false;
        }

        var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

        var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array();  //奇数位*2的积 <9
        var arrJiShu2=new Array(); //奇数位*2的积 >9
        var arrOuShu=new Array();  //偶数位数组
        for(var j=0;j<newArr.length;j++){
            if((j+1)%2==1){//奇数位
                if(parseInt(newArr[j])*2<9)
                    arrJiShu.push(parseInt(newArr[j])*2);
                else
                    arrJiShu2.push(parseInt(newArr[j])*2);
            }
            else //偶数位
                arrOuShu.push(newArr[j]);
        }
        var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
        for(var h=0;h<arrJiShu2.length;h++){
            jishu_child1.push(parseInt(arrJiShu2[h])%10);
            jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }

        var sumJiShu=0; //奇数位*2 < 9 的数组之和
        var sumOuShu=0; //偶数位数组之和
        var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
            sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }
        for(var n=0;n<arrOuShu.length;n++){
            sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }

        for(var p=0;p<jishu_child1.length;p++){
            sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
            sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

        //计算Luhm值
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
        var luhm= 10-k;
        alert(5 + "lastNum:" + lastNum + ",luhm:" + luhm);
        if(lastNum==luhm){
            alert("验证通过");
            $("#banknoInfo").html("Luhm验证通过");
            return true;
        }
        else{
            alert("验证未通过");
            $("#banknoInfo").html("银行卡号必须符合Luhm校验");
            return false;
        }
    }



    /**
     * author:qiaoyongjun
     * StrNo:用户输入的身份证件号码
     * _id:用来承载错误信息的控件ID号,用来进行友好提示
     *判断身份证号码格式函数
     *公民身份号码是特征组合码，
     *排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码
     *如果验证通过　返回 true
     */

    var Errors=new Array(
            "验证通过!",
            "身份证号码位数不对!",
            "身份证号码出生日期超出范围或含有非法字符!",
            "身份证号码校验错误!",
            "身份证地区非法!"
    );
    var area={11:"北京",12:"天津",13:"河北",14:"山西",
    		15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
    		31:"上海",32:"江苏",33:"浙江",34:"安徽",
    		35:"福建",36:"江西",37:"山东",41:"河南",
    		42:"湖北",43:"湖南",44:"广东",45:"广西",
    		46:"海南",50:"重庆",51:"四川",52:"贵州",
    		53:"云南",54:"西藏",61:"陕西",62:"甘肃",
    		63:"青海",64:"宁夏",65:"新疆",71:"台湾",
    		81:"香港",82:"澳门",91:"国外"};


    function  isChinaIDCard(idCard, _Id) {
        var StrNo = $(idCard).val();
        var  error = document.getElementById(_Id);
        StrNo = StrNo.toString();
        if  (StrNo.length == 15) {
            if  (!isValidDate( "19"  + StrNo.substr(6, 2), StrNo.substr(8, 2),
                    StrNo.substr(10, 2), _Id)) {
                return   false ;
            }
        } else   if  (StrNo.length == 18) {
            if  (!isValidDate(StrNo.substr(6, 4), StrNo.substr(10, 2), StrNo
                    .substr(12, 2), _Id)) {
                return   false ;
            }
        } else  {
            error.innerHTML = "" ;
            error.innerHTML = "输入的身份证号码必须为15位或者18位！" ;
            return   false ;
        }

        if  (StrNo.length == 18) {
            var  a, b, c
            if  (!isNumber(StrNo.substr(0, 17))) {

                error.innerHTML = "" ;
                error.innerHTML = "身份证号码错误,前17位不能含有英文字母！" ;
                return   false ;

            }
            a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1))
                    * 9 + parseInt(StrNo.substr(2, 1)) * 10;
            a = a + parseInt(StrNo.substr(3, 1)) * 5
                    + parseInt(StrNo.substr(4, 1)) * 8
                    + parseInt(StrNo.substr(5, 1)) * 4;
            a = a + parseInt(StrNo.substr(6, 1)) * 2
                    + parseInt(StrNo.substr(7, 1)) * 1
                    + parseInt(StrNo.substr(8, 1)) * 6;
            a = a + parseInt(StrNo.substr(9, 1)) * 3
                    + parseInt(StrNo.substr(10, 1)) * 7
                    + parseInt(StrNo.substr(11, 1)) * 9;
            a = a + parseInt(StrNo.substr(12, 1)) * 10
                    + parseInt(StrNo.substr(13, 1)) * 5
                    + parseInt(StrNo.substr(14, 1)) * 8;
            a = a + parseInt(StrNo.substr(15, 1)) * 4
                    + parseInt(StrNo.substr(16, 1)) * 2;
            b = a % 11;
            if  (b == 2)  //最后一位为校验位
            {
                c = StrNo.substr(17, 1).toUpperCase(); //转为大写X
            } else  {
                c = parseInt(StrNo.substr(17, 1));
            }
            switch  (b) {
                case  0:
                    if  (c != 1) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:1" ;
                        return   false ;
                    }
                    break ;
                case  1:
                    if  (c != 0) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:0" ;
                        return   false ;
                    }
                    break ;
                case  2:
                    if  (c !=  "X" ) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:X" ;
                        return   false ;
                    }
                    break ;
                case  3:
                    if  (c != 9) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:9" ;
                        return   false ;
                    }
                    break ;
                case  4:
                    if  (c != 8) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:8" ;
                        return   false ;
                    }
                    break ;
                case  5:
                    if  (c != 7) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:7" ;
                        return   false ;
                    }
                    break ;
                case  6:
                    if  (c != 6) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:6" ;
                        return   false ;
                    }
                    break ;
                case  7:
                    if  (c != 5) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:5" ;
                        return   false ;
                    }
                    break ;
                case  8:
                    if  (c != 4) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:4" ;
                        return   false ;
                    }
                    break ;
                case  9:
                    if  (c != 3) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:3" ;
                        return   false ;
                    }
                    break ;
                case  10:
                    if  (c != 2) {
                        error.innerHTML = "" ;
                        error.innerHTML = "身份证号码校验位错:最后一位应该为:2" ;
                        return   false ;
                    }
            }
        } else  { //15位身份证号
            if  (!isNumber(StrNo)) {
                error.innerHTML = "" ;
                error.innerHTML = "身份证号码错误,前15位不能含有英文字母！" ;
                return   false ;
            }
        }
        error.innerHTML = "验证通过" ;
        //出生年份、性别、省份
        
        var gender = maleOrFemalByIdCard(StrNo);
        $("input[name=gender]").val(gender);
        
        var province = area[parseInt(StrNo.substr(0,2))];
        $("input[name=province]").val(province);
        
        error.innerHTML = Errors[0];
        return   true;
    }
    /**
     * 验证身份证件中的日期是否合法有效
     * @param iY
     * @param iM
     * @param iD
     * @param _id
     * @return
     */
    function  isValidDate(iY, iM, iD, _id) {
        if  (iY > 2200 || iY < 1900 || !isNumber(iY)) {
            document.getElementById(_id).innerHTML = "" ;
            document.getElementById(_id).innerHTML = "输入身份证号,年度"  + iY +  "非法！" ;
            return   false ;
        }
        if  (iM > 12 || iM <= 0 || !isNumber(iM)) {
            document.getElementById(_id).innerHTML = "" ;
            document.getElementById(_id).innerHTML = "输入身份证号,月份"  + iM +  "非法！" ;
            return   false ;
        }
        if  (iD > 31 || iD <= 0 || !isNumber(iD)) {
            document.getElementById(_id).innerHTML = "" ;
            document.getElementById(_id).innerHTML = "输入身份证号,日期"  + iD +  "非法！" ;
            return   false ;
        }
        $("input[name=breath]").val(iY);
        return   true ;
    }
    /**
     * 验证是否为数字
     * @param oNum
     * @return
     */
    function  isNumber(oNum) {
        if  (!oNum)
            return   false ;
        var  strP = /^\d+(\.\d+)?$/;
        if  (!strP.test(oNum))
            return   false ;
        try  {
            if  (parseFloat(oNum) != oNum)
                return   false ;
        } catch  (ex) {
            return   false ;
        }
        return   true ;
    }

    /**
     * 通过身份证判断是男是女
     * @param idCard 15/18位身份证号码
     * @return 'female'-女、'male'-男
     */
    function maleOrFemalByIdCard(idCard){
        //idCard = trim(idCard.replace(/ /g, ""));// 对身份证号码做处理。包括字符间有空格。
        if(len(idCard)==15){
            if(idCard.substring(14,15)%2==0){
                return 'female';
            }else{
                return 'male';
            }
        }else if(len(idCard) ==18){
            if(idCard.substring(14,17)%2==0){
                return 'female';
            }else{
                return 'male';
            }
        }else{
            return null;
        }
    }

    function len(str) {
        return str.replace(/[^\x00-\xff]/g, "**").length;
    }
    
    
//CharMode函数
    //测试某个字符是属于哪一类.
    function CharMode(iN){
        if (iN>=48 && iN <=57) //数字
            return 1;
        if (iN>=65 && iN <=90) //大写字母
            return 2;
        if (iN>=97 && iN <=122) //小写
            return 4;
        else
            return 8; //特殊字符
    }
    //bitTotal函数
    //计算出当前密码当中一共有多少种模式
    function bitTotal(num){
        modes=0;
        for (i=0;i<4;i++){
            if (num & 1) modes++;
            num>>>=1;
        }
        return modes;
    }
    //checkStrong函数
    //返回密码的强度级别
    function checkStrong(sPW){
        if (sPW.length<=4)
            return 0; //密码太短
        Modes=0;
        for (i=0;i<sPW.length;i++){
		//测试每一个字符的类别并统计一共有多少种模式.
            Modes|=CharMode(sPW.charCodeAt(i));
        }
        return bitTotal(Modes);
    }
    //pwStrength函数
    //当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色
    function pwStrength(pwd){
        O_color="#e0f0ff";
        L_color="#FF0000";
        M_color="#FF9900";
        H_color="#33CC00";
        if (pwd==null||pwd==''){
            Lcolor=Mcolor=Hcolor=O_color;
        }
        else
        {
            S_level=checkStrong(pwd);

            switch(S_level)
            {
                case 0:
                    Lcolor=Mcolor=Hcolor=O_color;
                case 1:
                    Lcolor=L_color;
                    Mcolor=Hcolor=O_color;
                    break;
                case 2:
                    Lcolor=Mcolor=M_color;
                    Hcolor=O_color;
                    break;
                default:
                    Lcolor=Mcolor=Hcolor=H_color;
            }
        }
        document.getElementById("strength_L").style.background=Lcolor;
        document.getElementById("strength_M").style.background=Mcolor;
        document.getElementById("strength_H").style.background=Hcolor;
        return;
    }