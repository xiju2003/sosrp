/*
 *
 * Copyright (c) 2016
 * Author: Smarttang
 * Github: https://github.com/smarttang/
 * ======
 * 用语实现一些封装后的方法
 */

var myajax,alerts,huineng,smarttang;

(function(){
    
    "use strict";

    smarttang = {
        // 获得modal里面的form表单信息
        getModal: function(formId) {
            return huineng.getFormData($('.modal-body ' + formId));
        },

        // 创建按钮
        createButton: function(Btittle,Bicon,Bjquery)
        {
            return '<a data-toggle="tooltip" title="'+ Btittle +'" class="fa '+ Bicon +'" href="#" onclick="'+ Bjquery +';"></a> &nbsp;'
        },

        // 获得所有的参数
        getParamts: function(initdom)
        {
            var _$keys = [
                'input',
                'select',
                'textarea'
            ];

            var _$results = {};

            for (var i in _$keys){
                $(initdom + ' ' + _$keys[i]).each(function(){
                    var _$name = $(this).prop('name');

                    if (_$name != ""){
                        _$results[$(this).prop('name')] = $(this).val();
                    }
                });
            }

            return _$results;
        },

        // 绘制hcharts图
        createHcharts: function(params)
        {
            if (document.getElementById(params.DomName)){
                var _$charts_values = '';
                // 定义全局的values
                var _$charts_global = {
                    title: {
                        text: ''
                    },
                    legend: {
                        enabled: false
                    }
                };

                if (params.type == 'pie'){
                    _$charts_values = $.extend(_$charts_global,{
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },

                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer'
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: params.dataName,
                            data: params.dataSource
                        }]
                    });

                    
                }else if(params.type == 'column'){
                    if (params.pointFormatV == undefined){
                        params.pointFormatV = '累计: <b>{point.y:.1f} 次</b>';
                    }

                    if (params.rotationV == undefined){
                        params.rotationV = -65;
                    }

                    _$charts_values = $.extend(_$charts_global,{
                        chart: {
                            type: 'column'
                        },
                        xAxis: {
                            type: 'category',
                            labels: {
                                rotation: params.rotationV
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: ''
                            }
                        },

                        tooltip: {
                            pointFormat: params.pointFormatV
                        },
                        series: [{
                            colorByPoint: true,
                            data: params.dataSource,
                            dataLabels: {
                                enabled: true,
                                rotation: -90,
                                color: '#FFFFFF',
                                align: 'right',
                                format: '{point.y:.1f}',
                            }
                        }]
                    });
                }

                // 初始化
                $('#'+params.DomName).highcharts(_$charts_values);
            }
        }
    };

    myajax = {
        // post请求方法
        // remoteurl 远程地址
        // parames 参数
        // success() 成功后执行的内容
        post: function(obj)
        {
            if (typeof(obj.async) == "undefined"){
                obj.async = true;
            }
            $.ajax({
                type: 'POST',
                url: obj.remoteurl,
                data: obj.parames,
                async: obj.async,
                dataType: 'json',
                success:obj.success
            }); 
        },
        get: function(obj)
        {
            if (typeof(obj.async) == "undefined"){
                obj.async = true;
            }
            $.ajax({
                type: 'GET',
                url: obj.remoteurl,
                async: obj.async,
                dataType: 'json',
                success:obj.success
            })
        }
    };
    // 提示工具
    alerts = {
        // modal 视图
        modal: function(obj)
        {
            if (obj.status == 'small'){
                if ($('#modal-job').hasClass('modal-lg')){
                    $('#modal-job').removeClass('modal-lg');
                }
            }else{
                if (!$('#modal-job').hasClass('modal-lg')){
                    $('#modal-job').addClass('modal-lg');
                }
            }
            // 清空内容
            $(".modal .modal-title").html('');
            $(".modal .modal-body").html('');
            // 填充内容
            $(".modal .modal-title").html(obj.title);
            $(".modal .modal-body").html(obj.body);

            // 判断是否用bottom
            if (obj.bottom != undefined){
                $('.modal .modal-footer').html(obj.bottom);
            }else{
                $('.modal .modal-footer').html('<button data-dismiss="modal" class="btn btn-primary" type="button">关闭</button>');
            }

            // 判断当前是否开启
            // 如果开启则关闭，再开
            if ($('.modal').hasClass('in')){
                $(".modal").modal('hide');
                $(".modal").modal('show');
            }else{
                $(".modal").modal('show');
            }
        }
    };
})(jQuery);
