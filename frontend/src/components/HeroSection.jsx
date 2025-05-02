import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search, ArrowRight, Briefcase, Building2, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="relative overflow-hidden min-h-[80vh] flex items-center">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-gradient" />
            
            {/* Floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-float-delayed" />
            </div>

            <div className="container relative py-20">
                <div className={`flex flex-col items-center text-center gap-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium hover-lift">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        No. 1 Job Hunting Website
                    </div>

                    {/* Main heading */}
                    <div className="space-y-4 max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight slide-up">
                            Find Your Next <span className="text-primary">Career</span> Opportunity
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto slide-up">
                            Discover thousands of job opportunities with all the information you need. Your future career starts here.
                        </p>
                    </div>

                    {/* Search bar */}
                    <div className="w-full max-w-2xl scale-in">
                        <div className="flex items-center gap-2 p-2 rounded-full border bg-background/80 backdrop-blur-sm shadow-lg hover-glow">
                            <Search className="h-5 w-5 text-muted-foreground ml-3" />
                            <input
                                type="text"
                                placeholder="Job title, keywords, or company"
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 outline-none bg-transparent text-base placeholder:text-muted-foreground"
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="rounded-full px-6 h-10"
                            >
                                Search
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-8">
                        <div className="text-center hover-lift">
                            <div className="flex items-center justify-center gap-2">
                                <Briefcase className="h-6 w-6 text-primary" />
                                <div className="text-3xl font-bold text-primary">10K+</div>
                            </div>
                            <div className="text-muted-foreground">Active Jobs</div>
                        </div>
                        <div className="text-center hover-lift">
                            <div className="flex items-center justify-center gap-2">
                                <Building2 className="h-6 w-6 text-primary" />
                                <div className="text-3xl font-bold text-primary">5K+</div>
                            </div>
                            <div className="text-muted-foreground">Companies</div>
                        </div>
                        <div className="text-center hover-lift">
                            <div className="flex items-center justify-center gap-2">
                                <Users className="h-6 w-6 text-primary" />
                                <div className="text-3xl font-bold text-primary">50K+</div>
                            </div>
                            <div className="text-muted-foreground">Candidates</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection