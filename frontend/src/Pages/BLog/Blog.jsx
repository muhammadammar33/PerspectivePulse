import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { getAllBlogs } from "../../api/internal";
import styles from "./Blog.module.css";
import { useNavigate } from "react-router-dom";

function Blog() {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        (async function getAllBlogsApiCall() {
        const response = await getAllBlogs();

        if (response.status === 200) {
            setBlogs(response.data.blogs);
        }
        })();

        setBlogs([]);
    }, []);

    if (blogs.length === 0) {
        return <Loader text="Blogs" />;
    }

    const truncateContent = (content, wordLimit) => {
        const words = content.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return content;
    };

    return (
        <>
        <p>Explore the latest blogs and discover new perspectives.</p>
        <div className={styles.blogsWrapper}>
        {blogs.map((blog) => (
            <div
                id={blog._id}
                className={styles.blog}
                onClick={() => navigate(`/blog/${blog._id}`)}
            >
                <h1>{blog.title}</h1>
                <img src={blog.photo} alt={blog.title}/>
                <div className={styles.content}>
                    {truncateContent(blog.content, 100)}
                </div>
            </div>
        ))}
        </div>
        </>
    );
}

export default Blog;