// deleting a post
const deleteButton = document.getElementsByClassName("deletePost")
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-delete')) {
        const id = event.target.getAttribute('data-delete');
        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};
// loops through all buttons with "deleteButton" class 
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', delButtonHandler);
}

//updating a post
const updateButton = document.getElementsByClassName("postCommentButton")
const updateButtonHandler = async (event) => {
    const body = document.querySelector('.comment-input').value.trim(); //!!! has to know which comment 
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'UPDATE',
            body: JSON.stringify({})
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
};
// loops through all buttons with "deleteButton" class 
for (let i = 0; i < updateButton.length; i++) {
    updateButton[i].addEventListener('click', updateButtonHandler);
}