import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, ChevronRight, Search, ArrowRight, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

function BlogsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });
    const [selectedBlog, setSelectedBlog] = useState<any>(null);

    const categories = [
        'All', 'Technology', 'Web Development', 'Mobile Apps', 'Cloud Computing',
        'AI & Machine Learning', 'Digital Marketing', 'Business'
    ];

    const blogPosts = [
        {
            id: 1,
            title: 'The Future of Cross-Platform Development in 2025',
            excerpt: 'Explore the latest trends and technologies shaping the future of cross-platform app development and how businesses can leverage them.',
            category: 'Mobile Apps',
            date: 'March 15, 2025',
            readTime: '8 min read',
            image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            featured: true
        },
        {
            id: 2,
            title: 'How AI is Transforming Software Development',
            excerpt: 'Discover how artificial intelligence is revolutionizing the way we build, test, and deploy software applications.',
            category: 'AI & Machine Learning',
            date: 'March 10, 2025',
            readTime: '6 min read',
            image: 'https://media.istockphoto.com/id/2092028381/photo/ai-image-creation-technology-man-use-ai-software-on-a-laptop-to-generate-images-showcasing-a.jpg?s=1024x1024&w=is&k=20&c=sKhKtzGITTNBF6o6pnqcVMm3tC-BiijiipuInXqM2Ao=',
            featured: true
        },
        {
            id: 3,
            title: 'Building Scalable SaaS Solutions: Best Practices',
            excerpt: 'Learn the key architectural principles and development practices for creating SaaS applications that can scale with your business.',
            category: 'Cloud Computing',
            date: 'February 28, 2025',
            readTime: '10 min read',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
            featured: false
        },
        {
            id: 4,
            title: 'The Complete Guide to SEO for Tech Companies',
            excerpt: 'A comprehensive guide to search engine optimization strategies specifically tailored for technology companies and startups.',
            category: 'Digital Marketing',
            date: 'February 25, 2025',
            readTime: '12 min read',
            image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            featured: false
        },
        {
            id: 5,
            title: 'React vs Angular: Choosing the Right Framework',
            excerpt: 'An in-depth comparison of React and Angular to help you decide which framework is best suited for your next web project.',
            category: 'Web Development',
            date: 'February 22, 2025',
            readTime: '9 min read',
            image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            featured: false
        },
        {
            id: 6,
            title: 'Securing Your API: Authentication Best Practices',
            excerpt: 'Learn essential strategies for implementing robust authentication and authorization in your API endpoints.',
            category: 'Technology',
            date: 'February 18, 2025',
            readTime: '7 min read',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            featured: false
        }
    ];

    // Filter blogs based on active category and search query
    const filteredBlogs = blogPosts.filter(blog => {
        const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Get featured blogs
    const featuredBlogs = blogPosts.filter(blog => blog.featured);

    // Handle newsletter subscription
    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setSubscriptionStatus({
                type: 'error',
                message: 'Please enter a valid email address.'
            });
            return;
        }

        setIsSubmitting(true);
        setSubscriptionStatus({ type: 'info', message: 'Processing your subscription...' });

        try {
            // First check if email already exists
            const { data: existingEmails, error: checkError } = await supabase
                .from('newsletter')
                .select('email')
                .eq('email', email)
                .limit(1);

            if (checkError) throw checkError;

            // If email already exists
            if (existingEmails && existingEmails.length > 0) {
                setSubscriptionStatus({
                    type: 'info',
                    message: 'You are already subscribed to our newsletter!'
                });
                return;
            }

            // If email doesn't exist, add it to the database
            const { error: insertError } = await supabase
                .from('newsletter')
                .insert([{ email }]);

            if (insertError) throw insertError;

            // Success
            setSubscriptionStatus({
                type: 'success',
                message: 'Thank you for subscribing to our newsletter!'
            });
            setEmail(''); // Clear the input field
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            setSubscriptionStatus({
                type: 'error',
                message: 'There was an error processing your subscription. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle blog selection
    const handleBlogClick = (blog: any) => {
        setSelectedBlog(blog);
        // Update URL without full page navigation - for custom domain use direct path
        window.history.pushState(
            { blogId: blog.id },
            '',
            `/blogs/${blog.id}`
        );
        window.scrollTo(0, 0);
    };

    // Handle back navigation
    const handleBackToBlogs = () => {
        setSelectedBlog(null);
        window.history.pushState({}, '', `/blogs`);
        window.scrollTo(0, 0);
    };

    // Check URL on load to see if we should display a specific blog
    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const blogIdFromUrl = pathParts[pathParts.length - 1];

        // If there's a numeric ID in the URL
        if (!isNaN(Number(blogIdFromUrl))) {
            const blogId = Number(blogIdFromUrl);
            const blog = blogPosts.find(post => post.id === blogId);
            if (blog) {
                setSelectedBlog(blog);
            }
        }
    }, []);

    // Listen for popstate events (browser back/forward)
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.blogId) {
                const blog = blogPosts.find(post => post.id === event.state.blogId);
                if (blog) {
                    setSelectedBlog(blog);
                }
            } else {
                setSelectedBlog(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // If a blog is selected, show the blog detail view
    if (selectedBlog) {
        return (
            <div className="bg-black text-white min-h-screen pt-24">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    {/* Back button */}
                    <button
                        onClick={handleBackToBlogs}
                        className="flex items-center text-blue-500 hover:text-blue-400 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Blogs
                    </button>

                    {/* Blog Header */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedBlog.title}</h1>

                    {/* Blog meta */}
                    <div className="flex flex-wrap items-center text-gray-400 gap-4 mb-8">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {selectedBlog.date}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {selectedBlog.readTime}
                        </div>
                        <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-2" />
                            {selectedBlog.category}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="rounded-xl overflow-hidden mb-8">
                        <img
                            src={selectedBlog.image}
                            alt={selectedBlog.title}
                            className="w-full h-[400px] object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://source.unsplash.com/random/800x600?${selectedBlog.category.toLowerCase().replace(' ', ',')}`;
                            }}
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <p className="text-gray-300 mb-6 text-lg">{selectedBlog.excerpt}</p>

                        {/* Placeholder content - replace with actual content when available */}
                        <div className="text-gray-200 space-y-6">
                            <p>
                                This is a detailed blog post about {selectedBlog.title}. The full content would
                                typically be stored in your database or CMS and loaded dynamically.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">Key Points</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Important insights about {selectedBlog.category}</li>
                                <li>Critical technologies and methodologies discussed</li>
                                <li>Implementation strategies and best practices</li>
                                <li>Future trends and industry developments</li>
                            </ul>

                            <p>
                                The article would typically include code samples, diagrams, and in-depth
                                explanations relevant to the topic.
                            </p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                            <p>
                                This comprehensive guide has covered the essential aspects of {selectedBlog.title}.
                                We hope you found this information valuable for your projects and professional development.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen pt-24">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <div className="flex items-center justify-center mb-4">
                            <div className="h-1 w-10 bg-blue-500 mr-2"></div>
                            <span className="text-blue-500 font-medium">Our Blog</span>
                            <div className="h-1 w-10 bg-blue-500 ml-2"></div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest <span className="text-blue-500">Insights</span> & News</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Stay updated with the latest trends, technologies, and best practices in software development and digital transformation.
                        </p>
                    </div>
                </div>

                {/* Featured Posts */}
                {featuredBlogs.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">Featured Articles</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredBlogs.map(blog => (
                                <div key={blog.id} className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                                    <div className="border border-gray-800 rounded-xl group-hover:border-blue-500/50 transition-all h-full flex flex-col">
                                        <div className="h-64 overflow-hidden">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = `https://source.unsplash.com/random/800x600?${blog.category.toLowerCase().replace(' ', ',')}`;
                                                }}
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center mb-3">
                                                <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
                                                    {blog.category}
                                                </span>
                                                <span className="text-gray-400 text-xs ml-auto flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {blog.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                                            <p className="text-gray-400 mb-4 flex-grow">{blog.excerpt}</p>
                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-gray-400 text-sm flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {blog.date}
                                                </span>
                                                <button
                                                    className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform"
                                                    onClick={() => handleBlogClick(blog)}
                                                >
                                                    Read More
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search and Filter */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="bg-gray-900 border border-gray-800 rounded-lg py-2 pl-10 pr-4 w-full text-white focus:outline-none focus:border-blue-500 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                    </div>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map(blog => (
                            <div key={blog.id} className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                                <div className="border border-gray-800 rounded-xl group-hover:border-blue-500/50 transition-all h-full flex flex-col">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = `https://source.unsplash.com/random/800x600?${blog.category.toLowerCase().replace(' ', ',')}`;
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center mb-3">
                                            <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
                                                {blog.category}
                                            </span>
                                            <span className="text-gray-400 text-xs ml-auto flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {blog.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4 flex-grow">{blog.excerpt}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-gray-400 text-xs flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {blog.date}
                                            </span>
                                            <button
                                                className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform"
                                                onClick={() => handleBlogClick(blog)}
                                            >
                                                Read More
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-16">
                            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
                            <button
                                className="mt-4 text-blue-500 hover:text-blue-400 flex items-center mx-auto"
                                onClick={() => {
                                    setActiveCategory('All');
                                    setSearchQuery('');
                                }}
                            >
                                Reset Filters
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Newsletter Subscription */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 mb-16">
                    <div className="p-8 border border-gray-800 rounded-xl group-hover:border-blue-500/50 transition-all">
                        <div className="max-w-3xl mx-auto text-center">
                            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                            <p className="text-gray-400 mb-6">
                                Get the latest articles, tutorials, and industry insights delivered straight to your inbox.
                            </p>

                            {subscriptionStatus.type && (
                                <div className={`mb-6 p-4 rounded-lg flex items-center justify-center ${subscriptionStatus.type === 'success' ? 'bg-green-900/30 text-green-400' :
                                    subscriptionStatus.type === 'error' ? 'bg-red-900/30 text-red-400' :
                                        'bg-blue-900/30 text-blue-400'
                                    }`}>
                                    {subscriptionStatus.type === 'success' ? (
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                    ) : subscriptionStatus.type === 'error' ? (
                                        <AlertCircle className="w-5 h-5 mr-2" />
                                    ) : (
                                        <Mail className="w-5 h-5 mr-2" />
                                    )}
                                    <span>{subscriptionStatus.message}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-black/50 border border-gray-700 rounded-lg py-3 px-4 flex-grow focus:outline-none focus:border-blue-500 transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogsPage; 