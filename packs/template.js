var renhead,renbody;
function render(from,tar,data){
    document.getElementById(tar).innerHTML=template(from,data);
}//每次都要编译，适合一次性模板
function comren(from){
    return template.compile(document.getElementById(from).innerHTML);
}//生成特定的模板函数，适合需要多次使用的模板
function renfun(fun,tar,data){
    document.getElementById(tar).innerHTML=fun(data);
    if(typeof(MathJax)!="undefined"){
        if(MathJax.typeset){
            MathJax.typeset();
        }
    }
}//将模板函数加入信息，转换成字符串，写入目标
function settitle(title){
	config.title=title;
}
function startcgtt(mid_t,new_t){
	var old_t=config.title;
	document.addEventListener("visibilitychange", function () {
        if (document.visibilityState != "visible") {
            config.title = new_t;
			temphead();
        }
        else {
            config.title = mid_t;
			temphead();
            setTimeout(() => {
                if(document.visibilityState != "hidden"){
                    config.title = old_t;
					temphead();
                }
            }, 500);
        }
    });
}
function temphead(){
    renfun(renhead, "head", config);
}
function tempbody(){
    renfun(renbody, "body", config);
}
function init(){
	renhead = comren("head-temp");
	renbody = comren("body-temp");
	temphead();
	tempbody();
}
function setmd(){
	template.defaults.imports.markdown = marked;
}
function setbg(){
	document.body.background=config.bgimage;
}
