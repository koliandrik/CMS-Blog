const postDelete = document.querySelectorAll('.delete-post');
const postEdit = document.querySelectorAll('.edit-post');

const deletePost = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-post-id');
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
};

const editPost = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-post-id');
    document.location.replace(`/edit/${id}`);
};

postDelete.forEach((button) => {
    button.addEventListener('click', deletePost);
});

postEdit.forEach((button) => {
    button.addEventListener('click', editPost);
});
