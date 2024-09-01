const postCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-content').value.trim();
    const post_id = event.target.getAttribute('data-post-id');

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create comment');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', postCommentHandler);