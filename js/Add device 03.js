// 设备添加03开始

var operimg_id;
var zoom_rate=100;
var zoom_timeout;
function rotateimg(){
    var smallImg=$("#"+operimg_id);
    var num=smallImg.attr('curr_rotate');
    if(num==null){
       num=0;
    }
    num=parseInt(num);
    num +=1;
    smallImg.attr('curr_rotate',num);

    $("#show_img").rotate({angle:90*num});
    smallImg.rotate({angle:90*num});
}

function createOpenBox(){
    if($('#operimg_box').length==0){
        var html = '    <div class="operimg_box" id="operimg_box">';
        html += '       <img id="show_img" src="" onclick="get_imgsize()" />';
        html += '       <span class="set_img percent_img" id="zoom_show" >percent</span>';
        html += '       <span class="set_img zoomin" onclick="zoomIn()"></span>';
        html += '       <span class="set_img zoomout" onclick="zoomOut()"></span>';
        html += '       <span class="set_img ratateimg" id="btn_rotateimg" onclick="rotateimg()"></span>';
        html += '       <span class="set_img close_img" id="delimg"></span>';
        html += '       <span class="set_img arrowleft" onclick="prevImg()"></span>';
        html += '       <span class="set_img arrowright" onclick="nextImg()"></span>';
        html += '       <span class="set_img operarea_box"></span>';
        html += '   </div><div class="clearboth"></div><div id="mask_bg"></div>';
        $('body').append(html);         
    }
}
function get_imgsize(){
    var img_size=$("#show_img").width();
    //alert(img_size);
}

function setNewIndex(isNext) {
    var imgs = $('#preview').find('img[class="upload_image"]');
    var imgCount = imgs.length;
    var currIndex=0;
    for(var i=0;i<imgCount;i++){
      if($(imgs[i]).attr('id')==operimg_id){
      currIndex = i;
      break;
      }
    }

  if (isNext) {
        currIndex += 1;
        if (currIndex >= imgCount) {
            currIndex = 0;
        }
    } else {
        currIndex -= 1;
        if (currIndex < 0) {
            currIndex  =imgCount-1;
        }        
    }

    return $(imgs[currIndex]).attr('id').replace('uploadImage_','');
}
function nextImg() {
    var index = setNewIndex(true);
    setimgbox(index);
}
function prevImg() {
    var index = setNewIndex(false);
    setimgbox(index);
}
function zoomIn() {
    zoom_rate += 10;
    doZoom(zoom_rate);
    setoperimgbox();
}
function zoomOut() {
    zoom_rate -= 10;
    doZoom(zoom_rate);
    setoperimgbox();
}

function doZoom(zoom_rate){
  //$("#show_img").css('width', zoom_rate + '%').css('height', zoom_rate + '%');  
    var naturalWidth= $("#show_img")[0].naturalWidth;
    $("#show_img").css('width', naturalWidth*zoom_rate*0.01+'px');

  clearTimeout(zoom_timeout);
    zoom_rate=parseInt(zoom_rate);
  $("#zoom_show").show();
  $("#zoom_show").html(zoom_rate+'%');
  zoom_timeout=setTimeout(function (){
    $("#zoom_show").hide('fast');
  },1000);
}
function setoperimgbox(){
    var obImage=$("#operimg_box");
    var ob_width = obImage.width();
    var ob_height = obImage.height();
    //alert(ob_width +":"+ob_height);
    var ob_left = (window.innerWidth-ob_width)/2;
    var ob_top = (window.innerHeight-ob_height)/2;
    console.log(ob_left+"   "+ob_top+" "+ ob_width+" "+ob_height+" "+window.innerWidth+" "+window.innerHeight);
    $("#operimg_box").css("left",ob_left).css("top",ob_top);
    $("#mask_bg").show();
    $("#operimg_box").show();
}


/*删除*/
function delimg(index){
    //var imgboxid=$(x).parent().parent().attr("id");
    var smallimgbox='uploadList_'+index;
    $("#"+smallimgbox).remove();

}

