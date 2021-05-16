$(function () {
    // 1.全选 全不选 功能模块
    // 就是把全选按钮(checkall)的状态赋值给 三个小的按钮(j-checkbox)就可以了
    // 事件可以使用change
    $(".checkall").change(function () {
        // console.log($(this).prop("checked"));
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        getSum();
        if ($(this).prop("checked")) {
            // 让所有的商品添加check-cart-item类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2.如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选
    $(".j-checkbox").change(function () {
        /* if (被选中的小的复选框个数 == 3) {
            就要选择全选按钮
        } else {
            不要选中全选按钮
        } */
        // console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox").length  是所有的小复选框的个数
        if (($(".j-checkbox:checked").length) === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true)
        } else {
            $(".checkall").prop("checked", false)
        }
        getSum();
        if ($(this).prop("checked")) {
            // 让当前的商品添加check-cart-item类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })
    // 3.增减商品数量模块  首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $(".increment").click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        // 3.计算小计模块  每次点击+号或者-号，根据文本框的值 乘以 当前商品的价格（p-price） 就是 商品的小计(p-sum)
        // 当前商品价格 p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2); // 可单独声明 也可直接使用在目标值上
        // 小计模块
        // toFixed(2) 可以让我们保留两位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    $(".decrement").click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false; // 程序里碰到return 后面的代码就不去执行了❤
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // var p = $(this).parent().parent().siblings(".p-price").html();
        // parents(".p-num") 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // 小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 4.用户修改文本框的值 计算 小计模块
    $(".itxt").change(function () {
        // 先得到文本框里面的值 乘以 当前商品的单价
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 5.计算总计和总额模块
    getSum(); // 页面打开时调用
    function getSum() {
        var count = 0; // 计算总件数
        var money = 0; // 计算总价钱
        //  计算的是被选中的商品总件数更合逻辑$(".j-checkbox:checked").parents(".cart-item").find(".itxt")，此处pink老师直接使用的$(".itxt"),所以代码有差异❤❤
        $(".j-checkbox:checked").parents(".cart-item").find(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".j-checkbox:checked").parents(".cart-item").find(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1)); // ❤
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 6.删除商品模块
    // (1)商品后面的删除按钮
    $(".p-action a").click(function () {
        // 删除的是当前的商品
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2)删除选中的商品
    $(".remove-batch").click(function () {
        // 删除的是小的复选框中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3)清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    });

})