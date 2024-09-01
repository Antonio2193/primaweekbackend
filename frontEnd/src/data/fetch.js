export const loadPosts = async () => {
    const res = await fetch('http://localhost:5000/api/v1/blogPosts');
    const data = await res.json();
    return data;
}

export const newPost = async (formValue) => {
    /* const formData = new FormData(); */
    /* formData.append('category', formValue.category);
    formData.append('title', formValue.title);
    /* formData.append('cover', formValue.cover); */
   /*  formData.append('readTime',JSON.stringify(formValue.readTime));
    formData.append('author', formValue.author);
    formData.append('content', formValue.content); */ 
    const res = await fetch('http://localhost:5000/api/v1/blogPosts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formValue)
        
    });
    const data = await res.json();
    return data;
}

