! function () {
    function n(n, e, t) {
        return n.getAttribute(e) || t
    }

    function e(n) {
        return document.getElementsByTagName(n)
    }

    function t() {
        var t = e("script"),
            o = t.length,
            i = t[o - 1];
        return {
            l: o,
            z: n(i, "zIndex", 9),
            o: n(i, "opacity", 1),
            c: n(i, "color", "0,0,0"),
            n: n(i, "count", 70),
            h: n(i, "height", window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
        }
    }

    function o() {
        a = m.width = document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth,
            // c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            // 画布的宽高，我要能传进来
            // a = m.width = d.w,
            c = m.height = d.h
    }

    function i() {
        // 清空m的2d图,左上角坐标，宽高
        r.clearRect(0, 0, a, c);
        var n, e, t, o, m, l;
        // 遍历s
        s.forEach(function (i, x) {
            for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - 0.5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e],
                null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y,
                    l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m),
                        t = (n.max - l) / n.max,
                        r.beginPath(),
                        // 线条宽度
                        // r.lineWidth = t / 0.25,
                        r.lineWidth = 1,
                        // r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")",
                        // 线条的颜色
                        r.strokeStyle = "#330e71",
                        r.moveTo(i.x, i.y),
                        r.lineTo(n.x, n.y),
                        // 开始画图
                        r.stroke()))
            r.beginPath();
            // 创建曲线
            r.arc(i.x, i.y, 4, 0, 360, false);
            // 填充颜色
            r.fillStyle = "#330e71"; //填充颜色,默认是黑色
            r.fill(); //画实心圆
            r.closePath();
        }),
            x(i)
    }
    // 创建画布
    var a, c, u, m = document.createElement("canvas"),
        // 得到对象
        d = t(),
        // 字符串拼接？？？
        l = "c_n" + d.l,
        // m的2d图？？
        r = m.getContext("2d"),
        // 
        x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (n) {
                window.setTimeout(n, 1e3 / 45)
            },
        w = Math.random,
        y = {
            x: null,
            y: null,
            max: 2e4
        };
    m.id = l,
        // 这里改画布的样式，固定定位，只能往body元素里面加，不过也够了，怎么都是逗号？？？？
        m.style.cssText = "position:absolute;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o,
        // e("body")[0].appendChild(m),
        document.getElementsByClassName("banner")[0].appendChild(m),
        o(),
        // 窗口发生改变时调用函数o，重新调整画布宽高
        window.onresize = o,
        window.onmousemove = function (n) {
            // 卧槽！为什么是-200
            // 要减去头部的高
            n = n || window.event, y.x = n.clientX, y.y = n.clientY - 88
        },
        window.onmouseout = function () {
            y.x = null, y.y = null
        };
    for (var s = [], f = 0; d.n > f; f++) {
        var h = w() * a,
            g = w() * c,
            v = 2 * w() - 1,
            p = 2 * w() - 1;
        s.push({
            x: h,
            y: g,
            xa: v,
            ya: p,
            max: 6e3
        })
    }
    u = s.concat([y]),
        setTimeout(function () {
            i()
        }, 100)
}();