function setimgbox(index){
    createOpenBox();
    zoom_rate = 100;
    operimg_id='uploadImage_'+index;

    var smallImg=$("#"+operimg_id);

     // alert(smallImg[0].naturalWidth);

    var naturalWidth=smallImg[0].naturalWidth;
    var naturalHeight=smallImg[0].naturalHeight;
    zoom_rate=600/Math.max(naturalWidth,naturalHeight)*100;

    $("#show_img").attr("src",smallImg.attr('src'));
    $("#mask_bg").show();
    $("#operimg_box").show();
    //$("#show_img").css('width', zoom_rate + '%').css('height', zoom_rate + '%');
    $("#show_img").css('width', naturalWidth*zoom_rate*0.01+'px');

    var num=$("#"+operimg_id).attr('curr_rotate');
    $("#show_img").rotate({angle:90*num});

    $("#delimg").click(function(){
        $("#show_img").attr("src","");
        $("#operimg_box").hide();
        $("#mask_bg").hide();
    });

    setoperimgbox();
}
/**/
//引用初始化JS
$(function(){
    // 初始化插件
    $("#demo").zyUpload({
        width            :   "650px",                 // 宽度
        height           :   "400px",                 // 宽度
        itemWidth        :   "120px",                 // 文件项的宽度
        itemHeight       :   "100px",                 // 文件项的高度
        url              :   "/upload/UploadAction",  // 上传文件的路径
        multiple         :   true,                    // 是否可以多个文件上传
        dragDrop         :   true,                    // 是否可以拖动上传文件
        del              :   true,                    // 是否可以删除文件
        finishDel        :   false,                   // 是否在上传文件完成后删除预览
        /* 外部获得的回调接口 */
        onSelect: function(files, allFiles){                    // 选择文件的回调方法
            console.info("当前选择了以下文件：");
            console.info(files);
            console.info("之前没上传的文件：");
            console.info(allFiles);
        },
        onDelete: function(file, surplusFiles){                     // 删除一个文件的回调方法
            console.info("当前删除了此文件：");
            console.info(file);
            console.info("当前剩余的文件：");
            console.info(surplusFiles);
        },
        onSuccess: function(file){                    // 文件上传成功的回调方法
            console.info("此文件上传成功：");
            console.info(file);
        },
        onFailure: function(file){                    // 文件上传失败的回调方法
            console.info("此文件上传失败：");
            console.info(file);
        },
        onComplete: function(responseInfo){           // 上传完成的回调方法
            console.info("文件上传完成");
            console.info(responseInfo);
        }
    });
});

