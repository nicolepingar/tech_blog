//create a new comment

const buttons = document.getElementsByClassName("postCommentButton")

const newFormHandler = async (event) => {
    event.preventDefault();

    const post_id = parseInt(event.target.getAttribute('data-id'))
    console.log(post_id);

    const comment_contents = document.querySelector(`.class${post_id}`).value;

    if (comment_contents && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_contents, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();

        } else {
            alert('Failed to create comment.');
        }
    }
};

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', newFormHandler);

}

// document
//     .querySelector('.postCommentButton')
//     .addEventListener('click', newFormHandler);