import { CheckCircle, Clock, Rocket, Shield, Target, Trophy, Users } from 'lucide-react';

function AboutUs() {
    const features = [
        {
            icon: <Shield className="w-8 h-8 text-blue-500" />,
            title: "Trusted Partner",
            description: "Building long-term relationships through transparency and reliability"
        },
        {
            icon: <Rocket className="w-8 h-8 text-blue-500" />,
            title: "Innovative Solutions",
            description: "Leveraging cutting-edge technologies to solve complex challenges"
        },
        {
            icon: <Clock className="w-8 h-8 text-blue-500" />,
            title: "Quick Delivery",
            description: "Agile development ensuring rapid deployment without compromising quality"
        },
        {
            icon: <CheckCircle className="w-8 h-8 text-blue-500" />,
            title: "Quality Assured",
            description: "Rigorous testing and quality control at every development stage"
        }
    ];

    const stats = [
        { value: "50+", label: "Projects Delivered" },
        { value: "15+", label: "Expert Developers" },
        { value: "98%", label: "Client Satisfaction" }
    ];

    return (
        <div className="bg-black text-white">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <div className="flex items-center justify-center mb-4">
                            <div className="h-1 w-10 bg-blue-500 mr-2"></div>
                            <span className="text-blue-500 font-medium">About Us</span>
                            <div className="h-1 w-10 bg-blue-500 ml-2"></div>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4">Who <span className="text-blue-500">We Are</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            {/* We're a team of passionate innovators committed to transforming your ideas into reality
                            through cutting-edge technology and creative solutions. */}
                            More Than Just an IT Company – We Transform Ideas into Reality with a Client-First Approach
                        </p>
                    </div>
                </div>

                {/* Mission & Vision Section */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                        <div className="p-8 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-all">
                                    <Trophy className="w-6 h-6 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-bold">Our Vision</h2>
                            </div>
                            <p className="text-gray-300">
                                To be recognized as a leading force in technological innovation,
                                known for our creativity, reliability, and the measurable impact
                                we create for our clients globally.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                        <div className="p-8 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-all">
                                    <Target className="w-6 h-6 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-bold">Our Mission</h2>
                            </div>
                            <p className="text-gray-300">
                                To empower businesses with innovative technology solutions that drive
                                success and sustainable growth. We're committed to delivering excellence
                                through cutting-edge development and unwavering dedication.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                            <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                                <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 mb-16">
                    <div className="p-8 border border-gray-800 rounded-xl group-hover:border-blue-500/50 transition-all">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-all">
                                <Users className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold">Our Team</h2>
                        </div>
                        <p className="text-gray-300 mb-6">
                            Our strength lies in our team of passionate professionals who bring diverse
                            expertise and fresh perspectives to every project. We're young, dynamic,
                            and committed to pushing the boundaries of what's possible.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center bg-black/30 p-4 rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all">
                                    <div className="text-3xl font-bold text-blue-500 mb-2">{stat.value}</div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs; 