//wait 3 seconds before displaying images
setTimeout(()=>{
    $(".project-grid").css("display", "block")
    $(".desc").css("display", "block")
    }, 800)

//if the navbar is clicked from a blog post, navigate to
//the desired page by looking at the value assigned to the
//route variable. If there is no route variable, and the
//page is opened organically, display the about section
//document.addEventListener('DOMContentLoaded', function() {
$(document).ready(function() {
    if (localStorage.getItem("route") == "about") {  

        $("#projects_section").css("display", "none");
        $("#contact_section").css("display", "none");
        $("#about_section").css("display", "block");

        $(".nav-link").removeClass("active");
        $(".about_link").addClass("active");
        localStorage.clear()

    } else if (localStorage.getItem("route") == "projects") {

        $("#about_section").css("display", "none");
        $("#contact_section").css("display", "none");
        $("#projects_section").css("display", "block");

        $(".nav-link").removeClass("active");
        $(".projects_link").addClass("active");
        localStorage.clear()

    } else if (localStorage.getItem("route") == "contact") {

        $("#about_section").css("display", "none");
        $("#projects_section").css("display", "none");
        $("#contact_section").css("display", "block");

        $(".nav-link").removeClass("active");
        $(".contact_link").addClass("active");
        localStorage.clear()

    } else {

        $("#projects_section").css("display", "none");
        $("#contact_section").css("display", "none");
        $("#about_section").css("display", "block");
        
        $(".nav-link").removeClass("active");
        $(".about_link").addClass("active");
    }
});

//load contact information
$(function(){
    $("#contact_section").load("assets/contact.html"); 
});

//nav bar links active switch and div visibility switch
$(".nav-link").click(function(){
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
    if ($(this).hasClass("about_link")) {
        $("#projects_section").css("display", "none");
        $("#contact_section").css("display", "none");
        $("#about_section").css("display", "block");
    } else if ($(this).hasClass("projects_link")) {
        $("#contact_section").css("display", "none");
        $("#about_section").css("display", "none");
        $("#projects_section").css("display", "block");
    } else if ($(this).hasClass("contact_link")) {
        $("#about_section").css("display", "none");
        $("#projects_section").css("display", "none");
        $("#contact_section").css("display", "block");
    }
});