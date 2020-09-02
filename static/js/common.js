$(function () {
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
})