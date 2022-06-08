$('#projects_section').load('assets/projects.html', function() {
    //initial load page
    var lower_row_page_num = 0;
    var upper_row_page_num = 2;
    //display the first two rows for the first page
    $(".project_row").slice(lower_row_page_num, upper_row_page_num).show();

    //on next page click
    $(".next_page").click(function(){
        if  ($(".next-btn").attr('disabled')) { 
            return;
        }
        else {
            $(".project_row").slice(lower_row_page_num, upper_row_page_num).hide();
            lower_row_page_num += 2;
            upper_row_page_num += 2;
            $(".project_row").slice(lower_row_page_num, upper_row_page_num).show();
                if ($(".project_row").length == upper_row_page_num) {
                    $('.next-btn').prop("disabled", true);
                }
                if (lower_row_page_num != 0) {
                    $('.back-btn').prop("disabled", false);
                }
        }
    })

    //back page click
    $(".back_page").click(function(){
        if  ($(".back-btn").attr('disabled')) { 
            return;
        }
        else {
            $(".project_row").slice(lower_row_page_num, upper_row_page_num).hide();
            lower_row_page_num -= 2;
            upper_row_page_num -= 2;
            $(".project_row").slice(lower_row_page_num, upper_row_page_num).show();
                if ($(".project_row").length != upper_row_page_num) {
                    $('.next-btn').prop("disabled", false);
                }
                if (lower_row_page_num === 0) {
                    $('.back-btn').prop("disabled", true);
                }
    }
    })
});