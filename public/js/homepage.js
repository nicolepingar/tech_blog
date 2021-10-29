//create a new comment

const newFormHandler = async (event) => {
    event.preventDefault();

    let post_id = parseInt(event.target.getAttribute('data-id'))

    const comment_contents = document.querySelector("#floatingTextarea").value;

    if (comment_contents && post_id) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ comment_contents, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
            console.log("YOU GOT HERE");
        } else {
            alert('Failed to create comment.');
        }
    }
};

document
    .querySelector('.postCommentButton')
    .addEventListener('click', newFormHandler);