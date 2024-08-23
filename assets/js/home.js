$(function() {
    var value = localStorage.getItem("isLogin");
    if(value == 'true'){
        $("#mb-avatarlogin").addClass('hide');
        $("#avatarlogin").addClass('hide');
        $("#mb-avatarlogout").removeClass('hide');
        $("#avatarlogout").removeClass('hide');
    }else{
        $("#avatarlogout").addClass('hide');
        $("#mb-avatarlogout").addClass('hide');
        $("#avatarlogin").removeClass('hide');
        $("#mb-avatarlogin").removeClass('hide');
    }
    $('[action-toggle]').on('click', function() {
        localStorage.setItem('isLogin', 'false');
    });
    // $('#rocketchat-iframe').click();
    // document.querySelector('[data-qa-id]').click();
    // document.querySelector('.header__title__PHlOn').click();
    // document.querySelector('.header__title__PHlOn').textContent = "HND Auto";
});