(function($) {
    var supportedCSS,supportedCSSOrigin, styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
    for (var a = 0; a < toCheck.length; a++) if (styles[toCheck[a]] !== undefined) { supportedCSS = toCheck[a]; }
    if (supportedCSS) {
      supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/,"TransformOrigin");
      if (supportedCSSOrigin[0] == "T") supportedCSSOrigin[0] = "t";
    }

    // Bad eval to preven google closure to remove it from code o_O
    eval('IE = "v"=="\v"');

    jQuery.fn.extend({
        rotate:function(parameters)
        {
          if (this.length===0||typeof parameters=="undefined") return;
          if (typeof parameters=="number") parameters={angle:parameters};
          var returned=[];
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);
            if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {

              var paramClone = $.extend(true, {}, parameters);
              var newRotObject = new Wilq32.PhotoEffect(element,paramClone)._rootObj;

              returned.push($(newRotObject));
            }
            else {
              element.Wilq32.PhotoEffect._handleRotation(parameters);
            }
          }
          return returned;
        },
        getRotateAngle: function(){
          var ret = [];
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);
            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
              ret[i] = element.Wilq32.PhotoEffect._angle;
            }
          }
          return ret;
        },
        stopRotate: function(){
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);
            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
              clearTimeout(element.Wilq32.PhotoEffect._timer);
            }
          }
        }
    });

    // Library agnostic interface

    Wilq32=window.Wilq32||{};
    Wilq32.PhotoEffect=(function(){

      if (supportedCSS) {
        return function(img,parameters){
          img.Wilq32 = {
            PhotoEffect: this
          };

          this._img = this._rootObj = this._eventObj = img;
          this._handleRotation(parameters);
        }
      } else {
        return function(img,parameters) {
          this._img = img;
          this._onLoadDelegate = [parameters];

          this._rootObj=document.createElement('span');
          this._rootObj.style.display="inline-block";
          this._rootObj.Wilq32 =
            {
              PhotoEffect: this
            };
          img.parentNode.insertBefore(this._rootObj,img);

          if (img.complete) {
            this._Loader();
          } else {
            var self=this;
            // TODO: Remove jQuery dependency
            jQuery(this._img).bind("load", function(){ self._Loader(); });
          }
        }
      }
    })();

    Wilq32.PhotoEffect.prototype = {
      _setupParameters : function (parameters){
        this._parameters = this._parameters || {};
        if (typeof this._angle !== "number") { this._angle = 0 ; }
        if (typeof parameters.angle==="number") { this._angle = parameters.angle; }
        this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle);

        this._parameters.step = parameters.step || this._parameters.step || null;
        this._parameters.easing = parameters.easing || this._parameters.easing || this._defaultEasing;
        this._parameters.duration = 'duration' in parameters ? parameters.duration : parameters.duration || this._parameters.duration || 1000;
        this._parameters.callback = parameters.callback || this._parameters.callback || this._emptyFunction;
        this._parameters.center = parameters.center || this._parameters.center || ["50%","50%"];
        if (typeof this._parameters.center[0] == "string") {
          this._rotationCenterX = (parseInt(this._parameters.center[0],10) / 100) * this._imgWidth * this._aspectW;
        } else {
          this._rotationCenterX = this._parameters.center[0];
        }
        if (typeof this._parameters.center[1] == "string") {
          this._rotationCenterY = (parseInt(this._parameters.center[1],10) / 100) * this._imgHeight * this._aspectH;
        } else {
          this._rotationCenterY = this._parameters.center[1];
        }

        if (parameters.bind && parameters.bind != this._parameters.bind) { this._BindEvents(parameters.bind); }
      },
      _emptyFunction: function(){},
      _defaultEasing: function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b },
      _handleRotation : function(parameters, dontcheck){
        if (!supportedCSS && !this._img.complete && !dontcheck) {
          this._onLoadDelegate.push(parameters);
          return;
        }
        this._setupParameters(parameters);
        if (this._angle==this._parameters.animateTo) {
          this._rotate(this._angle);
        }
        else {
          this._animateStart();
        }
      },

      _BindEvents:function(events){
        if (events && this._eventObj)
        {
          // Unbinding previous Events
          if (this._parameters.bind){
            var oldEvents = this._parameters.bind;
            for (var a in oldEvents) if (oldEvents.hasOwnProperty(a))
              // TODO: Remove jQuery dependency
              jQuery(this._eventObj).unbind(a,oldEvents[a]);
          }

        this._parameters.bind = events;
        for (var a in events) if (events.hasOwnProperty(a))
          // TODO: Remove jQuery dependency
          jQuery(this._eventObj).bind(a,events[a]);
        }
      },

      _Loader:(function()
      {
        if (IE)
          return function() {
            var width=this._img.width;
            var height=this._img.height;
            this._imgWidth = width;
            this._imgHeight = height;
            this._img.parentNode.removeChild(this._img);

            this._vimage = this.createVMLNode('image');
            this._vimage.src=this._img.src;
            this._vimage.style.height=height+"px";
            this._vimage.style.width=width+"px";
            this._vimage.style.position="absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
            this._vimage.style.top = "0px";
            this._vimage.style.left = "0px";
            this._aspectW = this._aspectH = 1;

            /* Group minifying a small 1px precision problem when rotating object */
            this._container = this.createVMLNode('group');
            this._container.style.width=width;
            this._container.style.height=height;
            this._container.style.position="absolute";
            this._container.style.top="0px";
            this._container.style.left="0px";
            this._container.setAttribute('coordsize',width-1+','+(height-1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
            this._container.appendChild(this._vimage);

            this._rootObj.appendChild(this._container);
            this._rootObj.style.position="relative"; // FIXES IE PROBLEM
            this._rootObj.style.width=width+"px";
            this._rootObj.style.height=height+"px";
            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
            this._rootObj.className=this._img.className;
            this._eventObj = this._rootObj;
            var parameters;
            while (parameters = this._onLoadDelegate.shift()) {
              this._handleRotation(parameters, true);
            }
          }
          else return function () {
            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
            this._rootObj.className=this._img.className;

            this._imgWidth=this._img.naturalWidth;
            this._imgHeight=this._img.naturalHeight;
            var _widthMax=Math.sqrt((this._imgHeight)*(this._imgHeight) + (this._imgWidth) * (this._imgWidth));
            this._width = _widthMax * 3;
            this._height = _widthMax * 3;

            this._aspectW = this._img.offsetWidth/this._img.naturalWidth;
            this._aspectH = this._img.offsetHeight/this._img.naturalHeight;

            this._img.parentNode.removeChild(this._img);


            this._canvas=document.createElement('canvas');
            this._canvas.setAttribute('width',this._width);
            this._canvas.style.position="relative";
            this._canvas.style.left = -this._img.height * this._aspectW + "px";
            this._canvas.style.top = -this._img.width * this._aspectH + "px";
            this._canvas.Wilq32 = this._rootObj.Wilq32;

            this._rootObj.appendChild(this._canvas);
            this._rootObj.style.width=this._img.width*this._aspectW+"px";
            this._rootObj.style.height=this._img.height*this._aspectH+"px";
            this._eventObj = this._canvas;

            this._cnv=this._canvas.getContext('2d');
            var parameters;
            while (parameters = this._onLoadDelegate.shift()) {
              this._handleRotation(parameters, true);
            }
          }
      })(),

      _animateStart:function()
      {
        if (this._timer) {
          clearTimeout(this._timer);
        }
        this._animateStartTime = +new Date;
        this._animateStartAngle = this._angle;
        this._animate();
      },
      _animate:function()
      {
        var actualTime = +new Date;
        var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

        // TODO: Bug for animatedGif for static rotation ? (to test)
        if (checkEnd && !this._parameters.animatedGif)
        {
          clearTimeout(this._timer);
        }
        else
        {
          if (this._canvas||this._vimage||this._img) {
            var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
            this._rotate((~~(angle*10))/10);
          }
          if (this._parameters.step) {
            this._parameters.step(this._angle);
          }
          var self = this;
          this._timer = setTimeout(function()
          {
            self._animate.call(self);
          }, 10);
        }

      // To fix Bug that prevents using recursive function in callback I moved this function to back
      if (this._parameters.callback && checkEnd){
        this._angle = this._parameters.animateTo;
        this._rotate(this._angle);
        this._parameters.callback.call(this._rootObj);
      }
      },

      _rotate : (function()
      {
        var rad = Math.PI/180;
        if (IE)
          return function(angle)
        {
          this._angle = angle;
          this._container.style.rotation=(angle%360)+"deg";
          this._vimage.style.top = -(this._rotationCenterY - this._imgHeight/2) + "px";
          this._vimage.style.left = -(this._rotationCenterX - this._imgWidth/2) + "px";
          this._container.style.top = this._rotationCenterY - this._imgHeight/2 + "px";
          this._container.style.left = this._rotationCenterX - this._imgWidth/2 + "px";

        }
          else if (supportedCSS)
          return function(angle){
            this._angle = angle;
            this._img.style[supportedCSS]="rotate("+(angle%360)+"deg)";
            this._img.style[supportedCSSOrigin]=this._parameters.center.join(" ");
          }
          else
            return function(angle)
          {
            this._angle = angle;
            angle=(angle%360)* rad;
            // clear canvas
            this._canvas.width = this._width;//+this._widthAdd;
            this._canvas.height = this._height;//+this._heightAdd;

            // REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
            this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH);  // at least center image on screen
            this._cnv.translate(this._rotationCenterX,this._rotationCenterY);     // we move image back to its orginal
            this._cnv.rotate(angle);                    // rotate image
            this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY);   // move image to its center, so we can rotate around its center
            this._cnv.scale(this._aspectW,this._aspectH); // SCALE - if needed ;)
            this._cnv.drawImage(this._img, 0, 0);             // First - we draw image
          }

      })()
      }

      if (IE)
      {
        Wilq32.PhotoEffect.prototype.createVMLNode=(function(){
          document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
          try {
            !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            return function (tagName) {
              return document.createElement('<rvml:' + tagName + ' class="rvml">');
            };
          } catch (e) {
            return function (tagName) {
              return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
          }
        })();
      }

})(jQuery);

