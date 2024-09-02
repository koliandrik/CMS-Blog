const postCommentHandler = async (event) => {
    event.preventDefault();
 
    const comment_text = document.querySelector('#comment-content').value.trim();
    const post_id = event.target.getAttribute('data-post-id');


    if (comment_text && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);

        if (response.ok) {
            document.location.reload();
        } else {
            console.log(response); // Log the response object for debugging
            alert('Failed to post comment');
        }
    } else {
        alert('Comment content/post ID is missing.');
}
};


document
    .querySelector('.post-comment')
    .addEventListener('click', postCommentHandler);