$(function () {

    var swiper1 = new Swiper("#swiper1", {
        slidesPerView: 4,
        initialSlide: 999,
        spaceBetween: 0,
        speed: 1000,
        prevButton: ".swiper-button-prev-roadline",
        nextButton: ".swiper-button-next-roadline",
    })


    // function start() {
    // observeParents: true  解决display none的问题
    var swiper2 = new Swiper('#swiper2', {
        direction: 'horizontal',
        // 前进后退按钮
        nextButton: '.swiper-button-next-partner-2',
        prevButton: '.swiper-button-prev-partner-2',
        observeParents: true,
        observer: true
    })
    // swiper2.slideTo(0, 300, false)

    var swiper3 = new Swiper('#swiper3', {
        direction: 'horizontal',
        // 前进后退按钮
        nextButton: '.swiper-button-next-partner-3',
        prevButton: '.swiper-button-prev-partner-3',
        observeParents: true,
        observer: true
    })
    // swiper3.slideTo(0, 300, false)

    var swiper4 = new Swiper('#swiper4', {
        direction: 'horizontal',
        // 前进后退按钮
        nextButton: '.swiper-button-next-partner-4',
        prevButton: '.swiper-button-prev-partner-4',
        observeParents: true,
        observer: true
    })
    // swiper4.slideTo(0, 300, false)

    var swiper5 = new Swiper('#swiper5', {
        direction: 'horizontal',
        // 前进后退按钮
        nextButton: '.swiper-button-next-partner-5',
        prevButton: '.swiper-button-prev-partner-5',
        observeParents: true,
        observer: true
    })
    // swiper5.slideTo(0, 300, false)

    // }



    // start()


    // 这里在切换tab以及对应的swiper
    $('.partner_subhead_normal').click(function () {
        var dataid = $(this).attr("data-id") - 1
        $($('.partner_swiper').get(dataid)).addClass('partner_swiper_active')
        $($('.partner_swiper').get(dataid)).siblings().removeClass('partner_swiper_active')

        $(this).addClass('partner_subhead_active')
        $(this).siblings().removeClass('partner_subhead_active')

        // 为了每次都显示第一页
        swiper2.slideTo(0, 300, false)
        swiper3.slideTo(0, 300, false)
        swiper4.slideTo(0, 300, false)
        swiper5.slideTo(0, 300, false)

    })

    // fit
    $('.header_more').click(function (e) {
        stopFunc(e)
        $('.header_more_box').toggle()
    })

    $('.header_more_box').click(function (e) {
        stopFunc(e)
    })

    $('.header_more_box_xiala').click(function () {
        // console.log($(this).attr("pull-id") - 1)
        var pullid = $(this).attr("pull-id") - 1
        $($('.header_more_box_pull').get(pullid)).toggle()
    })

    $(document).on('scroll', function () {
        // alert(1111)
        $('.header_more_box').css({ 'display': 'none' })
    })

    //阻止事件向上传递
    function stopFunc(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }

    $(document).click(function () {
        $('.header_more_box').css({ 'display': 'none' })
    })


}


)