var ZYFILE = {
    fileInput : null,             // 选择文件按钮dom对象
    uploadInput : null,           // 上传文件按钮dom对象
    dragDrop: null,         //拖拽敏感区域
    url : "",             // 上传action路径
    uploadFile : [],          // 需要上传的文件数组
    lastUploadFile : [],          // 上一次选择的文件数组，方便继续上传使用
    perUploadFile : [],           // 存放永久的文件数组，方便删除使用
    fileNum : 0,                  // 代表文件总个数，因为涉及到继续添加，所以下一次添加需要在它的基础上添加索引
    /* 提供给外部的接口 */
    filterFile : function(files){ // 提供给外部的过滤文件格式等的接口，外部需要把过滤后的文件返回
      return files;
    },
    onSelect : function(selectFile, files){      // 提供给外部获取选中的文件，供外部实现预览等功能  selectFile:当前选中的文件  allFiles:还没上传的全部文件
      
    },
    onDelete : function(file, files){            // 提供给外部获取删除的单个文件，供外部实现删除效果  file:当前删除的文件  files:删除之后的文件
      
    },
    onProgress : function(file, loaded, total){  // 提供给外部获取单个文件的上传进度，供外部实现上传进度效果
      
    },
    onSuccess : function(file, responseInfo){    // 提供给外部获取单个文件上传成功，供外部实现成功效果
      
    },
    onFailure : function(file, responseInfo){    // 提供给外部获取单个文件上传失败，供外部实现失败效果
    
    },
    onComplete : function(responseInfo){         // 提供给外部获取全部文件上传完成，供外部实现完成效果
      
    },
    
    /* 内部实现功能方法 */
    // 获得选中的文件
    //文件拖放
    funDragHover: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
      return this;
    },
    // 获取文件
    funGetFiles : function(e){  
      var self = this;
      // 取消鼠标经过样式
      this.funDragHover(e);
      // 从事件中获取选中的所有文件
      var files = e.target.files || e.dataTransfer.files;
      self.lastUploadFile = this.uploadFile;
      this.uploadFile = this.uploadFile.concat(this.filterFile(files));
      var tmpFiles = [];
      
      // 因为jquery的inArray方法无法对object数组进行判断是否存在于，所以只能提取名称进行判断
      var lArr = [];  // 之前文件的名称数组
      var uArr = [];  // 现在文件的名称数组
      $.each(self.lastUploadFile, function(k, v){
        lArr.push(v.name);
      });
      $.each(self.uploadFile, function(k, v){
        uArr.push(v.name);
      });
      
      $.each(uArr, function(k, v){
        // 获得当前选择的每一个文件   判断当前这一个文件是否存在于之前的文件当中
        if($.inArray(v, lArr) < 0){  // 不存在
          tmpFiles.push(self.uploadFile[k]);
        }
      });
      
      // 如果tmpFiles进行过过滤上一次选择的文件的操作，需要把过滤后的文件赋值
      //if(tmpFiles.length!=0){
        this.uploadFile = tmpFiles;
      //}
      
      // 调用对文件处理的方法
      this.funDealtFiles();
      
      return true;
    },
    // 处理过滤后的文件，给每个文件设置下标
    funDealtFiles : function(){
      var self = this;
      // 目前是遍历所有的文件，给每个文件增加唯一索引值
      $.each(this.uploadFile, function(k, v){
        // 因为涉及到继续添加，所以下一次添加需要在总个数的基础上添加
        v.index = self.fileNum;
        // 添加一个之后自增
        self.fileNum++;
      });
      // 先把当前选中的文件保存备份
      var selectFile = this.uploadFile;  
      // 要把全部的文件都保存下来，因为删除所使用的下标是全局的变量
      this.perUploadFile = this.perUploadFile.concat(this.uploadFile);
      // 合并下上传的文件
      this.uploadFile = this.lastUploadFile.concat(this.uploadFile);
      
      // 执行选择回调
      this.onSelect(selectFile, this.uploadFile);
      console.info("继续选择");
      console.info(this.uploadFile);
      return this;
    },
    // 处理需要删除的文件  isCb代表是否回调onDelete方法  
    // 因为上传完成并不希望在页面上删除div，但是单独点击删除的时候需要删除div   所以用isCb做判断
    funDeleteFile : function(delFileIndex, isCb){
      var self = this;  // 在each中this指向没个v  所以先将this保留
      
      var tmpFile = [];  // 用来替换的文件数组
      // 合并下上传的文件
      var delFile = this.perUploadFile[delFileIndex];
      console.info(delFile);
      // 目前是遍历所有的文件，对比每个文件  删除
      $.each(this.uploadFile, function(k, v){
        if(delFile != v){
          // 如果不是删除的那个文件 就放到临时数组中
          tmpFile.push(v);
        }else{
          
        }
      });
      this.uploadFile = tmpFile;
      if(isCb){  // 执行回调
        // 回调删除方法，供外部进行删除效果的实现
        self.onDelete(delFile, this.uploadFile);
      }
      
      console.info("还剩这些文件没有上传:");
      console.info(this.uploadFile);
      return true;
    },
    // 上传多个文件
    funUploadFiles : function(){
      var self = this;  // 在each中this指向没个v  所以先将this保留
      // 遍历所有文件  ，在调用单个文件上传的方法
      $.each(this.uploadFile, function(k, v){
        self.funUploadFile(v);
      });
    },
    // 上传单个个文件
    funUploadFile : function(file){
      var self = this;  // 在each中this指向没个v  所以先将this保留
      
      var formdata = new FormData();
      formdata.append("fileList", file);              
      var xhr = new XMLHttpRequest();
      // 绑定上传事件
      // 进度
        xhr.upload.addEventListener("progress",  function(e){
          // 回调到外部
          self.onProgress(file, e.loaded, e.total);
        }, false); 
        // 完成
        xhr.addEventListener("load", function(e){
          // 从文件中删除上传成功的文件  false是不执行onDelete回调方法
          self.funDeleteFile(file.index, false);
          // 回调到外部
          self.onSuccess(file, xhr.responseText);
          if(self.uploadFile.length==0){
            // 回调全部完成方法
            self.onComplete("全部完成");
          }
        }, false);  
        // 错误
        xhr.addEventListener("error", function(e){
          // 回调到外部
          self.onFailure(file, xhr.responseText);
        }, false);  
      
      xhr.open("POST",self.url, true);
      xhr.setRequestHeader("X_FILENAME", file.name);
      xhr.send(formdata);
    },
    // 返回需要上传的文件
    funReturnNeedFiles : function(){
      return this.uploadFile;
    },
    
    // 初始化
    init : function(){  // 初始化方法，在此给选择、上传按钮绑定事件
      var self = this;  // 克隆一个自身
      
      if (this.dragDrop) {
        this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
        this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
        this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
      }
      
      // 如果选择按钮存在
      if(self.fileInput){
        // 绑定change事件
        this.fileInput.addEventListener("change", function(e) {
          self.funGetFiles(e); 
        }, false);  
      }
      
      // 如果上传按钮存在
      if(self.uploadInput){
        // 绑定click事件
        this.uploadInput.addEventListener("click", function(e) {
          self.funUploadFiles(e); 
        }, false);  
      }
    }
};

