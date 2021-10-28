// create a new comment

const newFormHandler = async (event) => {
    event.preventDefault();

    const comment_contents = document.querySelector("#floatingTextarea").value;

    if (comment_contents) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ comment_contents }),
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