const deleteUserButton     = $("#delete-user"),
      saveEditedUserButton = $("#edit-user")

// Send User Delete Request When Delete Button Clicked
deleteUserButton.on("click", function (e) {

    const userId =  $(this).attr("data-user-id")
    $.ajax({
        type: "DELETE",
        url: `/user/${userId}`,
        success: function (response) {
            console.log("Success>>>>>", response);
            alert("We Will Miss You")
            location.replace("/")
            
        }, 
        error: function (err) {
            console.log("Error >>>>>", err);
        }
    });
})

// Send New Info To Save On Save Button Click
saveEditedUserButton.on("click", function (e) {  
    
    // Get New User Data
    let editedUserInfo = getEditedUserInfo()
    $.ajax({
        type: "put",
        url: `/user/${$(this).attr('data-user-id')}`,
        data: editedUserInfo,
        success: function (response) {
            console.log("Success >>>>>", response);
            alert(response.msg)
            location.replace("/dashboard")
        },
        error: function (err) {
            console.log("Error >>>>>", err);
            alert(err)
        }
    });
})

function getEditedUserInfo () {
    return {
        username: $("[name='username']").val(),
        password: $("[name='password']").val()    }
}
    