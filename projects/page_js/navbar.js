//nav bar links and div switch
$(".nav-link").click(function(){
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
    if ($(this).hasClass("about_link")) {
        var route_name = "about";
        localStorage.setItem("route", route_name);

        window.location.href='../index.html';
    } else if ($(this).hasClass("projects_link")) {
        var route_name = "projects";
        localStorage.setItem("route", route_name);

        window.location.href='../index.html';
    } else if ($(this).hasClass("contact_link")) {
        var route_name = "contact";
        localStorage.setItem("route", route_name);

        window.location.href='../index.html';
    }
});