(function($,undefined){
  $.fn.zyUpload = function(options,param){
    var otherArgs = Array.prototype.slice.call(arguments, 1);
    if (typeof options == 'string') {
      var fn = this[0][options];
      if($.isFunction(fn)){
        return fn.apply(this, otherArgs);
      }else{
        throw ("zyUpload - No such method: " + options);
      }
    }

    return this.each(function(){
      var para = {};    // 保留参数
      var self = this;  // 保存组件对象
      
      var defaults = {
          width            : "700px",           // 宽度
          height           : "400px",           // 宽度
          itemWidth        : "140px",                     // 文件项的宽度
          itemHeight       : "120px",                     // 文件项的高度
          url              : "/upload/UploadAction",    // 上传文件的路径
          multiple         : true,              // 是否可以多个文件上传
          dragDrop         : true,              // 是否可以拖动上传文件
          del              : true,              // 是否可以删除文件
          finishDel        : false,             // 是否在上传文件完成后删除预览
          /* 提供给外部的接口方法 */
          onSelect         : function(selectFiles, files){},// 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
          onDelete     : function(file, files){},     // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
          onSuccess    : function(file){},            // 文件上传成功的回调方法
          onFailure    : function(file){},            // 文件上传失败的回调方法
          onComplete     : function(responseInfo){},    // 上传完成的回调方法
      };
      
      para = $.extend(defaults,options);
      
      this.init = function(){
        this.createHtml();  // 创建组件html
        this.createCorePlug();  // 调用核心js
      };
      
      /**
       * 功能：创建上传所使用的html
       * 参数: 无
       * 返回: 无
       */
      this.createHtml = function(){
        var multiple = "";  // 设置多选的参数
        para.multiple ? multiple = "multiple" : multiple = "";
        var html= '';
        
        if(para.dragDrop){
          // 创建带有拖动的html
          html += '<form id="uploadForm" action="'+para.url+'" method="post" enctype="multipart/form-data">';
          html += ' <div class="upload_box">';
          html += '   <div class="upload_main">';
          html += '     <div class="upload_choose">';
                html += '       <div class="convent_choice">';
                html += '         <div class="andArea">';
                html += '           <div class="filePicker">点击选择文件</div>';
                html += '           <input id="fileImage" type="file" size="30" name="fileselect[]" '+multiple+'>';
                html += '         </div>';
                html += '       </div>';
          html += '       <span id="fileDragArea" class="upload_drag_area">将文件拖到此处</span>';
          html += '     </div>';
                html += '     <div class="status_bar">';
          // athena hide start 20170228
                //html += '       <div id="status_info" class="info">选中0张文件，共0B。</div>';
                html += '       <div id="status_info" class="info"></div>';
          // athena hide start 20170228
                html += '       <div class="btns">';
                html += '         <div class="webuploader_pick">继续选择</div>';
                html += '         <div class="upload_btn">开始上传</div>';
                html += '       </div>';
                html += '     </div>';
          html += '     <div id="preview" class="upload_preview"></div>';
          html += '   </div>';
          html += '   <div class="upload_submit">';
          html += '     <button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button>';
          html += '   </div>';
          html += '   <div id="uploadInf" class="upload_inf"></div>';
          html += ' </div>';
          html += '</form>';
        }else{
          var imgWidth = parseInt(para.itemWidth.replace("px", ""))-15;
          
          // 创建不带有拖动的html
          html += '<form id="uploadForm" action="'+para.url+'" method="post" enctype="multipart/form-data">';
          html += ' <div class="upload_box">';
          html += '   <div class="upload_main single_main">';
                html += '     <div class="status_bar">';
                html += '       <div id="status_info" class="info">选中0张文件，共0B。</div>';
                html += '       <div class="btns">';
                html += '         <input id="fileImage" type="file" size="30" name="fileselect[]" '+multiple+'>';
                html += '         <div class="webuploader_pick">选择文件</div>';
                html += '         <div class="upload_btn">开始上传</div>';
                html += '       </div>';
                html += '     </div>';
                html += '     <div id="preview" class="upload_preview">';
            html += '       <div class="add_upload">';
            html += '         <a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" title="点击添加文件" id="rapidAddImg" class="add_imgBox" href="javascript:void(0)">';
            html += '           <div class="uploadImg" style="width:'+imgWidth+'px">';
            html += '             <a href="http://www.baidu2.com"><img class="upload_image" src="" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" /></a>';
            html += '           </div>';
            html += '         </a>';
            html += '       </div>';
          html += '     </div>';
          html += '   </div>';
          html += '   <div class="upload_submit">';
          html += '     <button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button>';
          html += '   </div>';
          html += '   <div id="uploadInf" class="upload_inf"></div>';
          html += ' </div>';
          html += '</form>';
        }
        
              $(self).append(html).css({"width":para.width,"height":para.height});
              
              // 初始化html之后绑定按钮的点击事件
              this.addEvent();
      };
      
      /**
       * 功能：显示统计信息和绑定继续上传和上传按钮的点击事件
       * 参数: 无
       * 返回: 无
       */
      this.funSetStatusInfo = function(files){
        var size = 0;
        var num = files.length;
        $.each(files, function(k,v){
          // 计算得到文件总大小
          size += v.size;
        });
        
        // 转化为kb和MB格式。文件的名字、大小、类型都是可以现实出来。
        if (size > 1024 * 1024) {                    
          size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';                
        } else {                    
          size = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';                
        }  
        
        // 设置内容
        // athena hide start 20170228
        //$("#status_info").html("选中"+num+"张文件，共"+size+"。");
        // athena hide end 20170228
      };
      
      /**
       * 功能：过滤上传的文件格式等
       * 参数: files 本次选择的文件
       * 返回: 通过的文件
       */
      /* athena add 20170227 start*/
      this.funFilterEligibleFile = function(files){
        var arrFiles = [];  // 替换的文件数组
        for (var i = 0, file; file = files[i]; i++) {
          if(file.type.indexOf("jpeg")<0){
            //alert(file.type);
            alert('图片格式不对，只能上传jpg的图片'); 
            continue;
          }
          if (file.size >= 51200000) {
            alert('您这个"'+ file.name +'"文件大小过大');  
          } else {
            // 在这里需要判断当前所有文件中
            arrFiles.push(file);  
          }
        }
        return arrFiles;
      };
      /* athena add 20170227 end*/
      
      /**
       * 功能： 处理参数和格式上的预览html
       * 参数: files 本次选择的文件
       * 返回: 预览的html
       */
      this.funDisposePreviewHtml = function(file, e){
        var html = "";
        var imgWidth = parseInt(para.itemWidth.replace("px", ""))-15;
        
        // 处理配置参数删除按钮
        var delHtml = "";
        if(para.del){  // 显示删除按钮
          delHtml = '<span class="file_del" data-index="'+file.index+'" title="删除"></span>';
        }
        
        // 处理不同类型文件代表的图标
        var fileImgSrc = "control/images/fileType/";
        if(file.type.indexOf("rar") > 0){
          fileImgSrc = fileImgSrc + "rar.png";
        }else if(file.type.indexOf("zip") > 0){
          fileImgSrc = fileImgSrc + "zip.png";
        }else if(file.type.indexOf("text") > 0){
          fileImgSrc = fileImgSrc + "txt.png";
        }else{
          fileImgSrc = fileImgSrc + "file.png";
        }
        
        
        // 图片上传的是图片还是其他类型文件
        if (file.type.indexOf("image") == 0) {
          html += '<div id="uploadList_'+ file.index +'" class="upload_append_list">';
          html += ' <div class="file_bar">';
          html += '   <div>';
          html += '     <p class="file_name">' + file.name + '</p>';
          html += delHtml;   // 删除按钮的html
          html += '   </div>';
          html += ' </div>';
          //athena 20170228 edit start
          html += ' <a style="width:'+para.itemWidth+';" href="#" class="imgBox">';
          //html += ' <a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" href="#" class="imgBox">';
          html += '   <div class="uploadImg">';
          //html += '   <div class="uploadImg" style="width:'+imgWidth+'px">';
          //athena 20170228 edit start
          html += '     <img id="uploadImage_'+file.index+'" class="upload_image" src="' + e.target.result + '" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" />';
          html += '   </div>';
          html += ' </a>';

          //athena add start 0225
          html += ' <div class="upload_oper_box" id="ddd">';
          //athena add 20170228 start
          // 处理配置参数选择按钮
          html += ' <div class="file_select">';
          html += '   <select id="img_type'+file.index+'">';
          html += '     <option>--请选择--</option>';
          html += '     <option>卫生间</option>';
          html += '     <option>厨房</option>';
          html += '     <option>室内</option>';
          html += '   </select>';
          html += ' </div>';    
          //athena add 20170228 end   
          html += '   <span style="padding-left:15px;padding-right:30px;margin-top:6px;display:inline-block;" onclick="setimgbox('+file.index+')" id="img'+file.index+'">放大</span>&nbsp;';
          //html += '   <span>翻转</span>&nbsp;';
          html += '   <span onclick="delimg('+file.index+')" id="delimg'+file.index+'">删除</span>';
          html += ' </div>';
          //athena add end 0225
          //
          // html += ' <p id="uploadProgress_'+file.index+'" class="file_progress"></p>';
          // html += ' <p id="uploadFailure_'+file.index+'" class="file_failure">上传失败，请重试</p>';
          html += ' <p id="uploadSuccess_'+file.index+'" class="file_success"></p>';
          html += '</div>';
                  
        }else{
          html += '<div id="uploadList_'+ file.index +'" class="upload_append_list">';
          html += ' <div class="file_bar">';
          html += '   <div style="padding:5px;">';
          html += '     <p class="file_name">' + file.name + '</p>';
          html += delHtml;   // 删除按钮的html
          html += '   </div>';
          html += ' </div>';
          html += ' <a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" href="#" class="imgBox">';
          html += '   <div class="uploadImg" style="width:'+imgWidth+'px">';        
          html += '     <a href="http://www.baidu1.com"><img id="uploadImage_'+file.index+'" class="upload_image" src="' + fileImgSrc + '" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" /></a>';
          html += '   </div>';
          html += ' </a>';
          // html += ' <p id="uploadProgress_'+file.index+'" class="file_progress"></p>';
          // html += ' <p id="uploadFailure_'+file.index+'" class="file_failure">上传失败，请重试</p>';
          html += ' <p id="uploadSuccess_'+file.index+'" class="file_success"></p>';
          html += '</div>';
        }
        
        return html;
      };

      this.createCorePlug = function(){
        var params = {
          fileInput: $("#fileImage").get(0),
          uploadInput: $("#fileSubmit").get(0),
          dragDrop: $("#fileDragArea").get(0),
          url: $("#uploadForm").attr("action"),
          
          filterFile: function(files) {
            // 过滤合格的文件
            return self.funFilterEligibleFile(files);
          },
          onSelect: function(selectFiles, allFiles) {
            para.onSelect(selectFiles, allFiles);  // 回调方法
            self.funSetStatusInfo(ZYFILE.funReturnNeedFiles());  // 显示统计信息
            var html = '', i = 0;
            // 组织预览html
            var funDealtPreviewHtml = function() {
              file = selectFiles[i];
              if (file) {
                var reader = new FileReader()
                reader.onload = function(e) {
                  // 处理下配置参数和格式的html
                  html += self.funDisposePreviewHtml(file, e);
                  
                  i++;
                  // 再接着调用此方法递归组成可以预览的html
                  funDealtPreviewHtml();
                }
                reader.readAsDataURL(file);
              } else {
                // 走到这里说明文件html已经组织完毕，要把html添加到预览区
                funAppendPreviewHtml(html);
              }
            };
            
            // 添加预览html
            var funAppendPreviewHtml = function(html){
              // 添加到添加按钮前
              if(para.dragDrop){
                $("#preview").append(html);
              }else{
                $(".add_upload").before(html);
              }
              // 绑定删除按钮
              funBindDelEvent();
              funBindHoverEvent();
            };
            
            // 绑定删除按钮事件
            var funBindDelEvent = function(){
              if($(".file_del").length>0){
                // 删除方法
                $(".file_del").click(function() {
                  ZYFILE.funDeleteFile(parseInt($(this).attr("data-index")), true);
                  return false; 
                });
              }
              
              if($(".file_edit").length>0){
                // 编辑方法
                $(".file_edit").click(function() {
                  // 调用编辑操作
                  //ZYFILE.funEditFile(parseInt($(this).attr("data-index")), true);
                  return false; 
                });
              }
            };
            
            // 绑定显示操作栏事件
            var funBindHoverEvent = function(){
              $(".upload_append_list").hover(
                function (e) {
                  $(this).find(".file_bar").addClass("file_hover");
                },function (e) {
                  $(this).find(".file_bar").removeClass("file_hover");
                }
              );
            };
            
            funDealtPreviewHtml();    
          },
          onDelete: function(file, files) {
            // 移除效果
            $("#uploadList_" + file.index).fadeOut();
            // 重新设置统计栏信息
            self.funSetStatusInfo(files);
            console.info("剩下的文件");
            console.info(files);
          },
          onProgress: function(file, loaded, total) {
            var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
            if(eleProgress.is(":hidden")){
              eleProgress.show();
            }
            eleProgress.css("width",percent);
          },
          onSuccess: function(file, response) {
            $("#uploadProgress_" + file.index).hide();
            $("#uploadSuccess_" + file.index).show();
            $("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
            // 根据配置参数确定隐不隐藏上传成功的文件
            if(para.finishDel){
              // 移除效果
              $("#uploadList_" + file.index).fadeOut();
              // 重新设置统计栏信息
              self.funSetStatusInfo(ZYFILE.funReturnNeedFiles());
            }
          },
          onFailure: function(file) {
            $("#uploadProgress_" + file.index).hide();
            $("#uploadSuccess_" + file.index).show();
            $("#uploadInf").append("<p>文件" + file.name + "上传失败！</p>");  
            //$("#uploadImage_" + file.index).css("opacity", 0.2);
          },
          onComplete: function(response){
            console.info(response);
          },
          onDragOver: function() {
            $(this).addClass("upload_drag_hover");
          },
          onDragLeave: function() {
            $(this).removeClass("upload_drag_hover");
          }

        };
        
        ZYFILE = $.extend(ZYFILE, params);
        ZYFILE.init();
      };
      
      this.addEvent = function(){
        // 如果快捷添加文件按钮存在
        if($(".filePicker").length > 0){
          // 绑定选择事件
          $(".filePicker").bind("click", function(e){
                  $("#fileImage").click();
                });
        }
              
        // 绑定继续添加点击事件
        $(".webuploader_pick").bind("click", function(e){
                $("#fileImage").click();
              });
        
        // 绑定上传点击事件
        $(".upload_btn").bind("click", function(e){
          // 判断当前是否有文件需要上传
          if(ZYFILE.funReturnNeedFiles().length > 0){
            $("#fileSubmit").click();
          }else{
            alert("请先选中文件再点击上传");
          }
              });
        
        // 如果快捷添加文件按钮存在
        if($("#rapidAddImg").length > 0){
          // 绑定添加点击事件
          $("#rapidAddImg").bind("click", function(e){
            $("#fileImage").click();
                });
        }
      };

      // 初始化上传控制层插件
      this.init();
    });
  };
})(jQuery);

// 设备添加03结束